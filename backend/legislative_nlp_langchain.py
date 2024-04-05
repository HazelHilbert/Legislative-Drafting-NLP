import os
from langchain_community.chat_models import ChatOpenAI
from langchain_community.document_loaders import TextLoader
from langchain_core.prompts import PromptTemplate
from simple_chaining import chain_text_simple
from langchain.chains.summarize import load_summarize_chain 

# probably have a lot of redundant imports here ^



def summarise(text):
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    llm = ChatOpenAI(temperature=0, api_key=OPENAI_API_KEY, model="gpt-3.5-turbo")
    # texts = CharacterTextSplitter().split_text(text)[:4]
    # docs = [Document(page_content=t) for t in texts]
    loader = TextLoader('summ.txt', encoding = 'iso-8859-1')
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
        "Given the new context, refine the original summary"
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
    return (result["output_text"])

# Summarises contents of txt file
# summarise("summ.txt")


def citations(text):
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY") # might not be needed
    return chain_text_simple("citationLong", text)

def effective_dates(text):
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY") # might not be needed
    return chain_text_simple("effectiveDates", text)

# print(citations("PER CURIAM. Petitioner Michael Lee by his attorney James Dunham has filed a motion for rule on the clerk. His attorney admits that the record was tendered late due to a mistake on his part. We find that such error admittedly made by the attorney for a criminal defendant is good cause to grant the motion. See Terry v. State 272 Ark. 243 613 S.W.2d 90 (1981); In Re: Belated Appeals in Criminal Cases 295 Ark. 964 (1979) (per curiam). A copy of this per curiam will be forwarded to the Committee on Professional Conduct. In Re: Belated Appeals in Criminal Cases 265 Ark. 964.,"))


# summarisation
# citations
# effective dates

def call_langchain( mode, text ):
    if (mode == "summary"):
        # overwrite text to file
        file = 'summ.txt'
        if (os.path.isfile(file)):
            os.remove(file)
        with open(file, 'w') as filetowrite:
            filetowrite.write(text)
        return summarise("summ.txt")
    if (mode == "citations"):
        return citations(text)
    if (mode == "effectiveDates"):
        return effective_dates(text)
    if (mode == "citationJSON"):
        OPENAI_API_KEY = os.getenv("OPENAI_API_KEY") # might not be needed
        return chain_text_simple("citationJSON", text)

# tests
# print(call_langchain("summary", "PER CURIAM. Petitioner Michael Lee by his attorney James Dunham has filed a motion for rule on the clerk. His attorney admits that the record was tendered late due to a mistake on his part. We find that such error admittedly made by the attorney for a criminal defendant is good cause to grant the motion. See Terry v. State 272 Ark. 243 613 S.W.2d 90 (1981); In Re: Belated Appeals in Criminal Cases 295 Ark. 964 (1979) (per curiam). A copy of this per curiam will be forwarded to the Committee on Professional Conduct. In Re: Belated Appeals in Criminal Cases 265 Ark. 964.,"))
# print(call_langchain("citations", "Per Curiam. Petitioner Dirk Johnson by his attorney Norman M. Smith has filed a motion for belated appeal. His attorney admits that he failed to file the notice of appeal on time. We find that such error admittedly made by the attorney for a criminal defendant is good cause to grant the motion. See Terry v. State 272 Ark. 243 613 S.W.2d 90 (1981); In Re: Belated Appeals in Criminal Cases 295 Ark. 964 (1979) (per curiam). A copy of this per curiam will be forwarded to the Committee on Professional Conduct. In Re: Belated Appeals in Criminal Cases 265 Ark. 964."))
# print(call_langchain("effectiveDates", "PER CURIAM. Petitioner Michael Lee by his attorney James Dunham has filed a motion for rule on the clerk. His attorney admits that the record was tendered late due to a mistake on his part. We find that such error admittedly made by the attorney for a criminal defendant is good cause to grant the motion. See Terry v. State 272 Ark. 243 613 S.W.2d 90 (1981); In Re: Belated Appeals in Criminal Cases 295 Ark. 964 (1979) (per curiam). A copy of this per curiam will be forwarded to the Committee on Professional Conduct. In Re: Belated Appeals in Criminal Cases 265 Ark. 964.,"))
# print(call_langchain("citationJSON", "Per Curiam. Petitioner Dirk Johnson by his attorney Norman M. Smith has filed a motion for belated appeal. His attorney admits that he failed to file the notice of appeal on time. We find that such error admittedly made by the attorney for a criminal defendant is good cause to grant the motion. See Terry v. State 272 Ark. 243 613 S.W.2d 90 (1981); In Re: Belated Appeals in Criminal Cases 295 Ark. 964 (1979) (per curiam). A copy of this per curiam will be forwarded to the Committee on Professional Conduct. In Re: Belated Appeals in Criminal Cases 265 Ark. 964."))
