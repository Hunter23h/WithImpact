from bs4 import BeautifulSoup
import urllib
from urllib import request
import urllib.request as ur
from tqdm import tqdm
import json
import requests

lang_dict=['python', 'HTML', 'JavaScript', 'Java', 'R', 'TypeScript', 'Dart', 'PHP', 'c%23']




# For extracting all h1-h6 heading tags from webpage
def headingTags(headingtags):
    repos = {}
    for i in tqdm(lang_dict):
        url='https://github.com/topics/sustainable-development-goals?l=' + i
        h = ur.urlopen(url)
        headings=[]
        soup = BeautifulSoup(h.read(), "html.parser")
        for heading in soup.find_all(headingtags):
            headings.append(heading.text.replace('\n', '').replace(' ', ''))
        headings.pop()
        repos[i] = headings
    return repos

def scraper(repo):

  # the URL of the target repo to scrape
  url = 'https://github.com/' + repo

  # download the target page
  page = requests.get(url)
  # parse the HTML document returned by the server
  soup = BeautifulSoup(page.text, 'html.parser')

  # initialize the object that will contain
  # the scraped data
  repo_data = {}

  # repo scraping logic
  name_html_element = soup.select_one('[itemprop="name"]')
  name = name_html_element.get_text().strip()

  git_branch_icon_html_element = soup.select_one('.octicon-git-branch')
  main_branch_html_element = git_branch_icon_html_element.find_next_sibling('span')
  main_branch = main_branch_html_element.get_text().strip()

  # scrape the repo history data
  boxheader_html_element = soup.select_one('.Box .Box-header')

  relative_time_html_element = boxheader_html_element.select_one('relative-time')
  latest_commit = relative_time_html_element['datetime']

  history_icon_html_element = boxheader_html_element.select_one('.octicon-history')
  commits_span_html_element = history_icon_html_element.find_next_sibling('span')
  commits_html_element = commits_span_html_element.select_one('strong')
  commits = commits_html_element.get_text().strip().replace(',', '')

  # scrape the repo details in the right box
  bordergrid_html_element = soup.select_one('.BorderGrid')

  about_html_element = bordergrid_html_element.select_one('h2')
  description_html_element = about_html_element.find_next_sibling('p')
  description = description_html_element.get_text().strip()

  star_icon_html_element = bordergrid_html_element.select_one('.octicon-star')
  stars_html_element = star_icon_html_element.find_next_sibling('strong')
  stars = stars_html_element.get_text().strip().replace(',', '')

  eye_icon_html_element = bordergrid_html_element.select_one('.octicon-eye')
  watchers_html_element = eye_icon_html_element.find_next_sibling('strong')
  watchers = watchers_html_element.get_text().strip().replace(',', '')

  fork_icon_html_element = bordergrid_html_element.select_one('.octicon-repo-forked')
  forks_html_element = fork_icon_html_element.find_next_sibling('strong')
  forks = forks_html_element.get_text().strip().replace(',', '')

  # build the URL for README.md and download it
  readme_url = f'https://raw.githubusercontent.com/luminati-io/luminati-proxy/{main_branch}/README.md'
  readme_page = requests.get(readme_url)

  readme = None
  # if there is a README.md file
  if readme_page.status_code != 404:
      readme = readme_page.text

  # store the scraped data 
  repo_data['name'] = name
  # repo_data['latest_commit'] = latest_commit
  #repo_data['commits'] = commits
  # repo['main_branch'] = main_branch
  repo_data['description'] = description
  repo_data['stars'] = stars
  repo_data['watchers'] = watchers
  repo_data['forks'] = forks
  #repo['readme'] = readme

  print(repo_data)

  # export the scraped data to a repo.json output file
  # with open('repo.json', 'w') as file:
  #     json.dump(repo, file, indent=4)


# TODO
# scrape data from each repo
# def getTags(tag):
#   s = ur.urlopen(url)
#   soup = BeautifulSoup(s.read(), "html.parser")
#   return soup.findAll(tag)

    

# def titleandmetaTags():
#     s = ur.urlopen(urlinput)
#     soup = BeautifulSoup(s.read())
#     #----- Extracting Title from website ------#
#     title = soup.title.string
#     print ('Website Title is :', title)
#     #-----  Extracting Meta description from website ------#
#     meta_description = soup.find_all('meta')
#     for tag in meta_description:
#         if 'name' in tag.attrs.keys() and tag.attrs['name'].strip().lower() in ['description', 'keywords']:
#             #print ('NAME    :',tag.attrs['name'].lower())
#             print ('CONTENT :',tag.attrs['content'])

if __name__ == '__main__':
  #titleandmetaTags()
#   tags = getTags('p')
  repos = headingTags('h3')
  for i in repos['python']:
    print(i)
    scraper(i)
    # for j in repos[i]:
    #   print(j)
#   for tag in tags:
#      print(" Here are the tags from getTags function:", tag.contents)


# import requests

# URL = "https://github.com/topics/sustainable-development-goals"
# page = requests.get(URL)

# # print(page.text)

# soup = BeautifulSoup(page.content, "html.parser")
# print(soup)

