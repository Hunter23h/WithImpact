import json
import psycopg2
from psycopg2.extras import Json
import os
from dotenv import load_dotenv

load_dotenv()

# Function to read JSON data from a file
def read_json(file_path):
    with open(file_path, 'r') as json_file:
        data = json.load(json_file)
    return data

# Function to insert data into PostgreSQL table
def insert_into_postgresql(data, table_name, connection_params):
    #try:
        # Establish a connection to PostgreSQL
        connection = psycopg2.connect(**connection_params)

        # Create a cursor
        cursor = connection.cursor()

        # Insert data into the PostgreSQL table
        for record in data:
            cursor.execute(
                f"INSERT INTO {table_name} (name, owner, repo_url, created_date, updated_date, "
                "description, last_push_date, latest_commit_date, stars, forks, watchers, languages, "
                "tags, open_prs, open_issues, top_contributors, status, newcomer_friendly)"
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", 
                (record['Name'], record['Owner'],record['URL'], record['Created'],record['Updated'], record['Description'],
                 record['Last Push Date'], record['Latest Commit Date'],record['Stars'], record['Forks'],record['Watchers'], Json(record['Languages']),
                 Json(record['Tags']), record['Open PRs'],record['Open Issues'], Json(record['Top 5 Contributors']),record['Status'], record['Newcomer Friendly'])
            )
            

        # Commit changes and close the connection
        connection.commit()
        connection.close()
        print("Data inserted successfully.")
    # except Exception as e:
    #     print(f"Error: {e}")

if __name__ == "__main__":
    dbname = os.getenv("DB_NAME")
    dbuser = os.getenv("DB_USER")
    dbpass = os.getenv("DB_PASS")
    dbhost = os.getenv("DB_HOST")
    dbport = os.getenv("DB_PORT")

    # Replace these values with your actual database connection details
    connection_params = {
        'dbname': dbname,
        'user': dbuser,
        'password': dbpass,
        'host': dbhost,
        'port': dbport
    }

    # Replace 'your_table' with your actual table name
    table_name = 'backend_project'

    # Replace 'your_file.json' with your actual JSON file path
    json_file_path = 'repos_noreadme_1month_active.json'

    # Read JSON data
    data = read_json(json_file_path)

    # Insert data into PostgreSQL table
    insert_into_postgresql(data, table_name, connection_params)
