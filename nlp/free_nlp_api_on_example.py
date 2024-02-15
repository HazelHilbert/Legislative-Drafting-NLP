# NOTE: Ensure you've got your OpenAI key in your env variables
# If on Windows setx OPENAI_API_KEY "your-api-key-here"
# If on macOS export OPENAI_API_KEY='your-api-key-here'
# I assume you use export on Linux too but the OpenAI docs don't specify this.
# Make sure you run   pip install openai
from openai import OpenAI
client = OpenAI()

filename = "file"

# Options: summary, citationJSON, citationString. Default prompt is 'summary'
type = "summary"

# Open and read filename.txt and place the content of the file into the string called string
with open(filename+'.txt', 'r') as file:
    string = file.read().rstrip()

# Truncate string to fit ChatGPT's token restriction
string = string[0:2500]

# Choose what prompt you want
def get_prompt(type):
  if (type == "summary"):
   prompt = "Summarize this text for me: "
  elif (type == "citationJSON"):
    prompt = "Return ONLY the citation(s) from this string as json: "
  elif (type == "citationString"):
    prompt = "Return ONLY the citation(s) from this string: "
  else:
    prompt = "Summarize this text for me: "
  return prompt

# Call ChatGPT
completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": get_prompt(type)+string}
  ]
)

# Print the prompt given to ChatGPT
# print("Prompt: "+get_prompt(type)+string+"\n")

response = completion.choices[0].message.content

print(response)

# return response