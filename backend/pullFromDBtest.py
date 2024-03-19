import pyodbc

server = 'sweng-propylon.database.windows.net'
database = 'Propylon'
username = 'CloudSAe1754641'
password = 'Helloworld123'
driver = 'ODBC Driver 18 for SQL Server'

conn_str = f"DRIVER={driver};SERVER={server};DATABASE={database};UID={username};PWD={password}"

try:
    conn = pyodbc.connect(conn_str)
    cursor = conn.cursor()
    query = "SELECT * FROM databaseTest" 
    cursor.execute(query)
    rows = cursor.fetchall()
    
    for row in rows:
        print(row)


    cursor.close()
    conn.close()
except pyodbc.Error as e:
    print("Database error:", e)
except Exception as e:
    print("General error:", e)



