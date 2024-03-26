import sys
sys.path.append('C:\\Users\\elizo\\Downloads\\legislative_nlp_langchain.py')

import os
from flask import Flask, request, render_template, send_file
from flask_cors import CORS
import APITools
import docx
from legislative_nlp_langchain import llm
from free_nlp_api_on_example import call_open_ai

app = Flask(__name__)
CORS(app) 

my_key = OPENAI_API_KEY

def summarize_large_text(text, max_chunk_size=2500):
    chunks = [text[i:i+max_chunk_size] for i in range(0, len(text), max_chunk_size)]
    summary = ""
    for chunk in chunks:
        current_input = summary + chunk
        response = llm.invoke(f"Summarize this: {current_input}")
        summary = response['choices'][0]['message']['content']
    return summary


@app.route("/")
def hello_world():
    return "Hello World"


@app.route("/billText/<bill_id>")
def getText(bill_id):
    return APITools.getTextFromID(str(bill_id))


@app.route("/billsFromState/<stateName>")
def getState(stateName):
    APITools.pullState(stateName)
    return "Pull Complete"

@app.route("/summariseText/<text>")
def getSummariseText(text):
    return call_open_ai("summary", text)


@app.route("/citationJSON/<billText>")
def getCitationJSON(billText) :
    return call_open_ai("citationJSON", billText)

@app.route("/citationString/<billText>")
def getCitationString(billText) :
    return call_open_ai("citationString", billText)

@app.route("/summariseBill/<billID>")
def getSummariseBill(billID):
    billText = getText(billID)
    
    return call_open_ai("summary", billText)


@app.route("/citationJSONBill/<billID>")
def getCitationJSONBill(billID) :
    billText = getText(billID)
    return call_open_ai("citationJSON", billText)

@app.route("/citationStringBill/<billID>")
def getCitationStringBill(billID) :
    billText = getText(billID)
    return call_open_ai("citationString", billText)

@app.route('/generate_document/<searchText>/<text>')
def create_word_doc(searchText,text):
    mydoc = docx.Document()  
    mydoc.add_paragraph(text)    
    mydoc.save(searchText + ".docx")
    os.startfile(searchText + ".docx")
    return "Hello"
    
    