import os
from flask import Flask, request
from openai import OpenAI
from legislative_nlp_langchain import load_summarize_chain, getText



app = Flask(__name__)

def call_open_ai(prompt_type, input_text):
    openai_api_key = os.getenv("OPENAI_API_KEY")
    client = OpenAI(api_key=openai_api_key)

    string = input_text[0:2500]
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": "You are a helpful assistant."},
                  {"role": "user", "content": get_prompt(prompt_type) + string}]
    )
    return completion.choices[0].message.content

prompts = {
    "summary": "Summarize this text for me: ",
    # Add other prompt options here
}

def get_prompt(prompt_type):
    return prompts.get(prompt_type, "Summarize this text for me: ")

@app.route("/summarize", methods=["POST"])
def summarize_text():
    data = request.json
    text = data.get('text', '')
    return call_open_ai("summary", text)

@app.route("/langchain_summarize", methods=["POST"])
def langchain_summarize_text():
    text = getText()  # Replace with actual text retrieval logic
    return load_summarize_chain(text, chain_type="refine")

# Additional Flask routes here

if __name__ == "__main__":
    app.run(debug=True)



