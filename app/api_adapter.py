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


def get_omdb_show(title):
    print("GETTING GUIDEBOX")
    #zachs
    key1="b01da4ef"
    #kevins
    key2 = "37c990e3"
    omdb_url = "http://www.omdbapi.com/?t="+title+"&apikey=b01da4ef"
    print("URL: ", omdb_url)

    results = []
    req = urllib.request.Request(omdb_url)
    r = urllib.request.urlopen(req).read()
    cont = json.loads(r.decode('utf-8'))
    count = 0
    print(cont)
    results.append({"title": cont['Title'], "description": cont['Plot'], "rating": cont['Rated'], "released": cont['Released'], "language": cont['Language'], "poster_url": cont['Poster'], "movie_cast": cont['Actors']})


    print("The count is ", count)
    return results

def insert_omdb_movie_row(title, description, rating, release_date, language, poster_url, movie_cast):
    database.startup_database_connection()
    res = database.db_insert_omdb_movie(title, description, rating, release_date, language, poster_url, movie_cast)


#
# CREATE TABLE jordan_dev.streamit_omdb_movies
# (
#   omdb_movie_id serial NOT NULL,
#   title character varying(256) NOT NULL,
#   description character varying(2000),
#   rating character varying(10),
#   release_date character varying(256),
#   language character varying(256),
#   poster_url character varying(2000),
#   movie_cast json,
#   CONSTRAINT streamit_omdb_movies_pkey PRIMARY KEY (omdb_movie_id)
# )

def get_guidebox_shows(streaming_service, offset):
    print("GETTING GUIDEBOX")
    guidebox_url = "http://api-public.guidebox.com/v2/shows?api_key=dfd382d38e3ba75fc2aa27cde8ad6746a1f8f5c6&limit=250&sources="+streaming_service+"&offset="+offset
    guidebox_url2 = "http://api-public.guidebox.com/v2/quota?api_key=dfd382d38e3ba75fc2aa27cde8ad6746a1f8f5c6"
    req = urllib.request.Request(guidebox_url2)
    r = urllib.request.urlopen(req).read()
    cont = json.loads(r.decode('utf-8'))
    print(cont)


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
  res = database.db_insert_guidebox_movie(title, guidebox_id, streaming_service_id)
  insert_relationship_gbm_sss_row(res, streaming_service_id)


# relationship between guidebox_movie and a streaming service_id
def insert_relationship_gbm_sss_row(guidebox_movie_id, streaming_service_id):
    print("ATTEMPTING RELATIONSHIP")
    database.db_insert_relationship_gbm_sss(guidebox_movie_id, streaming_service_id)








if __name__ == "__main__":
    #print(api.VerifyCredentials())
    #loop over command line args
    #used for flipping api scrapers on and off ect...
    netflix_id = 266
    hbo_id = 267
    amazon_prime_id = 268
    hulu_plus_id = 269
    showtime_subscription_id = 271
    #starz_id = 272
    for k in sys.argv:
        print(k)
        if k == "twitter":
            x = 1
            #do twitter
            #
        elif k == "guidebox":
            #get_guidebox_shows()
            database.startup_database_connection()
            offset = "0"
            i = 0


            #insert_guidebox_row("test_zk_22", '{\"basic\": \"$7.99\", \"standard\": \"$10.99\", \"premium\": \"$13.99\"}', '{}')
            #while i < 2:
            results = get_guidebox_shows("netflix", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, netflix_id)

            results = get_guidebox_shows("hbo", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, hbo_id)

            results = get_guidebox_shows("amazon_prime", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, amazon_prime_id)

            results = get_guidebox_shows("hulu_plus", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, hulu_plus_id)

            results = get_guidebox_shows("showtime_subscription", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, showtime_subscription_id)

            offset = str(int(offset) + 250)
            i+=1

            #database.get_sql_results()
            #do guidebox
            #

        elif k == "omdb":
            print("OMBD HOOK")
            res = get_omdb_show("batman")
            print("RES: ", res[0])
            insert_omdb_movie_row(res[0]["title"], res[0]["description"], res[0]["rating"], res[0]["released"], res[0]["language"], res[0]["poster_url"], res[0]["movie_cast"])
            y = 1
            #do imdb
            #
