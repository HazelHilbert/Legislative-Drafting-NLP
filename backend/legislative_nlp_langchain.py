import os
from langchain.text_splitter import CharacterTextSplitter
from langchain.chains.mapreduce import MapReduceChain
from langchain.prompts import PromptTemplate
#from langchain_community.llms import OpenAI
from langchain_openai import OpenAI
import textwrap

class Document:
    def __init__(self, page_content):
        self.page_content = page_content
      
# Initialize the LLM with OpenAI
llm = OpenAI(api_key=os.getenv('OPENAI_API_KEY'), temperature=0)

# Function to split the text into smaller chunks
def split_text(text):
    text_splitter = CharacterTextSplitter()
    return text_splitter.split_text(text)

# Function to load the summarization chain
def load_summarize_chain(llm, chain_type="refine"):
    prompt_template = """Write a concise summary of the following extracting the key information:\n\n{text}\n\nCONCISE SUMMARY:"""
    PROMPT = PromptTemplate(template=prompt_template, input_variables=["text"])

    refine_template = (
        "Your job is to produce a final summary\n"
        "We have provided an existing summary up to a certain point: {existing_answer}\n"
        "We have the opportunity to refine the existing summary"
        "(only if needed) with some more context below.\n"
        "------------\n{text}\n------------\n"
        "Given the new context, refine the original summary."
        "If the context isn't useful, return the original summary."
    )
    refine_prompt = PromptTemplate(template=refine_template, input_variables=["existing_answer", "text"])

    # Instantiate MapReduceChain with the correct parameters
    return MapReduceChain(llm=llm, initial_prompt_template=PROMPT, refinement_prompt_template=refine_prompt, return_intermediate_steps=True)

def summarize_large_text(text):
    texts = split_text(text)
    # Convert each chunk into a Document
    docs = [Document(page_content=t) for t in texts]

    # Run the summarization chain
    chain = load_summarize_chain(llm, 
                                 chain_type="refine")
    
    output_summary = chain.run({"input_documents": docs}, return_only_outputs=True)
    
    # Format and print the summary
    wrapped_text = textwrap.fill(output_summary['output_text'], width=100, break_long_words=False, replace_whitespace=False)
    print(wrapped_text)
    return wrapped_text

# Call the summarization function
summarized_text = summarize_large_text("hello")