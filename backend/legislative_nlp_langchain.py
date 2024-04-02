import os
from langchain_community.llms import OpenAI
from langchain import PromptTemplate
from langchain.chains import LLMChain
from langchain.text_splitter import CharacterTextSplitter
from langchain.chains.mapreduce import MapReduceChain
import textwrap

# Utilize the call_open_ai function from your existing setup
from free_nlp_api_on_example import call_open_ai


class Document:
    def __init__(self, page_content):
        self.page_content = page_content


def split_text(text, max_length=2500, lookback=100):
    text_splitter = CharacterTextSplitter(max_length=max_length, lookback=lookback)
    return text_splitter.split_text(text)


def load_summarize_chain(llm, chain_type="refine"):
    prompt_template = "Write a concise summary of the following extracting the key information:\n\n{text}\n\nCONCISE SUMMARY:"
    PROMPT = PromptTemplate(template=prompt_template, input_variables=["text"])

    refine_template = (
        "Your job is to produce a final summary\n"
        "We have provided an existing summary up to a certain point: {existing_answer}\n"
        "We have the opportunity to refine the existing summary with some more context below.\n"
        "------------\n{text}\n------------\n"
        "Given the new context, refine the original summary. If the context isn't useful, return the original summary."
    )
    refine_prompt = PromptTemplate(template=refine_template, input_variables=["existing_answer", "text"])

    return MapReduceChain(llm=llm, initial_prompt_template=PROMPT, refinement_prompt_template=refine_prompt,
                          return_intermediate_steps=True)


def summarize_large_text(text):
    llm = OpenAI(temperature=0)
    texts = split_text(text)
    docs = [Document(page_content=t) for t in texts]

    chain = load_summarize_chain(llm, chain_type="refine")
    output_summary = chain.run({"input_documents": docs}, return_only_outputs=True)

    wrapped_text = textwrap.fill(output_summary['output_text'], width=100, break_long_words=False,
                                 replace_whitespace=False)
    print(wrapped_text)
    return wrapped_text

# Example Usage
# summarized_text = summarize_large_text("Your large text here")
