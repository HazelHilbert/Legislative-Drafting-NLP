from flask import Flask
import APITools
import requests
import base64
from pypdf import PdfReader
import os
import magic
import io

app = Flask(__name__)

my_key = "480c76cff050a40771e1190b3cab219d"

@app.route("/")
def hello_world():
    return "Hello World"

@app.route("/billText/<bill_id>")
def getText(bill_id):
    return APITools.getTextFromID(str(bill_id))


@app.route("/billText/<stateName>")
def getState(stateName):
    return pullState(stateName)
