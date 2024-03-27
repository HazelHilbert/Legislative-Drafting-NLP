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
from transformers import AutoTokenizer

from transformers import TrainingArguments, Trainer

from huggingface_hub import login

import evaluate

metric = evaluate.load("seqeval")

print("Start")

label_names = ["B-LC", "I-LC", "O"]

model_name = "kavans25/SwEng25"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = BertForTokenClassification.from_pretrained(model_name, num_labels=3)  # Adjust num_labels as needed
data_collator = DataCollatorForTokenClassification(tokenizer=tokenizer)

bills = []

with open('dummy.jsonl') as f:
    data = [json.loads(line) for line in f]



args = TrainingArguments(
    "kavans25/SwEng25",
    evaluation_strategy="epoch",
    save_strategy="epoch",
    learning_rate=2e-5,
    num_train_epochs=1,
    weight_decay=0.01,
    push_to_hub=True,
)

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
    
def alignValArr(valArr):
    label_map = {"B-LC": 1, "I-LC": 2, "O": 0}
    newArr = []
    newArr.append(-100)
    for label in valArr:
        newArr.append(label_map.get(label, 0))  # Default to 0 if label not found
    newArr.append(-100)
    print(newArr)
    return newArr

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

sample_data = ["the provisions of 12 O.S. 1941 had an impact on 34 N.C. 1234", ["34 N.C. 1234","12 O.S. 1941"]]
eval_data = ["the understanding of 43 N.C. 1957 helped improve the legislation of 67 N.Y. 3456", ["43 N.C. 1957","67 N.Y. 3456"]]

def train(sample_data, eval_data):
    text =  sample_data[0]
    test_citations = sample_data[1]

    tokens = tokenize(text, test_citations)
    
    valArrS = createValArr(tokens, test_citations)
    valArr = alignValArr(valArrS)
    tokens = tokenizer.tokenize(text)
    print(tokens)

    # Prepare your dataset here
    texts = [tokens]  # Your texts
    labels = [valArr]  # Your labels, aligned and adjusted as necessary
    dataset = CustomDataset(texts, labels, tokenizer)
    print(dataset)

    

    batch = data_collator(dataset)
    print(batch["labels"])

    predictions = valArrS.copy()
    predictions[2] = 'O'
    metric.compute(predictions=[predictions], references=[valArrS])

    eval_text = eval_data[0]
    eval_test_citations = eval_data[1]

    eval_tokens = tokenize(eval_text, eval_test_citations)

    eval_valArrS = createValArr(eval_tokens, eval_test_citations)
    eval_valArr = alignValArr(eval_valArrS)
    eval_tokens = tokenizer.tokenize(eval_text)
    print(eval_tokens)

    eval_texts = [eval_tokens]  # Your texts
    eval_labels = [eval_valArr]  # Your labels, aligned and adjusted as necessary
    eval_dataset = CustomDataset(eval_texts, eval_labels, tokenizer)
    print(eval_dataset)

  
    # Then, create your Trainer with this dataset
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
    #tokens = tokenizer(tokens, is_split_into_words=True)
    #print(f"tokenized text: {tokenizer(text)}")
    #print(tokens)
    #print(valArr)
    #print(tokens["token_type_ids"])
    #print(tokens.tokens())
    #tokens["token_type_ids"] = alignValArr(valArr)
    #print(tokens)

    #trainer = Trainer(
    #    model=model,
    #    args=args,
    #    train_dataset=tokens,
    #    tokenizer=tokenizer,
    #)
    #trainer.train()



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

def CompareArray(arrayA, arrayB):
    if len(arrayA) == len(arrayB):
        for i in range(len(arrayA)):
            if arrayA[i] != arrayB[i]:
                return False
        return True
    return False

trackCurrent = 0
trackTotal = len(data)

def ConvertToTraining(bill):
    valArr = createValArr(tokenize(bill[0], bill[1]), bill[1])
    print(valArr)
    tokens = tokenizer.tokenize(text)
    print(tokens)
    return [tokens, valArr]
    

def Create(data):
    new_bill = []
    bill_cites = []
    bill_id = str(data['id'])
    stri = ''
    stri += (data['casebody']['data']['head_matter'])
    stri += (data['casebody']['data']['corrections'])
    stri += (data['casebody']['data']['opinions'][0]['text'])
    new_bill.append(stri)
    api_url = "https://api.case.law/v1/cases/" + bill_id
    response = requests.get(api_url)
    data = response.json()
    citations = (data['cites_to'])
    bill_cites = []
    for i in citations:
        bill_cites.append(i['cite'])
    new_bill.append(bill_cites)
    bills.append(new_bill)

for i in data:
    Create(i)

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

train(sample_data, eval_data)

