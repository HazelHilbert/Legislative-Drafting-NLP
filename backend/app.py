import os
from flask import Flask, request, render_template, send_file, jsonify
from flask_cors import CORS
import APITools
import docx
from free_nlp_api_on_example import call_open_ai
# from legislative_nlp_langchain import summarize_large_text
from legislative_nlp_langchain import call_langchain

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
    return call_langchain("summary", text)


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

@app.route('/create_word_document/<searchText>/<text>', methods=['GET'])
def create_word_document(searchText,text):
    doc = docx.Document()
    doc.add_paragraph(text)
    file_path = os.path.join('wordDocs', searchText + '.docx')
    doc.save(file_path)
    os.system(file_path)
    return 'Document created and opened successfully!'

@app.route('/search', methods=['GET'])
def search():
    try:
        query = request.args.get('query')
        state = request.args.get('state')
        documentType = request.args.get('doctype')
        effectiveDate = request.args.get("effectiveDate")

        # Call getSearch function with the necessary parameters
        search_result = APITools.getSearch(query, state, documentType, effectiveDate)

        # Handle the search result and return a response accordingly
        if search_result is not None:
            return jsonify(search_result)
        else:
            return jsonify({"error": "Failed to fetch data from the server"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
