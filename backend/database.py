import pyodbc

server = 'sweng-propylon.database.windows.net'
database = 'Propylon'
username = 'CloudSAe1754641'
password = 'Helloworld123'
driver = 'ODBC Driver 18 for SQL Server'

# Create a connection string
conn_str = f'DRIVER={driver};SERVER={server};DATABASE={database};UID={username};PWD={password}'

conn = pyodbc.connect(conn_str)
cursor = conn.cursor()

# # Create a table
# create_table_query = """
# CREATE TABLE databaseTest (
#     FileID INT PRIMARY KEY,
#     FileName NVARCHAR(255),
#     FileData VARBINARY(MAX)
# )
# """
# cursor.execute(create_table_query)
#
# # Commit the table creation
# conn.commit()

# Read the file as binary data
file_path = r'C:\Users\jason\Desktop\Notes.txt'
with open(file_path, 'rb') as file:
    file_data = file.read()

# Find the first available FileID
select_max_fileid_query = "SELECT MAX(FileID) FROM databaseTest"
cursor.execute(select_max_fileid_query)
max_fileid = cursor.fetchone()[0]
next_fileid = 1 if max_fileid is None else max_fileid + 1

# Insert the file data into the table with the available FileID
insert_query = "INSERT INTO databaseTest (FileID, FileName, FileData) VALUES (?, ?, ?)"
values = (next_fileid, file_path, file_data)

cursor.execute(insert_query, values)
conn.commit()

# Example query to select and display the inserted data
select_query = "SELECT * FROM databaseTest"
cursor.execute(select_query)
rows = cursor.fetchall()

# Process the result
for row in rows:
    print(row)

# Close the cursor and connection
cursor.close()
conn.close()
