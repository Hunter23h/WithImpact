import requests
from pprint import pprint as pp
from bs4 import BeautifulSoup
import re
import datetime
from datetime import date

def get_languages(url):
    response = requests.get(url)
    resp_dict = response.json()
    languages = []
    #print(resp_dict) # prints language and how many bytes of code for each (can use to make the metric)
    for key in (resp_dict.keys()):
        languages.append(key)
    return languages

def get_latest_commit(url):
    response = requests.get(url)
    resp_dict = response.json()
    commit = resp_dict["commit"]["commit"]["author"]["date"]
    return commit

def get_open_PR(url):
    response = requests.get(url)
    resp_dict = response.json()
    return len(resp_dict)

def with_keys(dict, keys):
    return {x: dict[x] for x in dict if x in keys}
    
def get_top5_contributors(url): 
    contributors_list = []
    response = requests.get(url)
    contributors = response.json()
    valid = {"login", "avatar_url", "contributions"} 
    for i in range(5):
        contributors_list.append(with_keys(contributors[i], valid))
    return contributors_list

def get_owner_repo(url):
    pattern = r"/([^/]+)/([^/]+)$"
    match = re.search(pattern, url)
    if match:
        return match.group(1), match.group(2)

    else:
        return None

def get_readme(url, branch_name): # if this doesn't work, can just get https://api.github.com/repos/coronasafe/care/readme and get the downloads_url from there
    owner, repo = get_owner_repo(url)
   # https://raw.githubusercontent.com/octokit/octokit.rb/master/README.md
    # readme_url = "https://raw.githubusercontent.com/" + owner + "/" + repo + "/" + branch_name + "/README.md"
    readme_url = f"https://raw.githubusercontent.com/{owner}/{repo}/{branch_name}/README.md"
    readme_page = requests.get(readme_url)
    if readme_page.status_code == 200: # or != 404
        readme = readme_page.text
    return readme

def get_active_status(inDate):
    new_date = datetime.datetime.strptime(inDate,"%Y-%m-%dT%H:%M:%SZ")
    today = datetime.datetime.now()
    
    # is active if there has been an update in the last 6 months, can change this easily
    if today - new_date <= datetime.timedelta(days=183):
        return True
    else:
        return False

if __name__ == '__main__':
# Create an API request 
# url = 'https://api.github.com/repos/coronasafe/care'
    # url = 'https://api.github.com/search/repositories?q=topic:sustainable-development-goals'
    
    # response = requests.get(url)
    # print("Status code: ", response.status_code)
    # # In a variable, save the API response.
    # response_dict = response.json()
    # # print(response_dict)
    # # Evaluate the results.
    # print("Total repos:", response_dict['total_count'])
    # # find total number of repositories
    # repos_dicts = response_dict['items']
    # print("Repos found:", len(repos_dicts))

    # examine the first repository
    # repo_dict = repos_dicts[1]
    url = 'https://api.github.com/repos/coronasafe/care'
    repo_dict = requests.get(url).json()
    print("Keys:", len(repo_dict))
    for key in sorted(repo_dict.keys()):
        print(key)

    pp(repo_dict)

    # need to get: TODO:
    # readme X
    # last updated X
    # description X
    # tags X
    # status (active or inactive)
    # last commit - take branches url and remove the {branch} at the end to automate X
    # languages X
    # contributors (top 5) X
    # number of open issues X
    # number of open PRs X
    # project difficulty???
    # github link X
    # number of stars  X
    # number of commits (DONT NEED)
    # number of forks X
    # return as JSON object at the end
    print("\nThe following is some information regarding the first repository:")
    # print('Name:', repo_dict['name'])  #print the project's name
    # print('Owner:', repo_dict['owner']['login'])  #use the key owner and the the key login to get the dictionary describing the owner and the owner’s login name respectively.
    # print('Stars:', repo_dict['stargazers_count'])  #print how many stars the project has earned
    # print('Forks:', repo_dict['forks_count'])
    # print('Watchers:', repo_dict['watchers_count'])
    # print("Latest commit date:", get_latest_commit(repo_dict['branches_url'].replace("{/branch}", "/" + repo_dict['default_branch'])))
    # print('Languages:', ", ".join(get_languages(repo_dict['languages_url'])))
    # print('Topics:', ", ".join(repo_dict['topics']))
    # print('Repository:', repo_dict['html_url'])  #print URL for the project’s GitHub repoitory
    # print('Created:', repo_dict['created_at'])  #print when it was created
    # print('Updated:', repo_dict['updated_at'])  #show when it was last updated

    # print('Last Push Date:', repo_dict['pushed_at'])
    # print('Description:', repo_dict['description']) #print the repository’s description

    # num_open_PR = get_open_PR(repo_dict['pulls_url'].replace("{/number}", "?state=open&per_page=200")) # get number of open Pull requests
    # num_open_issues = repo_dict['open_issues_count'] - num_open_PR # get number of open issues (open_issues_count returns number of open PRs + number of open issues)
    # print("Number of open pull requests:", num_open_PR)
    # print('Number of open issues:', num_open_issues)
    # print("Top 5 Contributors:", get_top5_contributors(repo_dict['contributors_url']))

    # print("README:", get_readme(url, repo_dict['default_branch']))
    status = "Active" if get_active_status(repo_dict["updated_at"]) else "Not Active"
    print("Repo Status (Active/Not Active):", status)

    

    


    