import psycopg2
import requests
import os
from dotenv import load_dotenv
import json
from scrape_github_repo import *
from datetime import datetime
from psycopg2.extras import Json
from predict import TextClassifier

load_dotenv()

def connect_to_database():
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
    return connection_params

def scrape_data(url):
    token = os.getenv("GITHUB_TOKEN")
    headers = {'Authorization': 'token ' + token}

    # rate_used_start, rate_total = get_rate_limit()
    # print("----")
    # print_rate_limit(rate_used=rate_used_start, rate_limit=rate_total)
    api_url, repo = convert_to_api_url(url)
    # print(f"GitHub API URL: {api_url}")
    # start_time = time.time()
    # list_repo = []
    # print(f"Start time: {time.ctime()}")
    # valid_project = check_criteria(api_url)
    # if valid_project:
    repo_dict = requests.get(api_url, headers=headers).json()
    # print_repo_metrics(repo_dict, repo)
    repo_info = repo_metrics_to_dict(repo_dict, repo)
    # pp(repo_info)
    # list_repo.append(repo_info)  

    # print("End:")
    # rate_used_end, rate_total = get_rate_limit()
    # print_rate_limit(rate_used=rate_used_end, rate_limit=rate_total)
    # print(f"Used: {rate_used_end-rate_used_start}")
    # rate_used = rate_used_end-rate_used_start

    # end_time = time.time()
    # total_time = end_time - start_time
    # print(f"Time taken: {total_time//60:.4f} minutes, {total_time%60.0:.4f} seconds")

    #-----------------------------------
    # desc = repo_info['Description']

    # sdg_class = TextClassifier().predict(desc)

    # repo_info['SDG'] = int(sdg_class)
    #--------------------------------------
    return repo_info

def write_to_json(list_repo):
    current_date = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    filename = f"repos_{current_date}.json"

    # out_file = open(f"../jsons/{filename}", "w") # run from /web-scraping
  
    with open(f"../jsons/{filename}", "w") as json_file:
        json.dump(list_repo, json_file, indent = 6) 

    # out_file.close()  

    return filename


def update_database_from_json(cursor, filename, connection):
    try:
        with open(f"../jsons/{filename}", 'r') as json_file:
            data = json.load(json_file)

            for repo_data in data:
                update_query = """
                    UPDATE backend_project 
                    SET name = %s, owner = %s, repo_url = %s, owner_avatar = %s, created_date = %s, 
                        updated_date = %s, description = %s, last_push_date = %s, 
                        latest_commit_date = %s, stars = %s, forks = %s, watchers = %s, 
                        languages = %s, tags = %s, open_prs = %s, open_issues = %s, 
                        top_contributors = %s, status = %s, newcomer_friendly = %s, 
                    WHERE repo_url = %s
                """
            

                cursor.execute(update_query,
                (repo_data['Name'], repo_data['Owner'],repo_data['URL'], repo_data['Owner Avatar'], repo_data['Created'],repo_data['Updated'], repo_data['Description'],
                 repo_data['Last Push Date'], repo_data['Latest Commit Date'],repo_data['Stars'], repo_data['Forks'],repo_data['Watchers'], Json(repo_data['Languages']),
                 Json(repo_data['Tags']), repo_data['Open PRs'],repo_data['Open Issues'], Json(repo_data['Top 5 Contributors']),repo_data['Status'], repo_data['Newcomer Friendly'], 
                #  Json(repo_data['SDG']), 
                 repo_data['URL']))

        # Commit changes
        connection.commit()

    except Exception as e:
        print(f"An error occurred: {e}")
        connection.rollback()

def main():
    try:
        # Connect to the database
        connection_params = connect_to_database()
        connection = psycopg2.connect(**connection_params)
        cursor = connection.cursor()

        cursor.execute("SELECT repo_url FROM backend_project order by id")
        rows = cursor.fetchall()

        repo_list = []
        # Loop through rows and update data

        rate_used_start, rate_total = get_rate_limit()
        start_time = time.time()
        print(f"Start time: {time.ctime()}")
        for row in rows:
            repo_url = row[0]
            repo_list.append(scrape_data(repo_url))

        rate_used_end, rate_total = get_rate_limit()
        rate_used = rate_used_end-rate_used_start

        end_time = time.time()
        total_time = end_time - start_time
        
        print(f"Time taken to scrape data: {total_time//60:.4f} minutes, {total_time%60.0:.4f} seconds")
        print_rate_limit(rate_used, rate_total)
        
        filename = write_to_json(repo_list)

        # filename = "../jsons/repos_2024-01-22_16-36-37.json"

        update_database_from_json(cursor, filename, connection)

        # Close connection
        cursor.close()
        connection.close()
        print("Data inserted successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()