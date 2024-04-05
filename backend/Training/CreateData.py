import nltk
from nltk.tokenize import *
import json
import pandas as pd
import requests
import torch
import json
import numpy as np
from torch.utils.data import DataLoader, TensorDataset
from transformers import AdamW, AutoModelForSequenceClassification, TrainingArguments
from tqdm import tqdm
from sklearn.preprocessing import LabelEncoder
from datasets import load_dataset
from torch.utils.data import Dataset
from transformers import DataCollatorForTokenClassification
from transformers import BertTokenizer, BertForTokenClassification
from transformers import AutoTokenizer, TextClassificationPipeline


from transformers import TrainingArguments, Trainer

from huggingface_hub import login

import evaluate
import csv



metric = evaluate.load("seqeval")

numTrainingFiles = 0
target = 1000

print("Start")

csv.field_size_limit(100000000)  # Set to a suitable value depending on your data size

bills = []

# Open csv file with training data
with open('output.csv', 'r', encoding='utf-8', errors='ignore') as file:
    csvreader = csv.reader(file)
    for row in csvreader:
        newBill = []
        newBill.append(row[0])
        newBill.append(row[1].split(','))
        bills.append(newBill)
        numTrainingFiles += 1
        if numTrainingFiles == target:
            break
        

# Our labels used by the model
label_names = ["B-LC", "I-LC", "O"]

# Load in the model and its tokenizer from Hugging Face
model_name = "kavans25/SwEng25"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = BertForTokenClassification.from_pretrained(model_name, num_labels=3)  # Adjust num_labels as needed
data_collator = DataCollatorForTokenClassification(tokenizer=tokenizer)

# Create pipe for testing
pipe = TextClassificationPipeline(model=model, tokenizer=tokenizer, return_all_scores=True)

# Declare training arguments
args = TrainingArguments(
    "kavans25/SwEng25",
    evaluation_strategy="epoch",
    save_strategy="epoch",
    learning_rate=2e-5,
    num_train_epochs=1,
    weight_decay=0.01,
    push_to_hub=True,
)

# Function for testing model
def testModel():
    inputs = tokenizer("Hello, my dog is cute", return_tensors="pt")
    labels = torch.tensor([10])  # Adjust batch size as needed
    print(labels)
    outputs = model(**inputs, labels=labels)
    print(outputs)

# Class for converting training data to dataset
class CustomDataset(Dataset):
    def __init__(self, texts, labels, tokenizer):
        self.texts = texts
        self.labels = labels
        self.tokenizer = tokenizer

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, idx):
        # Retrieve the text and labels at the specified index
        text = self.texts[idx]
        labels = self.labels[idx]
        
        # Tokenize the text using the tokenizer
        tokenized_input = self.tokenizer(text, padding=True, truncation=True, is_split_into_words=True)
        
        return {
            "input_ids": tokenized_input["input_ids"],
            "labels": labels
        }

# Function to assist in correctly configuring value arrays
def alignValArr(valArr):
    label_map = {"B-LC": 1, "I-LC": 2, "O": 0}
    newArr = []
    newArr.append(-100)
    for label in valArr:
        newArr.append(label_map.get(label, 0))  # Default to 0 if label not found
    newArr.append(-100)
    print(newArr)
    return newArr

# Function for computing testing metrics
def compute_metrics(eval_preds):
    logits, labels = eval_preds
    predictions = np.argmax(logits, axis=-1)

    # Remove ignored index (special tokens) and convert to labels
    true_labels = [[label_names[l] for l in label if l != -100] for label in labels]
    true_predictions = [
        [label_names[p] for (p, l) in zip(prediction, label) if l != -100]
        for prediction, label in zip(predictions, labels)
    ]
    all_metrics = metric.compute(predictions=true_predictions, references=true_labels)
    return {
        "precision": all_metrics["overall_precision"],
        "recall": all_metrics["overall_recall"],
        "f1": all_metrics["overall_f1"],
        "accuracy": all_metrics["overall_accuracy"],
    }

# Sample training data
sample_data = ["the provisions of 12 O.S. 1941 had an impact on 34 N.C. 1234", ["34 N.C. 1234","12 O.S. 1941"]]
eval_data = ["the understanding of 43 N.C. 1957 helped improve the legislation of 67 N.Y. 3456", ["43 N.C. 1957","67 N.Y. 3456"]]

# Training function
def train(sample_data, eval_data):
    # Training data text
    text =  sample_data[0]
    # Training data citations
    test_citations = sample_data[1]

    # Convert text to tokens with isolated citations
    tokens = tokenize(text, test_citations)

    #Create and align label array
    valArrS = createValArr(tokens, test_citations)
    valArr = alignValArr(valArrS)

    # Tokenize text without isolating citations
    tokens = tokenizer.tokenize(text)

    # Eval data text
    eval_text = eval_data[0]
    # Eval data citations
    eval_test_citations = eval_data[1]

    # Convert eval text to tokens with isolated citations
    eval_tokens = tokenize(eval_text, eval_test_citations)

    #Create and align eval label array
    eval_valArrS = createValArr(eval_tokens, eval_test_citations)
    eval_valArr = alignValArr(eval_valArrS)

    # Tokenize eval text without isolating citations
    eval_tokens = tokenizer.tokenize(eval_text)

    # Truncate if either array is too large, otherwise will not be accepted
    if len(tokens) > 510:
        tokens = tokens[0:510]
        valArr = valArr[0:509]
        valArr.append(-100)

    if len(eval_tokens) > 510:
        eval_tokens = eval_tokens[0:510]
        eval_valArr = eval_valArr[0:509]
        eval_valArr.append(-100)

    # Align length of arrays and label arrays
    if len(tokens) > len(eval_tokens):
        append_len = len(tokens) - len(eval_tokens)
        print(f"Append_len: {append_len}")
        for i in range(append_len):
            eval_tokens.append('O')

    if len(tokens) < len(eval_tokens):
        append_len = len(eval_tokens) - len(tokens)
        print(f"Append_len: {append_len}")
        for i in range(append_len):
            tokens.append('O')

    if len(valArr) > len(eval_valArr):
        append_len = len(valArr) - len(eval_valArr)
        print(f"Append_len: {append_len}")
        for i in range(append_len):
            eval_valArr.append(-100)

    if len(valArr) < len(eval_valArr):
        append_len = len(eval_valArr) - len(valArr)
        print(f"Append_len: {append_len}")
        for i in range(append_len):
            valArr.append(-100)

    
    # Prepare dataset here
    texts = [tokens]  # Texts
    labels = [valArr]  # Labels, aligned and adjusted as necessary
    # Create eval dataset
    dataset = CustomDataset(texts, labels, tokenizer)

    # Use predictions to compute metrics
    predictions = valArrS.copy()
    predictions[2] = 'O'
    metric.compute(predictions=[predictions], references=[valArrS])

    eval_texts = [eval_tokens]  # Texts
    eval_labels = [eval_valArr]  # Labels, aligned and adjusted as necessary
    # Create eval dataset
    eval_dataset = CustomDataset(eval_texts, eval_labels, tokenizer)
    
    # Create Trainer with this dataset
    trainer = Trainer(
        model=model,
        args=args,
        train_dataset=dataset,
        eval_dataset=eval_dataset,
        data_collator=data_collator,
        compute_metrics=compute_metrics,
        tokenizer=tokenizer,
    )

    trainer.train()



def evaluate_model():
    label_map = {0: "O", 1: "B-LC", 2: "I-LC"}  # LC: Legal Citations, B: Beginning, I: Inside

    # Example text
    text = "the provisions of 12 O.S. 1941 had an impact on 34 N.C. 1234"

    # Tokenize input
    tokens = tokenizer.tokenize(text)
    print(tokens)
    tokens = ["[CLS]"] + tokens + ["[SEP]"]
    print(tokens)
    input_ids = tokenizer.convert_tokens_to_ids(tokens)
    print(input_ids)
    input_ids = torch.tensor([input_ids])
    print(input_ids)

    # Perform NER
    with torch.no_grad():
        outputs = model(input_ids)[0].argmax(dim=2).numpy()[0]

    print(outputs)
    
    # Extract legal citations
    citations = []
    current_citation = []
    print(enumerate(outputs))
    for i, label_id in enumerate(outputs):
        print(f"i: {i}, label_id: {label_id}")
        label = label_map[label_id]
        if label == "B-LC":
            if current_citation:
                citations.append(" ".join(current_citation))
                current_citation = []
            current_citation.append(tokens[i])
        elif label == "I-LC":
            current_citation.append(tokens[i])
        else:
            if current_citation:
                citations.append(" ".join(current_citation))
                current_citation = []

    # Print extracted citations
    print(f"Extracted Legal Citations: {citations}")
    for citation in citations:
        print(citation)

# This function takes in a tokenized array and it's citations and returns an
#   array of corresponding labels.
def createValArr(arr, cite):
    valArr = []
    for i in arr:
        if i in cite:
            citeTokens = tokenizer.tokenize(i)
            for j in citeTokens:
                if j == citeTokens[0]:
                    valArr.append('B-LC')
                else:
                    valArr.append('I-LC')
        else:
            valArr.append('O')
    print(valArr)
    return valArr

# Utility function to compare 2 arrays. Returns True if they are the same
def CompareArray(arrayA, arrayB):
    if len(arrayA) == len(arrayB):
        for i in range(len(arrayA)):
            if arrayA[i] != arrayB[i]:
                return False
        return True
    return False

# Separate test Function
def testModel():
    input_text = "the Germany of 12 O.S. 1941 had an impact on 34 N.C. 1234"

    inputs = tokenizer(input_text, return_tensors="pt")

    # Generate predictions
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits

    # Get predicted labels
    predicted_labels = torch.argmax(logits, dim=2)

    # Convert predicted labels back to named entities
    # Here you would need to map the predicted label IDs to the corresponding labels in your NER task
    predicted_entities = [tokenizer.decode(label) for label in predicted_labels[0]]

    # Print the input text with predicted entities
    for token, entity in zip(tokenizer.tokenize(input_text), predicted_entities):
        print(f"{token}\t{entity}")

# Function to tokenize while isolating citations as individual tokens
def tokenize(text, citations_list):
    citations = []
    
    tokens = tokenizer.tokenize(text)
    
    for i in citations_list:
        newCite = []
        newCite.append(i)
        newCite.append(tokenizer.tokenize(i))
        citations.append(newCite)

    rangeVar = len(tokens)-1
    i = 0
    while i < rangeVar:
        for j in citations:
            if tokens[i] == j[1][0]:
                if CompareArray(tokens[i:i+len(j[1])],j[1]):
                    del tokens[i:(i+len(j[1]))] # delete the three tokens -  "12", "O.S",. "1941"
                    tokens.insert(i, j[0]) # add the correct token at the right place            
                    rangeVar -= len(j[1])-1
        i += 1

    print(tokens)
    return tokens

# Function to run training
def runTraining():
    i = 0
    while i < (len(bills) - 2):
        train(bills[i], bills[i+1])
        i += 1
