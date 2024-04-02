import os

from simple_chaining import *
from flask import Flask, request, render_template, send_file
from flask_cors import CORS
import APITools
import docx
from free_nlp_api_on_example import call_open_ai
from legislative_nlp_langchain import summarize_large_text
 

app = Flask(__name__)
CORS(app) 


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
    return chain_text_simple("summary", billText)


@app.route("/citationJSONBill/<billID>")
def getCitationJSONBill(billID) :
    billText = getText(billID)
    return chain_text_simple("citationJSON", billText)

@app.route("/citationStringBill/<billID>")
def getCitationStringBill(billID) :
    billText = getText(billID)
    return chain_text_simple("citationString", billText)

@app.route("/effectiveDatesBill/<billID>")
def geteffectiveDatesBill(billID) :
    billText = getText(billID)
    return chain_text_simple("effectiveDates", billText)

@app.route('/generate_document/<searchText>/<text>')
def create_word_doc(searchText,text):
    mydoc = docx.Document()  
    mydoc.add_paragraph(text)    
    mydoc.save(searchText + ".docx")
    os.startfile(searchText + ".docx")
    return "Hello"
