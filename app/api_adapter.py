import twitter
import sys
import urllib.request
import json
import database
import time

"netflix"
"hulu"
"hbo_go"
"amazon_prime"
"epix"





# Verifies twitter api account works
twitter_api = twitter.Api(consumer_key='01cakDvOdyw9ytVgVgA2e1loV',
                      consumer_secret='57Mmg8pz20J8NfFf3cL5QkiFw1gGBDL2nPgf4Dbj7J6daUaXTA',
                      access_token_key='4700491069-O7FycZmg158kJuGLALlLTBJ5CuTmi98mGs5vZ08',
                      access_token_secret='Em1V2RG2vXsMFtQNPuTM4bHPsehFnSNpi0yz0AsXx8eGF')


def get_omdb_show(title):
    print("GETTING OMDB")
    #zachs
    key1="b01da4ef"
    #kevins
    key2 = "37c990e3"

    count = 0
    try:
        omdb_url = "http://www.omdbapi.com/?t="+title+"&apikey=37c990e3"
        print("URL: ", omdb_url)

        results = []
        req = urllib.request.Request(omdb_url)
        r = urllib.request.urlopen(req).read()
        cont = json.loads(r.decode('utf-8'))

        print(cont)


        results.append({"title": cont['Title'], "description": cont['Plot'], "rating": cont['Rated'], "released": cont['Released'], "language": cont['Language'], "poster_url": cont['Poster'], "movie_cast": cont['Actors']})
    except:
        print("OMDB MOVIE NOT FOUND")
        print("OMDB MOVIE NOT FOUND")
        print("OMDB MOVIE NOT FOUND")
        print("OMDB MOVIE NOT FOUND")
        print("OMDB MOVIE NOT FOUND")

    print("The count is ", count)
    return results



def insert_omdb_movie_row(title, description, rating, release_date, language, poster_url, movie_cast):
    database.startup_database_connection()
    res = database.db_insert_omdb_movie(title, description, rating, release_date, language, poster_url, movie_cast)
    return res[0][0]

def insert_om_to_ss_row(om_id, ss_id):
    res = database.db_insert_om_to_ss(om_id, ss_id)
    return res[0][0]


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



def translate_relationships():
    query = "SELECT * FROM jordan_dev.streamit_gbm_to_sss"
    database.startup_database_connection()
    database.send_sql_query(query)
    res = database.get_sql_results()
    for k in res:
        #print(k[1])
        query = "SELECT title FROM jordan_dev.streamit_guidebox_movies WHERE guidebox_movie_id = {0}".format(k[1])
        database.send_sql_query(query)
        res = database.get_sql_results()
        #print(res[0][0])
        query = "SELECT omdb_movie_id FROM jordan_dev.streamit_omdb_movies WHERE title = '{0}'".format(res[0][0].replace("'", "''"))
        database.send_sql_query(query)
        res = database.get_sql_results()
        print(res)

def get_twitter_response():
    #print(twitter_api.VerifyCredentials())
    #print(twitter_api.GetSearch(term="austin", geocode="30.143347,-97.833595,30mi"))
    count = 0
    results = twitter_api.GetSearch(raw_query="q=altered%20carbon&result_type=recent&count=100&geocode=30.143347,-97.833595,30mi")
    for k in results:
        count+=1
        #print(k)

    print("COUNT: ", count)

    with open("worldcitiespop.txt") as fileobj:
        for line in fileobj:
            try:
                for ch in line:
                    if ch > 32 or ch < 126:
                        print(ch)
            except Exception:
                print("SKIPPING CHAR")

    # for p in lines:
    #     print(p.split(","))




if __name__ == "__main__":
    get_twitter_response()
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
              insert_guidebox_movie_row(j, v, get_ssid("netflix"))

            results = get_guidebox_shows("hbo", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, get_ssid("hbo"))

            results = get_guidebox_shows("amazon_prime", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, get_ssid("amazon_prime"))

            results = get_guidebox_shows("hulu_plus", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, get_ssid("hulu_plus"))

            results = get_guidebox_shows("showtime_subscription", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, get_ssid("showtime_subscription"))

            results = get_guidebox_shows("youtube", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, get_ssid("youtube"))

            results = get_guidebox_shows("google_play", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, get_ssid("google_play"))

            results = get_guidebox_shows("vudu", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, get_ssid("vudu"))

            results = get_guidebox_shows("abc", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, get_ssid("abc"))

            results = get_guidebox_shows("cnbc", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, get_ssid("cnbc"))

            results = get_guidebox_shows("cartoon_network_free", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, get_ssid("cartoon_network_free"))

            results = get_guidebox_shows("comedycentral_tveverywhere", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, get_ssid("comedycentral_tveverywhere"))

            results = get_guidebox_shows("watch_espn", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, get_ssid("watch_espn"))

            results = get_guidebox_shows("watch_hgtv", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, get_ssid("watch_hgtv"))

            results = get_guidebox_shows("trutv_tveverywhere", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, get_ssid("trutv_tveverywhere"))

            results = get_guidebox_shows("travel", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, get_ssid("travel"))

            results = get_guidebox_shows("tnt", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, get_ssid("tnt"))

            results = get_guidebox_shows("tbs", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, get_ssid("tbs"))

            results = get_guidebox_shows("starz_tveverywhere", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, get_ssid("starz_tveverywhere"))

            results = get_guidebox_shows("oxygen", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, get_ssid("oxygen"))

            results = get_guidebox_shows("nick_tveverywhere", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, get_ssid("nick_tveverywhere"))

            results = get_guidebox_shows("fx", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, get_ssid("fx"))

            results = get_guidebox_shows("crackle", offset)
            for j, v in results:
              insert_guidebox_movie_row(j, v, get_ssid("crackle"))

            offset = str(int(offset) + 250)
            i+=1

            #database.get_sql_results()
            #do guidebox
            #

        elif k == "omdb":
            print("OMBD HOOK")
            # res = get_omdb_show("batman")
            # print("RES: ", res[0])
            # insert_omdb_movie_row(res[0]["title"], res[0]["description"], res[0]["rating"], res[0]["released"], res[0]["language"], res[0]["poster_url"], res[0]["movie_cast"])
            database.db_get_guidebox_movies()
            sr = 0
            count = 0
            for k in database.get_sql_results():
                print("k0: "+str(k[0]))
                print("SKIP: ",count)
                count+=1
                if sr == 1:
                    print("SLEEPIN")
                    guidebox_movie_id = k[0]
                    query = "SELECT streaming_service_id FROM jordan_dev.streamit_gbm_to_sss WHERE guidebox_movie_id = {0}".format(guidebox_movie_id)
                    database.send_sql_query(query)
                    res = database.get_sql_results()
                    streaming_service_id = res[0][0]

                    time.sleep(3)
                    print(k[1].lower().replace(" ", "_"))
                    res = get_omdb_show(k[1].lower().replace(" ", "_"))
                    #print("RES: ", res[0])
                    if res != []:
                        om_id = insert_omdb_movie_row(res[0]["title"], res[0]["description"], res[0]["rating"], res[0]["released"], res[0]["language"], res[0]["poster_url"], res[0]["movie_cast"])
                        print(om_id)
                        insert_om_to_ss_row(om_id, streaming_service_id)
                # toggle point to run data from guidebox_movies table based on ID
                if k[0] == -1:
                    print("FLIPPING SR")
                    sr = 1
            y = 1

        elif k == "translate":
            translate_relationships()

            #do imdb
            #
