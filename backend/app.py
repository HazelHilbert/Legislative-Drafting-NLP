from flask import Flask
from flask_cors import CORS
import APITools
from free_nlp_api_on_example import call_open_ai

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
    return call_open_ai("summary", text)
