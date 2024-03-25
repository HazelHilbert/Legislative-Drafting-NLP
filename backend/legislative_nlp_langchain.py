from langchain import OpenAI, PromptTemplate, LLMChain
from langchain.text_splitter import CharacterTextSplitter
from langchain.chains.mapreduce import MapReduceChain
from langchain.prompts import PromptTemplate
import textwrap

# Initialize the LLM with OpenAI
llm = OpenAI(temperature=0)

# Function to split the text into smaller chunks
def split_text(text, max_length=1000):
    text_splitter = CharacterTextSplitter()
    return text_splitter.split_text(text, max_length)

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
    refine_prompt = PromptTemplate(input_variables=["existing_answer", "text"], template=refine_template)

    return MapReduceChain(llm, PROMPT, refine_prompt, return_intermediate_steps=True)

# Sample usage
def getText():
    # Dummy implementation - replace with actual text retrieval logic
    return "Your large text to summarize goes here."

def summarize_large_text(text):
    # Split the large text into manageable chunks
    texts = split_text(text)

    # Convert each chunk into a Document
    docs = [Document(page_content=t) for t in texts]

    # Run the summarization chain
    chain = load_summarize_chain(llm, chain_type="refine")
    output_summary = chain.run({"input_documents": docs}, return_only_outputs=True)
    
    # Format and print the summary
    wrapped_text = textwrap.fill(output_summary['output_text'], width=100, break_long_words=False, replace_whitespace=False)
    print(wrapped_text)
    return wrapped_text

# Call the summarization function
text = getText()
summarized_text = summarize_large_text(text)
