from free_nlp_api_on_example import call_open_ai


def split_text(text, max_length=2500, lookback=100):
    chunks = []
    chunk_start = 0
    chunk_end = max_length
    while chunk_end < len(text):
        new_chunk_end = chunk_end
        for i in range(lookback):
            if text[chunk_end - i] in ('.', '\n'):
                new_chunk_end = chunk_end - i
                break
        chunks.append(text[chunk_start:new_chunk_end])
        chunk_start = new_chunk_end
        chunk_end = chunk_start + max_length
    chunks.append(text[chunk_start:])
    print("there are this many chunks: " + str(len(chunks)))
    return chunks


def summarize_chunks(prompt_type, chunks):
    chunks = chunks[:10]
    summary_chunks = []
    i = 1
    for chunk in chunks:
        print("doing chunk: " + str(i))
        i = i + 1
        summary_chunks.append(call_open_ai(prompt_type, chunk))
    return summary_chunks


def chain_text_simple(prompt_type, text):
    summary_chunks = summarize_chunks(prompt_type, split_text(text))
    # FIX!!!
    return summary_chunks
