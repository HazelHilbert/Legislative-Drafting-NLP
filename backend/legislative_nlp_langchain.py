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


class Document:
    def __init__(self, page_content):
        self.page_content = page_content


def split_text1(text, max_length=2500, lookback=100):
    text_splitter = CharacterTextSplitter(max_length=max_length, lookback=lookback)
    return text_splitter.split_text(text)


# def load_summarize_chain(llm, chain_type="refine"):
#     prompt_template = "Write a concise summary of the following extracting the key information:\n\n{text}\n\nCONCISE SUMMARY:"
#     PROMPT = PromptTemplate(template=prompt_template, input_variables=["text"])

#     refine_template = (
#         "Your job is to produce a final summary\n"
#         "We have provided an existing summary up to a certain point: {existing_answer}\n"
#         "We have the opportunity to refine the existing summary with some more context below.\n"
#         "------------\n{text}\n------------\n"
#         "Given the new context, refine the original summary. If the context isn't useful, return the original summary."
#     )
#     refine_prompt = PromptTemplate(template=refine_template, input_variables=["existing_answer", "text"])

#     return MapReduceChain(llm=llm, initial_prompt_template=PROMPT, refinement_prompt_template=refine_prompt,
#                           return_intermediate_steps=True)


def summarize_large_text(text):
    llm = OpenAI(temperature=0)
    loader = TextLoader("summ.txt")
    docs = loader.load()

    # texts = split_text(text)
    # docs = [Document(page_content=t) for t in texts]

    chain = load_summarize_chain(llm, chain_type="refine")
    output_summary = chain({"input_documents": docs}, return_only_outputs=True)

    wrapped_text = textwrap.fill(output_summary['output_text'], width=100, break_long_words=False,
                                 replace_whitespace=False)
    print(wrapped_text)
    return wrapped_text

# def summarize(text)


# Example Usage
# summarized_text = summarize_large_text("Per Curiam. Appellant Robert Lewis by his attorney Sandra Cordi has filed a motion for rule on the clerk. His attorney admits that the record was tendered late due to a mistake on her part. We find that such error admittedly made by the attorney for a criminal defendant is good cause to grant the motion. See Terry v. State 272 Ark. 243 613 S.W.2d 90 (1981); In Re: Belated Appeals in Criminal Cases 295 Ark. 964 (1979)(per curiam). A copy of this per curiam will be forwarded to the Committee on Professional Conduct. In Re: Belated Appeals in Criminal Cases supra.")
# print(summarized_text)
OPENAI_API_KEY = ""

def summarise(text):
    llm = OpenAI(temperature=0, api_key=OPENAI_API_KEY)
    # texts = CharacterTextSplitter().split_text(text)[:4]
    # docs = [Document(page_content=t) for t in texts]
    loader = TextLoader("summ.txt")
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


# def summarise(text):
#     llm = OpenAI(temperature=0, openai_api_key="")
#     # Split text
#     text_splitter = CharacterTextSplitter()
#     texts = text_splitter.split_text(text)
#     # Create multiple documents
#     docs = [Document(page_content=t) for t in texts]
#     # Text summarization
#     chain = load_summarize_chain(llm, chain_type='map_reduce')
#     return chain.run(docs)

# summarise("Per Curiam. Appellant Robert Lewis by his attorney Sandra Cordi has filed a motion for rule on the clerk. His attorney admits that the record was tendered late due to a mistake on her part. We find that such error admittedly made by the attorney for a criminal defendant is good cause to grant the motion. See Terry v. State 272 Ark. 243 613 S.W.2d 90 (1981); In Re: Belated Appeals in Criminal Cases 295 Ark. 964 (1979)(per curiam). A copy of this per curiam will be forwarded to the Committee on Professional Conduct. In Re: Belated Appeals in Criminal Cases supra.")
summarise("summ.txt")