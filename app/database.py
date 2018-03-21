###
### Database Manipulation functions
###
import psycopg2
import sys
#Database connection variables
dbconnection = None
cur = None
#Filter variables
movie_filter_values = None
country_filter_values = None
person_filter_values = None
tweet_filter_values = None
stream_filter_values = None
comparison_values = ["=",">=","<=","like"]
schema = "set schema 'release';"

### Database connection startup and shutdone functions
def close_database_connection():
        global dbconnection
        if dbconnection is not None:
              dbconnection.close()
def startup_database_connection(readonly=False):
        connect_to_database(readonly)
        update_filter_values()

def connect_to_database(readonly=False):
        global dbconnection
        global cur
        if readonly:
                dbconnection = psycopg2.connect(host="swe-db.coznr5ylokhg.us-east-2.rds.amazonaws.com",database="canitstreamtome_db", user="canitstreamtome_readaccess",password="swe_2018_read")
        else:
                dbconnection = psycopg2.connect(host="swe-db.coznr5ylokhg.us-east-2.rds.amazonaws.com",database="canitstreamtome_db", user="canitstreamtome", password="swegrp18")
        cur = dbconnection.cursor()

def update_filter_values():
        global movie_filter_values,country_filter_values,person_filter_values,stream_filter_values
        query = schema+"select column_name from information_schema.columns where table_name = 'streamit_omdb_movies';"
        send_sql_query(query)
        list = get_sql_results()
        movie_filter_values = [element for tupl in list for element in tupl]

        query = schema+"select column_name from information_schema.columns where table_name = 'streamit_person';"
        send_sql_query(query)
        list = get_sql_results()
        person_filter_values = [element for tupl in list for element in tupl]

        query = schema+"select column_name from information_schema.columns where table_name = 'streamit_countries';"
        send_sql_query(query)
        list = get_sql_results()
        country_filter_values = [element for tupl in list for element in tupl]

        query = schema+"select column_name from information_schema.columns where table_name = 'streamit_tweet_storage';"
        send_sql_query(query)
        list = get_sql_results()
        tweet_filter_values = [element for tupl in list for element in tupl]

        query = schema+"select column_name from information_schema.columns where table_name = 'streamit_streaming_service';"
        send_sql_query(query)
        list = get_sql_results()
        stream_filter_values = [element for tupl in list for element in tupl]
### Helper Functions
def send_sql_query(query):
        global dbconnection
        global cur
        if dbconnection is None:
                print("CREATING DB CONNECTION")
                dbconnection = psycopg2.connect(host="swe-db.coznr5ylokhg.us-east-2.rds.amazonaws.com",database="canitstreamtome_db", user="canitstreamtome", password="swegrp18")
        try:
                cur = dbconnection.cursor()
                cur.execute(query)
                dbconnection.commit()
                #lastid = cur.fetchone()[0]
                #return lastid
        except psycopg2.DatabaseError as error:
                dbconnection.rollback()
                print("ERROR FETCHING%: ", str(error))
                print(error)
def get_sql_results():
        global cur
        return cur.fetchall()

def db_insert_omdb_movie(title, description, rating, release_date, language, poster_url, movie_cast, trailer_url):
    print(trailer_url)
    global dbconnection
    global schema
    sql_query = schema+"insert into streamit_omdb_movies (title, description, rating, release_date, language, poster_url, movie_cast, trailer_url) values ('{0}','{1}','{2}', '{3}','{4}','{5}','{6}', '{7}')".format(title.replace("'","''"), description.replace("'","''"), rating, release_date, language, poster_url, movie_cast.replace("'","''"), trailer_url)
    #print(sql_query)
    send_sql_query(sql_query)
    dbconnection.commit()
    sql_query = schema+"select lastval();"
    send_sql_query(sql_query)
    res = get_sql_results()
    dbconnection.commit()
    return res

def db_insert_om_to_ss(om_id, ss_id):
    global dbconnection
    global schema

    sql_query = schema+"insert into streamit_om_to_ss (omdb_movie_id, streaming_service_id) values ({0},{1})".format(om_id, ss_id)
    #print(sql_query)
    send_sql_query(sql_query)
    dbconnection.commit()
    sql_query = schema+"select lastval();"
    send_sql_query(sql_query)
    res = get_sql_results()
    print("RELATIONSHIP ID HERE: ",res[0][0])
    dbconnection.commit()
    return res

def db_insert_countries_row(name, country_code):
    global dbconnection
    global schema

    sql_query = schema+"insert into streamit_countries (name, country_code) values ('{0}', '{1}')".format(name, country_code)
    #print(sql_query)
    send_sql_query(sql_query)
    dbconnection.commit()
    sql_query = schema+"select lastval();"
    send_sql_query(sql_query)
    res = get_sql_results()
    print("country created ID HERE: ",res[0][0])
    dbconnection.commit()
    return res

def db_update_country_image(country_id, image_url, pop="", langs=""):
    global dbconnection
    global schema

    #sql_query = schema+"update jordan_dev.streamit_countries set country_image_url = '{0}', languages = '{1}', population = '{2}' where country_id = {3}".format(image_url, langs, pop, country_id)
    sql_query = schema+"update jordan_dev.streamit_countries set (country_image_url, languages, population) = ('{0}', '{1}', {2}) where country_id = {3}".format(image_url, langs, pop, country_id)

    print(sql_query)
    send_sql_query(sql_query)
    dbconnection.commit()
    # sql_query = schema+"select lastval();"
    # send_sql_query(sql_query)
    #res = get_sql_results()
    #print("image updated ID HERE: ",res[0][0])
    dbconnection.commit()
    #return res

def db_insert_country_to_ss_rows(ss_id, country_ranks):
    global dbconnection
    global schema

    i = 1
    for k in country_ranks:
        db_get_country_id(k[0])
        c_id = get_sql_results()
        sql_query = schema+"insert into streamit_country_to_ss(country_id, streaming_service_id, rank) values ('{0}', '{1}', {2})".format(c_id[0][0], ss_id, i)
        #print(sql_query)
        send_sql_query(sql_query)
        dbconnection.commit()
        sql_query = schema+"select lastval();"
        send_sql_query(sql_query)
        res = get_sql_results()
        print("country_to_ss created ID HERE: ",res[0][0])
        dbconnection.commit()
        i+=1

def db_insert_country_to_om_rows(om_id, country_ranks):
    global dbconnection
    global schema

    i = 1
    for k, _ in country_ranks:
        db_get_country_id(k)
        c_id = get_sql_results()
        sql_query = schema+"insert into streamit_country_to_om(country_id, omdb_movie_id, rank) values ('{0}', '{1}', {2})".format(c_id[0][0], om_id, i)
        #print(sql_query)
        send_sql_query(sql_query)
        dbconnection.commit()
        sql_query = schema+"select lastval();"
        send_sql_query(sql_query)
        res = get_sql_results()
        print("country_to_ss created ID HERE: ",res[0][0])
        dbconnection.commit()
        i+=1



def db_get_omdb_movies():
    global dbconnection
    global schema
    sql_query = schema+"SELECT * FROM streamit_omdb_movies"
    send_sql_query(sql_query)
    dbconnection.commit()
    return get_sql_results

def db_get_streaming_services():
    global dbconnection
    global schema
    sql_query = schema+"SELECT * FROM streamit_streaming_service"
    send_sql_query(sql_query)
    dbconnection.commit()
    return get_sql_results

def db_get_country_id(country_name):
    global dbconnection
    global schema
    sql_query = schema+"SELECT * FROM streamit_countries where name = '{0}'".format(country_name)
    send_sql_query(sql_query)
    dbconnection.commit()
    return get_sql_results

def db_get_gbm_id(themoviedb_id):
    global dbconnection
    global schema
    sql_query = schema+"SELECT * FROM streamit_guidebox_movies where guidebox_movie_id = '{0}'".format(themoviedb_id)
    send_sql_query(sql_query)
    dbconnection.commit()
    return get_sql_results

def db_get_gbm_themoviedb_id(movie_id):
    print("SSS: ", movie_id)
    global dbconnection
    global schema
    sql_query = schema+"SELECT * FROM streamit_guidebox_movies where movie_id = {0}".format(movie_id)
    send_sql_query(sql_query)
    dbconnection.commit()
    return get_sql_results


def db_get_ssid(streaming_service_name):
    global dbconnection
    global schema
    stripped = streaming_service_name.split("_")
    sql_query = schema+"SELECT * FROM streamit_streaming_service where name ilike '%{0}%'".format(stripped[0])
    print(sql_query)
    send_sql_query(sql_query)
    dbconnection.commit()
    return get_sql_results

### Functions to insert DB entries
def db_insert_guidebox_movie(title, guidebox_id, streaming_service_id, themoviedb_id):
    global dbconnection
    global schema
    print("$$$: ", themoviedb_id)
    sql_query = schema+"insert into streamit_guidebox_movies (title,guidebox_id,streaming_service_id, movie_id) values ('{0}','{1}','{2}', {3})".format(title.replace("'","''"), guidebox_id, streaming_service_id, themoviedb_id)
    #print(sql_query)
    send_sql_query(sql_query)
    dbconnection.commit()
    sql_query = schema+"select lastval();"
    res = send_sql_query(sql_query)
    print("ID: ",res)
    dbconnection.commit()
    return get_sql_results()

def db_get_guidebox_movies():
    global dbconnection
    global schema
    sql_query = schema+"SELECT * FROM streamit_guidebox_movies"
    send_sql_query(sql_query)
    dbconnection.commit()
    return get_sql_results

def db_insert_relationship_gbm_sss(guidebox_movie_id, streaming_service_id):
    global dbconnection
    global schema
    print("PUTTING IN REL: ", guidebox_movie_id," ",streaming_service_id)
    sql_query = schema+"insert into streamit_gbm_to_sss (guidebox_movie_id,streaming_service_id) values ('{0}','{1}')".format(guidebox_movie_id, streaming_service_id)
    #print(sql_query)
    send_sql_query(sql_query)
    dbconnection.commit()
    sql_query = schema+"select lastval();"
    res = send_sql_query(sql_query)
    print("REL ID: ",res)
    dbconnection.commit()

def get_db_id():
    global dbconnection
    global schema
    sql_query = schema+"select lastval();"
    #print(sql_query)
    send_sql_query(sql_query)
    dbconnection.commit()



def db_insert_movie(title, description,rating,release_date,language):
        sql_query = schema+" insert into {0} (title,description,rating,release_date,language,poster_url) values ({1},{2},{3},{4},{5},{6})".format('streamit_movies',title,description,rating,release_date,language)
        send_sql_query(sql_query)

def db_insert_person(last_name,first_name,dob,gender):
        sql_query = schema+"insert into streamit_person (last_name,first_name,dob,gender) values ({0},{1},{2},{3})".format(last_name,first_name,dob,gender)
        send_sql_query(sql_query)
def db_insert_country(name,population,languages,flag_url):
        sql_query = schema+"insert into streamit_country (name,population,languages,flag_url) values ({0},{1},{2},{3})".format(name,population,languages,flag_url)
        send_sql_query(sql_query)
def db_insert_tweet(date,twitter_handle,tweet_body,country):
        sql_query = schema+"insert into streamit_tweet_storage (date,twitter_handle,tweet_body,country) values ({0},{1},{2},{3})".format(date,twitter_handle,tweet_body,country)
        send_sql_query(sql_query)


### Functions to update DB entries
def db_update_movie(movie_id, column, value):
        sql_query = schema+"update streamit_movie set {0} = {1} where streamit_movie.movie_id = {2}".format(column,value,movie_id)
        set_sql_query(sql_query)
def db_update_person(person_id,column,value):
        sql_query = schema+"update streamit_person set {0} = {1} where streamit_person.person_id = {2}".format(column,value,person_id)
        set_sql_query(sql_query)
def db_update_country(country_id,column,value):
        sql_query = schema+"update streamit_country set {0} = {1} where streamit_country.country_id = {2}".format(column,value,country_id)
        set_sql_query(sql_query)
### Functions to select DB entries with filters

###UPDATED SELECTION FUNCTIONS
def db_select_movie(filtertype = None, value = None, comparison = "=",pagesize = 25,pagenum = 0,sortby = "title",sortdir="asc"):
        global movie_filter_values,comparison_values
        offset = pagenum*pagesize
        sql_query = schema+"select omdb_movie_id,title,description,rating,release_date,language,poster_url,movie_cast,trailer_url from streamit_omdb_movies "
        if filtertype in movie_filter_values and comparison in comparison_values and value != None:
                if comparison == "like":
                        value+="%"
                sql_query += "where {0} {1} '{2}' ".format(filtertype,comparison,value)
        if sortby in movie_filter_values:
                sql_query += "order by {0} {1} ".format(sortby,sortdir)
        sql_query += "limit {0} offset {1} ".format(pagesize,offset)
        send_sql_query(sql_query)
        return format_db_reply("movies",get_sql_results())

def db_select_country(filtertype = None, value = None, comparison = "=",pagesize = 25,pagenum = 0,sortby = "title",sortdir="asc"):
        global country_filter_values,comparison_values
        offset = pagenum*pagesize
        sql_query = schema+"select t.country_id,t.name,t.population,t.languages,t.country_image_url from  "
        sql_query += "(SELECT * FROM zach.streamit_countries WHERE country_id IN (SELECT country_id FROM zach.streamit_country_to_om  group by country_id)) as t "
        if filtertype in country_filter_values and comparison in comparison_values and value != None:
                if comparison == "like":
                        value+="%"
                sql_query += "where {0} {1} '{2}' ".format(filtertype,comparison,value)
        if sortby in country_filter_values:
                sql_query += "order by {0} {1} ".format(sortby,sortdir)
        sql_query += "limit {0} offset {1} ".format(pagesize,offset)
        send_sql_query(sql_query)
        return format_db_reply("countries",get_sql_results())

def db_select_streaming_service(filtertype = None, value = None, comparison = "=",pagesize = 25,pagenum = 0,sortby = "title",sortdir="asc"):
        global stream_filter_values,comparison_values
        offset = pagenum*pagesize
        sql_query = schema+"select stream_id,name, pricing, available_countries from streamit_streaming_service "
        if filtertype in stream_filter_values and comparison in comparison_values and value != None:
                if comparison == "like":
                        value+="%"
                sql_query += "where {0} {1} '{2}' ".format(filtertype,comparison,value)
        if sortby in stream_filter_values:
                sql_query += "order by {0} {1} ".format(sortby,sortdir)
        sql_query += "limit {0} offset {1} ".format(pagesize,offset)
        send_sql_query(sql_query)
        return format_db_reply("streamingservices",get_sql_results())


def db_select_movie_popularity(movie_id):
        sql_query = schema+"select co.rank,sc.name from streamit_country_to_om co join streamit_countries sc on co.country_id = sc.country_id join "
        sql_query+= "streamit_omdb_movies om on co.omdb_movie_id = om.omdb_movie_id "
        sql_query+= "where om.omdb_movie_id = '{0}' order by co.rank asc".format(str(movie_id))
        send_sql_query(sql_query)
        return format_db_reply("moviepopularity",get_sql_results())



def db_select_person(filtertype = None, value = None, comparison = "="):
        global person_filter_values
        if filtertype in person_filter_values:
                sql_query = schema+"select last_name,first_name,photo_url,dob,gender from streamit_person where {0} {1} '{2}'".format(filtertype,comparison,value)
        else:
                sql_query = schema+"select last_name,first_name,photo_url,dob,gender from streamit_person"
        send_sql_query(sql_query)
        return get_sql_results()
def db_select_tweet(filtertype = None, value = None, comparison = "="):
        global tweet_filter_values
        if filtertype in tweet_filter_values:
                sql_query = schema+"select date_posted,twitter_handle,tweet_body,country_id from streamit_tweet_storage where {0} {1} {2}".format(filtertype,comparison,value)
        else:
                sql_query = schema+"select date_posted,twitter_handle,tweet_body,country_id from streamit_tweet_storage"
        send_sql_query(sql_query)
        return get_sql_results()


### JSON FORMATTING
def format_db_reply(typeofreply,reply):
        out = {}
        print(reply,file=sys.stderr)
        out["data"] = []
        if typeofreply == "movies":
                out["data_type"] ="movies"
                index = 0
                for x in reply:
                        out["data"].append({})
                        out["data"][index]["id"]           = x[0]
                        out["data"][index]["name"]         = x[1]
                        out["data"][index]["description"]  = x[2]
                        out["data"][index]["rating"]       = x[3]
                        out["data"][index]["release_date"] = x[4]
                        out["data"][index]["language"]     = x[5]
                        out["data"][index]["image"]        = x[6]
                        out["data"][index]["movie_cast"]   = x[7]
                        out["data"][index]["trailer_url"]  = x[8]
                        index += 1
        elif typeofreply == "countries":
                out["data_type"] ="countries"
                index = 0
                for x in reply:
                        out["data"].append({})
                        out["data"][index]["id"]          = x[0]
                        out["data"][index]["name"]        = x[1]
                        out["data"][index]["population"]  = str(x[2])
                        out["data"][index]["languages"]   = x[3]
                        out["data"][index]["image"]       = x[4]
                        index +=1
        elif typeofreply == "streamingservices":
                out["data_type"] ="streamingservices"
                index = 0
                for x in reply:
                        out["data"].append({})
                        out["data"][index]["id"]                  = x[0]
                        out["data"][index]["name"]                = x[1]
                        out["data"][index]["pricing"]             = x[2]
                        out["data"][index]["available_countries"] = x[3]
                        index +=1
        elif typeofreply == "moviepopularity":
                out["data_type"] = typeofreply
                index = 0
                for x in reply:
                        out["data"].append({})
                        out["data"][index]["rank"]   = x[0]
                        out["data"][index]["country"]= x[1]
                        index+=1

        return out

### Testing functions

def test_db():
        startup_database_connection()
        print("Openned connection succesfully")
        print(movie_filter_values)
        out = db_select_movie()
        print(out)
        close_database_connection()

#test_db()
