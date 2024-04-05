import os
import pyodbc
from flask import Flask, jsonify, request, render_template, send_file
from simple_chaining import *
from flask_cors import CORS
import APITools
import docx
from free_nlp_api_on_example import call_open_ai
# from legislative_nlp_langchain import summarize_large_text
from legislative_nlp_langchain import call_langchain

app = Flask(__name__)
CORS(app) 


my_key = "480c76cff050a40771e1190b3cab219d"

def db_connect():
    server = 'sweng-propylon.database.windows.net'
    database = 'Propylon'
    username = 'CloudSAe1754641'
    password = 'Helloworld123'
    driver = 'ODBC Driver 18 for SQL Server'


    conn_str = f'DRIVER={driver};SERVER={server};DATABASE={database};UID={username};PWD={password}'

    conn = pyodbc.connect(conn_str)
    cursor = conn.cursor()
    return conn

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
    return call_langchain("summary", text)

@app.route("/summariseBill/<billID>")
def getSummariseBill(billID):
    billText = getText(billID)  
    conn = db_connect()
    cursor = conn.cursor()

    cursor.execute("SELECT summary FROM BillSummaries WHERE billID = ?", (billID,))
    row = cursor.fetchone()

    if row :
        summary = row[0]
        conn.close()
        return jsonify({"summary", summary})

    else: 
        summary = call_open_ai("summary", billText) 
        
        # Insert the new summary into the database
        cursor.execute("INSERT INTO BillSummaries (billID, summary) VALUES (?, ?)", (billID, summary))
        conn.commit()
        conn.close()
        return jsonify({"summary": summary})



@app.route("/citationJSON/<billText>")
def getCitationJSON(billText) :
    return call_langchain("citationJSON", billText)

@app.route("/citationString/<billText>")
def getCitationString(billText) :
    return call_open_ai("citationString", billText)

@app.route("/summariseBill/<billID>")
def getSummariseBill(billID):
    billText = getText(billID)
    return call_langchain("summary", billText)


@app.route("/citationJSONBill/<billID>")
def getCitationJSONBill(billID) :
    billText = getText(billID)
    return chain_text_simple("citationJSON", billText)

@app.route("/citationStringBill/<billID>")
def getCitationStringBill(billID) :
    billText = getText(billID)
    return call_langchain("citationString", billText)

@app.route("/effectiveDatesBill/<billID>")
def geteffectiveDatesBill(billID) :
    billText = getText(billID)
    return call_langchain("effectiveDates", billText)

@app.route('/generate_document/<searchText>/<text>')
def create_word_doc(searchText,text):
    mydoc = docx.Document()  
    mydoc.add_paragraph(text)    
    mydoc.save(searchText + ".docx")
    os.startfile(searchText + ".docx")
    return "Hello"
