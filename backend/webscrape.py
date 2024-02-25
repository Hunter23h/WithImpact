from bs4 import BeautifulSoup
import urllib
from urllib import request
import urllib.request as ur
from tqdm import tqdm

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
    print(repos)


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
  headtags = headingTags('h3')
#   for tag in tags:
#      print(" Here are the tags from getTags function:", tag.contents)


# import requests

# URL = "https://github.com/topics/sustainable-development-goals"
# page = requests.get(URL)

# # print(page.text)

# soup = BeautifulSoup(page.content, "html.parser")
# print(soup)

