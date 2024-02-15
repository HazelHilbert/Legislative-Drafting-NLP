from flask import Flask
import APITools

app = Flask(__name__)

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
