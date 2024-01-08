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

def scraper(repo='coronasafe/care'):

    # the URL of the target repo to scrape
    url = 'https://github.com/' + repo

    # download the target page
    page = requests.get(url)
    # parse the HTML document returned by the server
    soup = BeautifulSoup(page.text, 'html.parser')

    # initialize the object that will contain
    # the scraped data
    repo_data = {}

    topic_ptags = soup.select_one('[itemprop="name"]').get_text().strip()
    forks_span_tag =soup.find_all('span',{'id':'repo-network-counter'})
    forks = int(forks_span_tag[0]['title'].replace(',', ''))
    star_span_tag = soup.find_all('span',{'id':'repo-stars-counter-star'})
    stars = int(star_span_tag[0]['aria-label'].split()[0])
    commit_span_tags = soup.find_all('span', {'class':'d-none d-sm-inline'})
    commits=int(commit_span_tags[0].strong.text.replace(',', ''))
    # last_commit_atag =soup.find_all('a',{'class':'Link--secondary ml-2'})
    # last_updated = last_commit_atag[0].find_all('relative-time')[0]['datetime']

    print(commits)

    # store the scraped data 
    # repo_data['name'] = name
    # # repo_data['latest_commit'] = latest_commit
    # #repo_data['commits'] = commits
    # # repo['main_branch'] = main_branch
    # repo_data['description'] = description
    # repo_data['stars'] = stars
    # repo_data['watchers'] = watchers
    # repo_data['forks'] = forks
    #repo['readme'] = readme

    # print(repo_data)

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
#   repos = headingTags('h3')
  scraper()

#   for i in repos['python']:
#     print(i)
#     scraper(i)
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