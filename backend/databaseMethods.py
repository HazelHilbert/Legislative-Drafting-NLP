import pyodbc
import app


def db_connect():
    server = 'sweng-propylon.database.windows.net'
    database = 'Propylon'
    username = 'CloudSAe1754641'
    password = 'Helloworld123'
    driver = 'ODBC Driver 18 for SQL Server'


    conn_str = f'DRIVER={driver};SERVER={server};DATABASE={database};UID={username};PWD={password}'

    conn = pyodbc.connect(conn_str)
    cursor = conn.cursor()
    return conn





def chooseTable(prompt, billID): 
    conn = app.databaseMethods.db_connect()
    cursor = conn.cursor()
    table = ""
    prompt_table = {
        "summary": "BillSummaries",
        "citations": "citations",
        "Effective Dates": "effectiveDates",
    }   
    table = prompt_table[prompt]

    query = f"SELECT {prompt} FROM {table} WHERE billID = ?"
    cursor.execute(query, (billID,))
    row = cursor.fetchone()

    return row


