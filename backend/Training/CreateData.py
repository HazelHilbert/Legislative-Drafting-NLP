import nltk
from nltk.tokenize import *
import json
import pandas as pd
import requests

import json

from transformers import AutoModel, AutoTokenizer

model_name = "bert-base-uncased"  # Example pre-trained model name
tokenizer_pretrained = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)

bills = []

with open('data_sample.jsonl') as f:
    data = [json.loads(line) for line in f]

def CompareArray(arrayA, arrayB):
    if len(arrayA) == len(arrayB):
        for i in range(len(arrayA)):
            if arrayA[i] != arrayB[i]:
                return False
        return True
    return False

trackCurrent = 0
trackTotal = len(data)

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
    
    tokenizer = nltk.tokenize.MWETokenizer()
    tokens = tokenizer.tokenize((word_tokenize(text)))
    
    for i in citations_list:
        newCite = []
        newCite.append(i)
        newCite.append(tokenizer.tokenize(word_tokenize(i)))
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
    val_array = []
    #for i in range(len(tokens)):
    #    for j in citations:
    #        if i == j:
    #            val_array[i] = 1
    #        else:
    #            val_array[i] = 0

text =  "the provisions of 12 O.S. 1941 had an impact on 34 N.C. 1234"
test_citations = []

newCite = []
test_citations.append("34 N.C. 1234")
test_citations.append("12 O.S. 1941")

tokenize(text, test_citations)

for i in bills:
    print(i[1])

output_model_dir = "./fine_tuned_model"

# Save the model and tokenizer to the specified directory
model.save_pretrained(output_model_dir)
tokenizer_pretrained.save_pretrained(output_model_dir)


    
