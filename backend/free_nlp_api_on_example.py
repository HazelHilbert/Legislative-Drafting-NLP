import os
from openai import OpenAI


# calls openai api by cutting input to 2500 char
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
    "citationJSON": "Return ONLY the citation(s) from this string as json: ",
    "citationString": "Return ONLY the citation(s) from this string: "
}


def get_prompt(prompt_type):
    return prompts.get(prompt_type, "Summarize this text for me: ")
