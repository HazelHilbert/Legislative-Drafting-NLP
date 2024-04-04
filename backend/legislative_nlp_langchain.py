import textwrap
from simple_chaining import split_text
from langchain_openai import OpenAI
from langchain_core.prompts import PromptTemplate
from langchain.text_splitter import CharacterTextSplitter
from langchain.chains.mapreduce import MapReduceChain
from langchain.chains.summarize import load_summarize_chain
from langchain import PromptTemplate, LLMChain, OpenAI
from langchain.chat_models import ChatOpenAI
import openai
from langchain.docstore.document import Document
from langchain_community.document_loaders import TextLoader
from dotenv import load_dotenv, dotenv_values 
import os
from langchain.chat_models import ChatOpenAI

# probably have a lot of redundant imports here ^

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def summarise(text):
    llm = ChatOpenAI(temperature=0, api_key=OPENAI_API_KEY, model="gpt-4")
    # texts = CharacterTextSplitter().split_text(text)[:4]
    # docs = [Document(page_content=t) for t in texts]
    loader = TextLoader("summ.txt", encoding = 'UTF-8')
    docs = loader.load()

    prompt_template = """Write a concise summary of the following:
    {text}
    CONCISE SUMMARY:"""
    prompt = PromptTemplate.from_template(prompt_template)

    refine_template = (
        "Your job is to produce a final summary\n"
        "We have provided an existing summary up to a certain point: {existing_answer}\n"
        "We have the opportunity to refine the existing summary"
        "(only if needed) with some more context below.\n"
        "------------\n"
        "{text}\n"
        "------------\n"
        "Given the new context, refine the original summary in Italian"
        "If the context isn't useful, return the original summary."
    )
    refine_prompt = PromptTemplate.from_template(refine_template)
    chain = load_summarize_chain(
        llm=llm,
        chain_type="refine",
        question_prompt=prompt,
        refine_prompt=refine_prompt,
        return_intermediate_steps=True,
        input_key="input_documents",
        output_key="output_text",
    )
    result = chain({"input_documents": docs}, return_only_outputs=True)
    print(result["output_text"])

# Summarises contents of txt file
summarise("summ.txt")