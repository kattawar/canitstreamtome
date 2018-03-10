import twitter
import sys
import urllib.request
import json
import database


"netflix"
"hulu"
"hbo_go"
"amazon_prime"
"epix"





# Verifies twitter api account works
api = twitter.Api(consumer_key='01cakDvOdyw9ytVgVgA2e1loV',
                      consumer_secret='57Mmg8pz20J8NfFf3cL5QkiFw1gGBDL2nPgf4Dbj7J6daUaXTA',
                      access_token_key='4700491069-O7FycZmg158kJuGLALlLTBJ5CuTmi98mGs5vZ08',
                      access_token_secret='Em1V2RG2vXsMFtQNPuTM4bHPsehFnSNpi0yz0AsXx8eGF')


def get_guidebox_shows(streaming_service, offset):
    print("GETTING GUIDEBOX")
    guidebox_url = "http://api-public.guidebox.com/v2/shows?api_key=dfd382d38e3ba75fc2aa27cde8ad6746a1f8f5c6&limit=250&sources="+streaming_service+"&offset="+offset
    guidebox_url2 = "http://api-public.guidebox.com/v2/quota?api_key=dfd382d38e3ba75fc2aa27cde8ad6746a1f8f5c6"
    req = urllib.request.Request(guidebox_url2)
    r = urllib.request.urlopen(req).read()
    cont = json.loads(r.decode('utf-8'))


    #price
    #time = get_time()
    results = []
    req = urllib.request.Request(guidebox_url)
    r = urllib.request.urlopen(req).read()
    cont = json.loads(r.decode('utf-8'))
    count = 0
    for k in cont:
      if k == "results":
        for v in cont[k]:
          count+=1
          results.append([v["title"], v["id"]])


    print("The count is ", count)
    return results


    #print(cont)
    #
    #

def insert_guidebox_movie_row(title, guidebox_id, streaming_service_id):
  database.startup_database_connection()
  database.db_insert_guidebox_movie(title, guidebox_id, streaming_service_id)







if __name__ == "__main__":
    #print(api.VerifyCredentials())
    #loop over command line args
    #used for flipping api scrapers on and off ect...
    netflix_id = 266
    hbo_go = 267
    amazon_prime = 268
    hulu = 269
    epix = 270
    for k in sys.argv:
      print(k)
      if k == "twitter":
        x = 1
        #do twitter
        #
      elif k == "guidebox":
        #get_guidebox_shows()
        database.startup_database_connection()
        #insert_guidebox_row("test_zk_22", '{\"basic\": \"$7.99\", \"standard\": \"$10.99\", \"premium\": \"$13.99\"}', '{}')
        results = get_guidebox_shows("netflix", "0")
        for j, v in results:
          insert_guidebox_movie_row(j, v, netflix_id)

        #database.get_sql_results()
        #do guidebox
        #

      elif k == "imdb":
        y = 1
        #do imdb
        #


