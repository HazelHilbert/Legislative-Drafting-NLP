# NOTE: Ensure you've got your OpenAI key in your env variables
# If on Windows setx OPENAI_API_KEY "your-api-key-here"
# If on macOS export OPENAI_API_KEY='your-api-key-here'
# I assume you use export on Linux too but the OpenAI docs don't specify this.

from openai import OpenAI
client = OpenAI()

# This var will be pulled from the json parser
citation_string = "The Pennsylvania Supreme Court, in the case of Diehl v. Rodgers, 169 Pa. 316, 322, 32 Atl. 424 *618(1895), adopted the view of a pardon which ascribed to it both effects."

# You can choose to have ChatGPT return the citation(s) as a string or as json
prompt_for_string = "Return ONLY the citation(s) from this string: "
prompt_for_json = "Return ONLY the citation(s) from this string as json: "

return_type = input("Return [S]tring or [j]son? ")
if (return_type.lower() == "j"):
    prompt = prompt_for_json
else:
    prompt = prompt_for_string


completion = client.chat.completions.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": prompt+citation_string}
  ]
)

print(completion.choices[0].message.content)
