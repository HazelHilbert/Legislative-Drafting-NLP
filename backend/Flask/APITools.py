import requests
import base64
from pypdf import PdfReader
import os
import magic
import io
from bs4 import BeautifulSoup
import csv

my_key = "480c76cff050a40771e1190b3cab219d"

codes_list = []

file = open('state.csv')
type(file)

csvreader = csv.reader(file)
for i in csvreader:
        codes_list.append(i)
codes_list.pop(0)

        


def getTextOfExample():
        api_url = "https://api.legiscan.com/?key=480c76cff050a40771e1190b3cab219d&op=getBillText&id=2915412"
        response = requests.get(api_url)
        data = response.json()
        print(response)
        response_body = (data['text']['doc'])
        print(repr(response_body[:600]))
        try:
            decoded_content = base64.b64decode(response_body)
            with open('decoded.pdf', 'wb') as file:
                file.write(decoded_content)
                reader = PdfReader('decoded.pdf')
                text = ""
                for page in reader.pages:
                    text += page.extract_text() + "\n"
                    print(text)
        except UnicodeDecodeError as e:
            print(f"Error decoding base64 content: {e}")
            problematic_part = response_body[e.start:e.end]
            print(f"Problematic part: {problematic_part}")

def getTextFromID(bill_ID):
    file_name = (str(bill_ID) + '_decoded')
    api_url = "https://api.legiscan.com/?key=" + my_key + "&op=getBillText&id=" + str(bill_ID)
    response = requests.get(api_url)
    data = response.json()
    response_body = (data['text']['doc'])
    try:
        decoded_content = base64.b64decode(response_body)
        bytesData = io.BytesIO()
        bytesData.write(decoded_content)
        bytesData.seek(0)
        file_type = magic.from_buffer(bytesData.read())
        if file_type[0:3] == 'PDF':
            with open("./bills/" + file_name + '.pdf', 'wb') as file:
                file.write(decoded_content)
                reader = PdfReader("./bills/" +str(bill_ID) + '_decoded.pdf')
                text = ""
                for page in reader.pages:
                    text += page.extract_text() + "\n"
                return text
        elif file_type[0:4] == 'HTML':
            with open("./bills/" + file_name + '.html', 'wb') as file:
                file.write(decoded_content)
                soup = BeautifulSoup(decoded_content, features="html.parser")
                text = soup.get_text()
                return text

                
    except UnicodeDecodeError as e:
        print(f"Error decoding base64 content: {e}")
        problematic_part = response_body[e.start:e.end]
        print(f"Problematic part: {problematic_part}")

def getIDsForState(juristiction):
    ids_list = []
    juristiction_code = convertToCode(juristiction)
    api_url = "https://api.legiscan.com/?key=" + my_key + "&op=getMasterList&state=" + juristiction_code
    response = requests.get(api_url)
    data = response.json()
    print(response)
    try:
        for item_key, item_value in data["masterlist"].items():
            if "bill_id" in item_value:
                bill_id = item_value["bill_id"]        
                ids_list.append(bill_id)
            else:
                print(f"KeyError: 'bill_id' not found in item {item_key}")
    except KeyError as e:
        print(f"KeyError: {e} not found. Check the structure of your JSON data.")
    return ids_list

def pullState(state):
    count = 0
    id_list = getIDsForState(state)
    for i in id_list:
        getTextFromID(i)
        count += 1
        if count >= 20:
            return


def convertToCode(juristiction):
    for i in codes_list:
        print(i)
        if i[2] == juristiction:
            return i[1]


def run2():
    reader = PdfReader("C:/Users/seank/Downloads/Apitools/decoded.pdf")
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
        print(text)

def merge():
    print()
