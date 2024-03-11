import requests
import re
import datetime
from dotenv import load_dotenv
import os
import json
import time
import argparse

#--------------------------------------------------------------------
# Used to scrape github repository information using the GitHub API
#--------------------------------------------------------------------


parser = argparse.ArgumentParser()
parser.add_argument("-f", type=str, help="github repo url")
args = parser.parse_args()

load_dotenv()
token = os.getenv("GITHUB_TOKEN")
headers = {'Authorization': 'token ' + token}



def get_languages(url):
    response = requests.get(url, headers=headers)
    resp_dict = response.json()
    languages = []
    total = sum(resp_dict.values())
    lang_percent_dict = {key: round((value / total) * 100, 1) for key, value in resp_dict.items()}
    languages.append(lang_percent_dict)
    return languages

def get_latest_commit(url):
    response = requests.get(url, headers=headers)
    resp_dict = response.json()
    commit = resp_dict["commit"]["commit"]["author"]["date"]
    return commit

def get_open_PR(url):
    response = requests.get(url, headers=headers)
    resp_dict = response.json()
    return len(resp_dict)

def with_keys(dict, keys):
    return {x: dict[x] for x in dict if x in keys}
    
def get_top5_contributors(url): 
    contributors_list = []
    response = requests.get(url, headers=headers)
    contributors = response.json()
    if len(contributors) > 5:
        num_contributors = 5
    else:
        num_contributors = len(contributors)
    valid = {"login", "avatar_url", "contributions"} 
    for i in range(num_contributors):
        contributors_list.append(with_keys(contributors[i], valid))
    return contributors_list

def get_owner_repo(url):
    pattern = r"/([^/]+)/([^/]+)$"
    match = re.search(pattern, url)
    if match:
        return match.group(1), match.group(2)

    else:
        return None

def get_readme(repo_name, branch_name): # if this doesn't work, can just get https://api.github.com/repos/coronasafe/care/readme and get the downloads_url from there
    # owner, repo = get_owner_repo(url)
    owner, repo = repo_name.split("/")
   # https://raw.githubusercontent.com/octokit/octokit.rb/master/README.md
    # readme_url = "https://raw.githubusercontent.com/" + owner + "/" + repo + "/" + branch_name + "/README.md"
    readme_url = f"https://raw.githubusercontent.com/{owner}/{repo}/{branch_name}/README.md"
    readme_page = requests.get(readme_url, headers=headers)
    if readme_page.status_code == 200: # or != 404
        readme = readme_page.text
    else:
        readme = "No README found"
    return readme

def get_active_status(inDate):
    new_date = datetime.datetime.strptime(inDate,"%Y-%m-%dT%H:%M:%SZ")
    today = datetime.datetime.now()
    
    # is active if there has been a commit in the last 1 month, can change this easily
    if today - new_date <= datetime.timedelta(days=31):
        return True
    else:
        return False

def check_newcomer_friendly_status(repo_name): #uses community standards for now
    owner, repo = repo_name.split("/")
   # https://raw.githubusercontent.com/octokit/octokit.rb/master/README.md
    # readme_url = "https://raw.githubusercontent.com/" + owner + "/" + repo + "/" + branch_name + "/README.md"
    comm_stds_url = f"https://api.github.com/repos/{owner}/{repo}/community/profile"
    comm_stds_resp = requests.get(comm_stds_url, headers=headers)
    comm_stds_dict = comm_stds_resp.json()
    if comm_stds_resp.status_code == 200: # or != 404
        comm_health = comm_stds_dict["health_percentage"]
        if comm_health >= 75:
            return True
        else:
            return False
    else:
        return False


def print_repo_metrics(repo_dict, repo):
    print('Name:', repo_dict['name'])  #print the project's name
    print('Owner:', repo_dict['owner']['login'])  #use the key owner and the the key login to get the dictionary describing the owner and the owner’s login name respectively.
    print('Owner Avatar', repo_dict['owner']['avatar_url'])
    print('Stars:', repo_dict['stargazers_count'])  #print how many stars the project has earned
    print('Forks:', repo_dict['forks_count'])
    print('Watchers:', repo_dict['subscribers_count'])
    print("Latest commit date:", get_latest_commit(repo_dict['branches_url'].replace("{/branch}", "/" + repo_dict['default_branch'])))
    print('Languages:', ", ".join(get_languages(repo_dict['languages_url'])))
    print('Topics:', ", ".join(repo_dict['topics']))
    print('Repository:', repo_dict['html_url'])  #print URL for the project’s GitHub repoitory
    print('Created:', repo_dict['created_at'])  #print when it was created
    print('Updated:', repo_dict['updated_at'])  #show when it was last updated

    print('Last Push Date:', repo_dict['pushed_at'])
    print('Description:', repo_dict['description']) #print the repository’s description

    num_open_PR = get_open_PR(repo_dict['pulls_url'].replace("{/number}", "?state=open&per_page=200")) # get number of open Pull requests
    num_open_issues = repo_dict['open_issues_count'] - num_open_PR # get number of open issues (open_issues_count returns number of open PRs + number of open issues)
    print("Number of open pull requests:", num_open_PR)
    print('Number of open issues:', num_open_issues)
    print("Top 5 Contributors:", get_top5_contributors(repo_dict['contributors_url']))

    print("README:", get_readme(repo_name=repo, branch_name=repo_dict['default_branch']))
    status = "Active" if get_active_status(repo_dict["updated_at"]) else "Not Active"
    print("Repo Status (Active/Not Active):", status)
    newcomer = check_newcomer_friendly_status(repo_name=repo)
    print("Newcomer Status:", newcomer)
    print()

        #print(repo_dict["commits_url"])
    print("------------------------------------------------\n")

def repo_metrics_to_dict(repo_dict, repo):
    all_repos_dict = {}
    all_repos_dict["Name"] = repo_dict['name']
    all_repos_dict["Owner"] = repo_dict['owner']['login']
    all_repos_dict["Owner Avatar"] = repo_dict['owner']['avatar_url']
    all_repos_dict["URL"] = repo_dict['html_url']
    all_repos_dict["Created"] = repo_dict['created_at']
    all_repos_dict["Updated"] = repo_dict['updated_at']
    all_repos_dict["Description"] = repo_dict['description']
    all_repos_dict["Last Push Date"] = repo_dict['pushed_at']
    commit_date = get_latest_commit(repo_dict['branches_url'].replace("{/branch}", "/" + repo_dict['default_branch']))
    all_repos_dict["Latest Commit Date"] = commit_date
    all_repos_dict["Stars"] = repo_dict['stargazers_count']
    all_repos_dict["Forks"] = repo_dict['forks_count']
    all_repos_dict["Watchers"] = repo_dict['subscribers_count']
    all_repos_dict["Languages"] = get_languages(repo_dict['languages_url'])
    all_repos_dict["Tags"] = repo_dict['topics']
    num_open_PR = get_open_PR(repo_dict['pulls_url'].replace("{/number}", "?state=open&per_page=200"))
    all_repos_dict["Open PRs"] = num_open_PR
    all_repos_dict["Open Issues"] = repo_dict['open_issues_count'] - num_open_PR
    all_repos_dict["Top 5 Contributors"] = get_top5_contributors(repo_dict['contributors_url'])
    status = "Active" if get_active_status(commit_date) else "Not Active"
    all_repos_dict["Status"] = status
    newcomer = check_newcomer_friendly_status(repo_name=repo)
    all_repos_dict["Newcomer Friendly"] = newcomer

    #all_repos_dict["README"] = get_readme(repo_name=repo, branch_name=repo_dict['default_branch'])

    return all_repos_dict

def get_rate_limit():
    response = requests.get("https://api.github.com/rate_limit", headers=headers)
    rate_status_dict = response.json()

    rate_used = rate_status_dict["resources"]["core"]["used"]
    rate_limit = rate_status_dict["resources"]["core"]["limit"]
    return rate_used, rate_limit

def print_rate_limit(rate_used, rate_limit):
    print(f"Rate Status: {rate_used}/{rate_limit} used")

def convert_to_api_url(repo_url):
    # Check if the provided URL is a GitHub repository URL
    if "github.com" not in repo_url:
        return "Not a valid GitHub repository URL"

    # Extract username and repository from the URL
    parts = repo_url.strip("/").split("/")
    owner = parts[-2]
    name = parts[-1]
    repo = owner + "/" + name

    # Construct the GitHub API URL
    api_url = f"https://api.github.com/repos/{owner}/{name}"
    return api_url, repo

def check_criteria(url):
    resp = requests.get(url, headers=headers)
    resp_dict = resp.json()
    # print(resp.status_code)
    if resp.status_code == 404:
        return False
    else:
        if resp_dict["description"] == None:
            return False
        else:
            return True
        
def scrape(url):
    rate_used_start, rate_total = get_rate_limit()
    # print("Start:")
    print_rate_limit(rate_used=rate_used_start, rate_limit=rate_total)
    api_url, repo = convert_to_api_url(url)
    list_repo = []
    # print(f"Start time: {time.ctime()}")
    valid_project = check_criteria(api_url)
    if valid_project:
        repo_dict = requests.get(api_url, headers=headers).json()
        # print_repo_metrics(repo_dict, repo)
        repo_info = repo_metrics_to_dict(repo_dict, repo)
        # pp(repo_info)
        list_repo.append(repo_info)

        return list_repo[0]

    else:
        print("Project does not match the criteria!")
        return None
        #needs manual review

if __name__ == '__main__':

    rate_used_start, rate_total = get_rate_limit()
    print("Start:")
    print_rate_limit(rate_used=rate_used_start, rate_limit=rate_total)

    url = args.f #Should pass criteria

    api_url, repo = convert_to_api_url(url)
    # print(f"GitHub API URL: {api_url}")
    start_time = time.time()
    list_repo = []
    print(f"Start time: {time.ctime()}")
    valid_project = check_criteria(api_url)
    if valid_project:
        repo_dict = requests.get(api_url, headers=headers).json()
        # print_repo_metrics(repo_dict, repo)
        repo_info = repo_metrics_to_dict(repo_dict, repo)
        # pp(repo_info)
        list_repo.append(repo_info)

        
        out_file = open("../jsons/submitted_repo.json", "w") # run from /web-scraping
  
        json.dump(list_repo, out_file, indent = 6) 
  
        out_file.close()  

        print("End:")
        rate_used_end, rate_total = get_rate_limit()
        print_rate_limit(rate_used=rate_used_end, rate_limit=rate_total)
        print(f"Used {rate_used_end-rate_used_start}")

        end_time = time.time()
        total_time = end_time - start_time
        print(f"End time: {time.ctime()}, time taken: {total_time//60:.4f} minutes, {total_time%60.0:.4f} seconds")
    else:
        print("Project does not match the criteria!")
        #needs manual review
        
    #------------------------------------------------------------------------------ --

   # response = requests.get(url)
    # print("Status code: ", response.status_code)
    # # In a variable, save the API response.
    # response_dict = response.json()
    # print(response_dict)
    # # Evaluate the results.
    # print("Total repos:", response_dict['total_count'])
    # # find total number of repositories
    # repos_dicts = response_dict['items']
    # print("Repos found:", len(repos_dicts))

    # examine the first repository
    # repo_dict = repos_dicts[1]
    # url = 'https://api.github.com/repos/coronasafe/care'
    # repo_dict = requests.get(url, headers=headers).json()
    # print("Keys:", len(repo_dict))
    # for key in sorted(repo_dict.keys()):
    #     print(key)

    # pp(repo_dict)


    

    


    