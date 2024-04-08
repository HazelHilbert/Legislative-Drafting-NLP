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
import databaseMethods
app = Flask(__name__)
CORS(app) 


my_key = "480c76cff050a40771e1190b3cab219d"

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
    conn = databaseMethods.db_connect()
    cursor = conn.cursor()

    row = databaseMethods.chooseTable("summary", billID)

    if row:
        summary = row[0]
    else:
        billText = getText(billID)  # Now using the shared module
        summary = call_open_ai("summary", billText)
        
        # Insert the new summary into the database
        cursor.execute("INSERT INTO BillSummaries (billID, summary) VALUES (?, ?)", (billID, summary))
        conn.commit()

    conn.close()
    return summary


from flask import jsonify

@app.route("/removeSummary/<billID>")
def removeSummary(billID):
    conn = databaseMethods.db_connect()
    cursor = conn.cursor()

    try:
        # Check if the entry exists
        row = databaseMethods.chooseTable("summary", billID)
        if row:
            # If the entry exists, delete it
            delete_query = "DELETE FROM BillSummaries WHERE billID = ?"
            cursor.execute(delete_query, (billID,))
            conn.commit()

            getSummariseBill(billID)

            # Return a response indicating success
            return jsonify({'message': f'Summary for billID {billID} successfully removed.'}), 200
        else:
            # Return a response indicating the summary was not found
            getSummariseBill(billID)
            return jsonify({'message': f'No summary found for billID {billID} to remove.'}), 404

    except Exception as e:
        conn.rollback()  # Rollback in case of error
        # Return a response indicating an error occurred
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500
    
    finally:
        conn.close()

      





@app.route("/citationJSON/<billText>")
def getCitationJSON(billText) :
    return call_langchain("citationJSON", billText)

@app.route("/citationString/<billText>")
def getCitationString(billText) :
    return call_open_ai("citationString", billText)

@app.route("/summariseBill2/<billID>")
def getSummariseBill2(billID):
    billText = getText(billID)
    return call_langchain("summary", billText)


@app.route("/citationJSONBill/<billID>")
def getCitationJSONBill(billID) :
    billText = getText(billID)
    return chain_text_simple("citationJSON", billText)

@app.route("/citationStringBill/<billID>")
def getCitationStringBill(billID) :
    conn = databaseMethods.db_connect()
    cursor = conn.cursor()
    citations = databaseMethods.chooseTable("citations", billID)
    billText = getText(billID)
    if citations:
        return citations
    
    else:
        citations = call_langchain("citationString", billText)
        cursor.execute("INSERT INTO citations (billID, citations) VALUES (?, ?)", (billID, citations))
        conn.commit()
        return citations
    




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
