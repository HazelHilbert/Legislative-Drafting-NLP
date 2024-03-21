# NOTE: Ensure you've got your OpenAI key in your env variables
# If on Windows setx OPENAI_API_KEY "your-api-key-here"
# If on macOS export OPENAI_API_KEY='your-api-key-here'
# I assume you use export on Linux too but the OpenAI docs don't specify this.

import os
from flask.cli import load_dotenv
from openai import OpenAI


def call_open_ai(prompt_type, input_text):
    # Get the current directory where the script is running
    current_directory = os.getcwd()

    # Append the .env filename to the parent directory path
    env_path = os.path.join(os.path.dirname(os.getcwd()), '.env')

    # Load the .env file
    load_dotenv(env_path)

    # Now try to get the environment variable
    openai_api_key = os.getenv("OPENAI_API_KEY")

    client = OpenAI(api_key=openai_api_key)

    filename = current_directory + "/file"

    # Options: summary, citationJSON, citationString. Default prompt is 'summary'
    type = prompt_type  # "summary"

    # Open and read filename.txt and place the content of the file into the string called string
    # with open(filename + '.txt', 'r') as file:
    #    string = file.read().rstrip()

    # Truncate string to fit ChatGPT's token restriction
    string = input_text[0:2500]  # string[0:2500]

    # Call ChatGPT
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": get_prompt(type) + string}
        ]
    )

    # Print the prompt given to ChatGPT
    # print("Prompt: "+get_prompt(type)+string+"\n")

    response = completion.choices[0].message.content

    print(response)
    return response


# Choose what prompt you want
# def get_prompt(prompt_type):
#     match prompt_type:
#         case "summary":
#             return "Summarize this text for me: "
#         case "citationJSON":
#             return "Return ONLY the citation(s) from this string as json: "
#         case "citationString":
#             return "Return ONLY the citation(s) from this string: "
#         case _:
#             return "Summarize this text for me: "
# Define the prompts in a dictionary
prompts = {
    "summary": "Summarize this text for me: ",
    "citationJSON": "Return ONLY the citation(s) from this string as json: ",
    "citationString": "Return ONLY the citation(s) from this string: "
}

# Function to retrieve the prompt based on the prompt type
def get_prompt(prompt_type):
    # Use dictionary.get() method to handle prompt types not found in the dictionary
    return prompts.get(prompt_type, "Summarize this text for me: ")
