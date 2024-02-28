import pyodbc

server = 'sweng-propylon.database.windows.net'
database = 'Propylon'
username = 'CloudSAe1754641'
password = 'Helloworld123'
driver = 'ODBC Driver 18 for SQL Server'

# Create a connection string
conn_str = f'DRIVER={driver};SERVER={server};DATABASE={database};UID={username};PWD={password}'

# Establish a connection
conn = pyodbc.connect(conn_str)

cursor = conn.cursor()

conn.commit()

cursor.close()
conn.close()
