import twitter
import sys
import urllib.request
import json
import database
import time
import codecs
from pytrends.request import TrendReq
#from pytrends.pyGTrends import pyGTrends

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


def get_omdb_show(themoviedb_id):
    #zachs
    key1="b01da4ef"
    #kevins
    key2 = "37c990e3"

    count = 0
    try:
        #omdb_url = "http://www.omdbapi.com/?i="+imdb_id+"&apikey=37c990e3"
        # omdb_url = "http://api.themoviedb.org/3/search/movie?api_key=2bd3d8c73d94bacae94a2bb0a04f6847&query="+ name +"&append_to_response=videos,credits"
        # print("URL: ", omdb_url)

        # results = []
        # req = urllib.request.Request(omdb_url)
        # r = urllib.request.urlopen(req).read()
        # cont = json.loads(r.decode('utf-8'))

        #print(cont)

        # for k in cont['results']:
        #     print(k)

        #themoviedb_id = cont['results'][0]['id']
        print("TRY SET: ", themoviedb_id)
        omdb_url = "http://api.themoviedb.org/3/movie/"+ str(themoviedb_id) +"?api_key=2bd3d8c73d94bacae94a2bb0a04f6847&append_to_response=videos,credits"

        results = []
        req = urllib.request.Request(omdb_url)
        r = urllib.request.urlopen(req).read()
        cont = json.loads(r.decode('utf-8'))

        print(cont)
        count = 0
        cast = ""
        cast_list = []
        if cont['credits'] != None:
            if cont['credits']['cast'] != None:
                for k in cont['credits']['cast']:
                    #print(k['name'])
                    cast_list.append(k['name'])
                    count+=1
                    if count == 5:
                        break

                cast = ", ".join(cast_list)

        genre_list = []
        if cont['genres'] != None:
            for j in cont['genres']:
                genre_list.append(j['name'])

        genre_string = ", ".join(cast_list)

        print("GENRES: ", genre_string)






        print("CAST: ",cast)
        trailer_url = ""
        if cont['videos']['results'] != []:
            youtube_key = cont['videos']['results'][0]['key']
            trailer_url = "https://www.youtube.com/watch?v="+ youtube_key
        else:
            print("NO TRAILER")
            print("NO TRAILER")
            print("NO TRAILER")



        #cont = cont['results']

        results.append({"title": cont['title'], "description": cont['overview'], "rating": cont['vote_average'], "released": cont['release_date'], "language": "", "poster_url": "http://image.tmdb.org/t/p/w185"+ cont['poster_path'], "movie_cast": cast, "trailer_url": trailer_url, "genres": genre_list})
    except Exception as e:
        print("OMDB MOVIE NOT FOUND: ",str(e))
        print(str(e))
        print("OMDB MOVIE NOT FOUND")
        print("OMDB MOVIE NOT FOUND")
        print("OMDB MOVIE NOT FOUND")
        print("OMDB MOVIE NOT FOUND")

    print("The count is ", count)
    print("RESULTS GATHERED: ", results)
    return results



def insert_omdb_movie_row(title, description, rating, release_date, language, poster_url, movie_cast, trailer_url, genres):
    database.startup_database_connection()
    res = database.db_insert_omdb_movie(title, description, rating, release_date, language, poster_url, movie_cast, trailer_url, genres)
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
    guidebox_url = "http://api-public.guidebox.com/v2/movies?api_key=dfd382d38e3ba75fc2aa27cde8ad6746a1f8f5c6&limit=100&sources="+streaming_service+"&offset="+offset
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
          print(v)
          count+=1
          results.append([v["title"], v["id"], v["themoviedb"]])


    print("The count is ", count)
    return results


    #print(cont)
    #
    #

def insert_guidebox_movie_row(title, guidebox_id, themoviedb_id, streaming_service_id):
  database.startup_database_connection()
  res = database.db_get_gbm_themoviedb_id(themoviedb_id)
  res = database.get_sql_results()
  if len(res) == 0:
    print("LENGTH 0: inserting now")
    print("MMMM: ", themoviedb_id)
    res = database.db_insert_guidebox_movie(title, guidebox_id, streaming_service_id, themoviedb_id)
    print("RES is: ", res)

  # database.db_get_gbm_id(themoviedb_id)
  # res = database.get_sql_results()

  print("FOUND $$$$$$$$$$$$: ", res)
  insert_relationship_gbm_sss_row(res[0][0], streaming_service_id)


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

def get_twitter_response(movie_name):
    #print(twitter_api.VerifyCredentials())
    #print(twitter_api.GetSearch(term="austin", geocode="30.143347,-97.833595,30mi"))
    count = 0
    #results = twitter_api.GetSearch(raw_query="q=altered%20carbon&result_type=recent&count=100&geocode=30.143347,-97.833595,30mi")
    results = twitter_api.GetSearch(raw_query="q="+ str(movie_name) +"&result_type=recent&count=100")
    last_id = 0
    cor_list = []
    res = {}
    country_counts = {}
    for k in results:
        #print(k)
        #print(str(k.param_defaults))
        print(k.place)
        last_id = k.id
        cor = ""
        cor = k.place
        if cor != None:
            cor_list.append(cor)
            print(cor)
        count+=1
        #print(k)
    for i in range(1,50):
        results = twitter_api.GetSearch(raw_query="q=altered%20carbon&result_type=recent&count=200&max_id="+str(last_id))
        for k in results:
            #print(k)
            print(count)
            last_id = k.id
            cor = ""
            cor = k.place
            if cor != None:
                cor_list.append(cor)
                print(cor)
            count+=1
            #print(k)

    print("COUNT: ", count)
    print("COOR COUNT: ", len(cor_list))

    i = 0;
    for k in cor_list:
        print(i)
        print(k['country_code'])
        if country_counts.get(k['country_code']) == None:
            country_counts.update({k['country_code']: 1})
        elif country_counts.get(k['country_code']) > 0:
            old_count = country_counts.get(k['country_code'])
            country_counts.update({k['country_code']: (old_count + 1)})

        i+=1

    print("RESULTS ARE: ", country_counts)
    return country_counts

    # with codecs.open("worldcitiespop.txt", 'r', encoding = 'utf8') as file:
    #     lines = file.read()
    #
    # print(lines)

    # with open("worldcitiespop.txt") as fileobj:
    #     for line in fileobj:
    #         try:
    #             for ch in line:
    #                 if ch > 32 or ch < 126:
    #                     print(ch)
    #         except Exception:
    #             print("SKIPPING CHAR")

    # for p in lines:
    #     print(p.split(","))

def fill_countries_table():
    countries = """
                name,alpha-2,alpha-3,country-code,iso_3166-2,region,sub-region,region-code,sub-region-code
Afghanistan,AF,AFG,004,ISO 3166-2:AF,Asia,Southern Asia,142,034
Åland Islands,AX,ALA,248,ISO 3166-2:AX,Europe,Northern Europe,150,154
Albania,AL,ALB,008,ISO 3166-2:AL,Europe,Southern Europe,150,039
Algeria,DZ,DZA,012,ISO 3166-2:DZ,Africa,Northern Africa,002,015
American Samoa,AS,ASM,016,ISO 3166-2:AS,Oceania,Polynesia,009,061
Andorra,AD,AND,020,ISO 3166-2:AD,Europe,Southern Europe,150,039
Angola,AO,AGO,024,ISO 3166-2:AO,Africa,Middle Africa,002,017
Anguilla,AI,AIA,660,ISO 3166-2:AI,Americas,Caribbean,019,029
Antarctica,AQ,ATA,010,ISO 3166-2:AQ,,,,
Antigua and Barbuda,AG,ATG,028,ISO 3166-2:AG,Americas,Caribbean,019,029
Argentina,AR,ARG,032,ISO 3166-2:AR,Americas,South America,019,005
Armenia,AM,ARM,051,ISO 3166-2:AM,Asia,Western Asia,142,145
Aruba,AW,ABW,533,ISO 3166-2:AW,Americas,Caribbean,019,029
Australia,AU,AUS,036,ISO 3166-2:AU,Oceania,Australia and New Zealand,009,053
Austria,AT,AUT,040,ISO 3166-2:AT,Europe,Western Europe,150,155
Azerbaijan,AZ,AZE,031,ISO 3166-2:AZ,Asia,Western Asia,142,145
Bahamas,BS,BHS,044,ISO 3166-2:BS,Americas,Caribbean,019,029
Bahrain,BH,BHR,048,ISO 3166-2:BH,Asia,Western Asia,142,145
Bangladesh,BD,BGD,050,ISO 3166-2:BD,Asia,Southern Asia,142,034
Barbados,BB,BRB,052,ISO 3166-2:BB,Americas,Caribbean,019,029
Belarus,BY,BLR,112,ISO 3166-2:BY,Europe,Eastern Europe,150,151
Belgium,BE,BEL,056,ISO 3166-2:BE,Europe,Western Europe,150,155
Belize,BZ,BLZ,084,ISO 3166-2:BZ,Americas,Central America,019,013
Benin,BJ,BEN,204,ISO 3166-2:BJ,Africa,Western Africa,002,011
Bermuda,BM,BMU,060,ISO 3166-2:BM,Americas,Northern America,019,021
Bhutan,BT,BTN,064,ISO 3166-2:BT,Asia,Southern Asia,142,034
Bolivia (Plurinational State of),BO,BOL,068,ISO 3166-2:BO,Americas,South America,019,005
"Bonaire, Sint Eustatius and Saba",BQ,BES,535,ISO 3166-2:BQ,Americas,Caribbean,019,029
Bosnia and Herzegovina,BA,BIH,070,ISO 3166-2:BA,Europe,Southern Europe,150,039
Botswana,BW,BWA,072,ISO 3166-2:BW,Africa,Southern Africa,002,018
Bouvet Island,BV,BVT,074,ISO 3166-2:BV,,,,
Brazil,BR,BRA,076,ISO 3166-2:BR,Americas,South America,019,005
British Indian Ocean Territory,IO,IOT,086,ISO 3166-2:IO,,,,
Brunei Darussalam,BN,BRN,096,ISO 3166-2:BN,Asia,South-Eastern Asia,142,035
Bulgaria,BG,BGR,100,ISO 3166-2:BG,Europe,Eastern Europe,150,151
Burkina Faso,BF,BFA,854,ISO 3166-2:BF,Africa,Western Africa,002,011
Burundi,BI,BDI,108,ISO 3166-2:BI,Africa,Eastern Africa,002,014
Cambodia,KH,KHM,116,ISO 3166-2:KH,Asia,South-Eastern Asia,142,035
Cameroon,CM,CMR,120,ISO 3166-2:CM,Africa,Middle Africa,002,017
Canada,CA,CAN,124,ISO 3166-2:CA,Americas,Northern America,019,021
Cabo Verde,CV,CPV,132,ISO 3166-2:CV,Africa,Western Africa,002,011
Cayman Islands,KY,CYM,136,ISO 3166-2:KY,Americas,Caribbean,019,029
Central African Republic,CF,CAF,140,ISO 3166-2:CF,Africa,Middle Africa,002,017
Chad,TD,TCD,148,ISO 3166-2:TD,Africa,Middle Africa,002,017
Chile,CL,CHL,152,ISO 3166-2:CL,Americas,South America,019,005
China,CN,CHN,156,ISO 3166-2:CN,Asia,Eastern Asia,142,030
Christmas Island,CX,CXR,162,ISO 3166-2:CX,,,,
Cocos (Keeling) Islands,CC,CCK,166,ISO 3166-2:CC,,,,
Colombia,CO,COL,170,ISO 3166-2:CO,Americas,South America,019,005
Comoros,KM,COM,174,ISO 3166-2:KM,Africa,Eastern Africa,002,014
Congo,CG,COG,178,ISO 3166-2:CG,Africa,Middle Africa,002,017
Congo (Democratic Republic of the),CD,COD,180,ISO 3166-2:CD,Africa,Middle Africa,002,017
Cook Islands,CK,COK,184,ISO 3166-2:CK,Oceania,Polynesia,009,061
Costa Rica,CR,CRI,188,ISO 3166-2:CR,Americas,Central America,019,013
Côte d'Ivoire,CI,CIV,384,ISO 3166-2:CI,Africa,Western Africa,002,011
Croatia,HR,HRV,191,ISO 3166-2:HR,Europe,Southern Europe,150,039
Cuba,CU,CUB,192,ISO 3166-2:CU,Americas,Caribbean,019,029
Curaçao,CW,CUW,531,ISO 3166-2:CW,Americas,Caribbean,019,029
Cyprus,CY,CYP,196,ISO 3166-2:CY,Asia,Western Asia,142,145
Czech Republic,CZ,CZE,203,ISO 3166-2:CZ,Europe,Eastern Europe,150,151
Denmark,DK,DNK,208,ISO 3166-2:DK,Europe,Northern Europe,150,154
Djibouti,DJ,DJI,262,ISO 3166-2:DJ,Africa,Eastern Africa,002,014
Dominica,DM,DMA,212,ISO 3166-2:DM,Americas,Caribbean,019,029
Dominican Republic,DO,DOM,214,ISO 3166-2:DO,Americas,Caribbean,019,029
Ecuador,EC,ECU,218,ISO 3166-2:EC,Americas,South America,019,005
Egypt,EG,EGY,818,ISO 3166-2:EG,Africa,Northern Africa,002,015
El Salvador,SV,SLV,222,ISO 3166-2:SV,Americas,Central America,019,013
Equatorial Guinea,GQ,GNQ,226,ISO 3166-2:GQ,Africa,Middle Africa,002,017
Eritrea,ER,ERI,232,ISO 3166-2:ER,Africa,Eastern Africa,002,014
Estonia,EE,EST,233,ISO 3166-2:EE,Europe,Northern Europe,150,154
Ethiopia,ET,ETH,231,ISO 3166-2:ET,Africa,Eastern Africa,002,014
Falkland Islands (Malvinas),FK,FLK,238,ISO 3166-2:FK,Americas,South America,019,005
Faroe Islands,FO,FRO,234,ISO 3166-2:FO,Europe,Northern Europe,150,154
Fiji,FJ,FJI,242,ISO 3166-2:FJ,Oceania,Melanesia,009,054
Finland,FI,FIN,246,ISO 3166-2:FI,Europe,Northern Europe,150,154
France,FR,FRA,250,ISO 3166-2:FR,Europe,Western Europe,150,155
French Guiana,GF,GUF,254,ISO 3166-2:GF,Americas,South America,019,005
French Polynesia,PF,PYF,258,ISO 3166-2:PF,Oceania,Polynesia,009,061
French Southern Territories,TF,ATF,260,ISO 3166-2:TF,,,,
Gabon,GA,GAB,266,ISO 3166-2:GA,Africa,Middle Africa,002,017
Gambia,GM,GMB,270,ISO 3166-2:GM,Africa,Western Africa,002,011
Georgia,GE,GEO,268,ISO 3166-2:GE,Asia,Western Asia,142,145
Germany,DE,DEU,276,ISO 3166-2:DE,Europe,Western Europe,150,155
Ghana,GH,GHA,288,ISO 3166-2:GH,Africa,Western Africa,002,011
Gibraltar,GI,GIB,292,ISO 3166-2:GI,Europe,Southern Europe,150,039
Greece,GR,GRC,300,ISO 3166-2:GR,Europe,Southern Europe,150,039
Greenland,GL,GRL,304,ISO 3166-2:GL,Americas,Northern America,019,021
Grenada,GD,GRD,308,ISO 3166-2:GD,Americas,Caribbean,019,029
Guadeloupe,GP,GLP,312,ISO 3166-2:GP,Americas,Caribbean,019,029
Guam,GU,GUM,316,ISO 3166-2:GU,Oceania,Micronesia,009,057
Guatemala,GT,GTM,320,ISO 3166-2:GT,Americas,Central America,019,013
Guernsey,GG,GGY,831,ISO 3166-2:GG,Europe,Northern Europe,150,154
Guinea,GN,GIN,324,ISO 3166-2:GN,Africa,Western Africa,002,011
Guinea-Bissau,GW,GNB,624,ISO 3166-2:GW,Africa,Western Africa,002,011
Guyana,GY,GUY,328,ISO 3166-2:GY,Americas,South America,019,005
Haiti,HT,HTI,332,ISO 3166-2:HT,Americas,Caribbean,019,029
Heard Island and McDonald Islands,HM,HMD,334,ISO 3166-2:HM,,,,
Holy See,VA,VAT,336,ISO 3166-2:VA,Europe,Southern Europe,150,039
Honduras,HN,HND,340,ISO 3166-2:HN,Americas,Central America,019,013
Hong Kong,HK,HKG,344,ISO 3166-2:HK,Asia,Eastern Asia,142,030
Hungary,HU,HUN,348,ISO 3166-2:HU,Europe,Eastern Europe,150,151
Iceland,IS,ISL,352,ISO 3166-2:IS,Europe,Northern Europe,150,154
India,IN,IND,356,ISO 3166-2:IN,Asia,Southern Asia,142,034
Indonesia,ID,IDN,360,ISO 3166-2:ID,Asia,South-Eastern Asia,142,035
Iran (Islamic Republic of),IR,IRN,364,ISO 3166-2:IR,Asia,Southern Asia,142,034
Iraq,IQ,IRQ,368,ISO 3166-2:IQ,Asia,Western Asia,142,145
Ireland,IE,IRL,372,ISO 3166-2:IE,Europe,Northern Europe,150,154
Isle of Man,IM,IMN,833,ISO 3166-2:IM,Europe,Northern Europe,150,154
Israel,IL,ISR,376,ISO 3166-2:IL,Asia,Western Asia,142,145
Italy,IT,ITA,380,ISO 3166-2:IT,Europe,Southern Europe,150,039
Jamaica,JM,JAM,388,ISO 3166-2:JM,Americas,Caribbean,019,029
Japan,JP,JPN,392,ISO 3166-2:JP,Asia,Eastern Asia,142,030
Jersey,JE,JEY,832,ISO 3166-2:JE,Europe,Northern Europe,150,154
Jordan,JO,JOR,400,ISO 3166-2:JO,Asia,Western Asia,142,145
Kazakhstan,KZ,KAZ,398,ISO 3166-2:KZ,Asia,Central Asia,142,143
Kenya,KE,KEN,404,ISO 3166-2:KE,Africa,Eastern Africa,002,014
Kiribati,KI,KIR,296,ISO 3166-2:KI,Oceania,Micronesia,009,057
Korea (Democratic People's Republic of),KP,PRK,408,ISO 3166-2:KP,Asia,Eastern Asia,142,030
Korea (Republic of),KR,KOR,410,ISO 3166-2:KR,Asia,Eastern Asia,142,030
Kuwait,KW,KWT,414,ISO 3166-2:KW,Asia,Western Asia,142,145
Kyrgyzstan,KG,KGZ,417,ISO 3166-2:KG,Asia,Central Asia,142,143
Lao People's Democratic Republic,LA,LAO,418,ISO 3166-2:LA,Asia,South-Eastern Asia,142,035
Latvia,LV,LVA,428,ISO 3166-2:LV,Europe,Northern Europe,150,154
Lebanon,LB,LBN,422,ISO 3166-2:LB,Asia,Western Asia,142,145
Lesotho,LS,LSO,426,ISO 3166-2:LS,Africa,Southern Africa,002,018
Liberia,LR,LBR,430,ISO 3166-2:LR,Africa,Western Africa,002,011
Libya,LY,LBY,434,ISO 3166-2:LY,Africa,Northern Africa,002,015
Liechtenstein,LI,LIE,438,ISO 3166-2:LI,Europe,Western Europe,150,155
Lithuania,LT,LTU,440,ISO 3166-2:LT,Europe,Northern Europe,150,154
Luxembourg,LU,LUX,442,ISO 3166-2:LU,Europe,Western Europe,150,155
Macao,MO,MAC,446,ISO 3166-2:MO,Asia,Eastern Asia,142,030
Macedonia (the former Yugoslav Republic of),MK,MKD,807,ISO 3166-2:MK,Europe,Southern Europe,150,039
Madagascar,MG,MDG,450,ISO 3166-2:MG,Africa,Eastern Africa,002,014
Malawi,MW,MWI,454,ISO 3166-2:MW,Africa,Eastern Africa,002,014
Malaysia,MY,MYS,458,ISO 3166-2:MY,Asia,South-Eastern Asia,142,035
Maldives,MV,MDV,462,ISO 3166-2:MV,Asia,Southern Asia,142,034
Mali,ML,MLI,466,ISO 3166-2:ML,Africa,Western Africa,002,011
Malta,MT,MLT,470,ISO 3166-2:MT,Europe,Southern Europe,150,039
Marshall Islands,MH,MHL,584,ISO 3166-2:MH,Oceania,Micronesia,009,057
Martinique,MQ,MTQ,474,ISO 3166-2:MQ,Americas,Caribbean,019,029
Mauritania,MR,MRT,478,ISO 3166-2:MR,Africa,Western Africa,002,011
Mauritius,MU,MUS,480,ISO 3166-2:MU,Africa,Eastern Africa,002,014
Mayotte,YT,MYT,175,ISO 3166-2:YT,Africa,Eastern Africa,002,014
Mexico,MX,MEX,484,ISO 3166-2:MX,Americas,Central America,019,013
Micronesia (Federated States of),FM,FSM,583,ISO 3166-2:FM,Oceania,Micronesia,009,057
Moldova (Republic of),MD,MDA,498,ISO 3166-2:MD,Europe,Eastern Europe,150,151
Monaco,MC,MCO,492,ISO 3166-2:MC,Europe,Western Europe,150,155
Mongolia,MN,MNG,496,ISO 3166-2:MN,Asia,Eastern Asia,142,030
Montenegro,ME,MNE,499,ISO 3166-2:ME,Europe,Southern Europe,150,039
Montserrat,MS,MSR,500,ISO 3166-2:MS,Americas,Caribbean,019,029
Morocco,MA,MAR,504,ISO 3166-2:MA,Africa,Northern Africa,002,015
Mozambique,MZ,MOZ,508,ISO 3166-2:MZ,Africa,Eastern Africa,002,014
Myanmar,MM,MMR,104,ISO 3166-2:MM,Asia,South-Eastern Asia,142,035
Namibia,NA,NAM,516,ISO 3166-2:NA,Africa,Southern Africa,002,018
Nauru,NR,NRU,520,ISO 3166-2:NR,Oceania,Micronesia,009,057
Nepal,NP,NPL,524,ISO 3166-2:NP,Asia,Southern Asia,142,034
Netherlands,NL,NLD,528,ISO 3166-2:NL,Europe,Western Europe,150,155
New Caledonia,NC,NCL,540,ISO 3166-2:NC,Oceania,Melanesia,009,054
New Zealand,NZ,NZL,554,ISO 3166-2:NZ,Oceania,Australia and New Zealand,009,053
Nicaragua,NI,NIC,558,ISO 3166-2:NI,Americas,Central America,019,013
Niger,NE,NER,562,ISO 3166-2:NE,Africa,Western Africa,002,011
Nigeria,NG,NGA,566,ISO 3166-2:NG,Africa,Western Africa,002,011
Niue,NU,NIU,570,ISO 3166-2:NU,Oceania,Polynesia,009,061
Norfolk Island,NF,NFK,574,ISO 3166-2:NF,Oceania,Australia and New Zealand,009,053
Northern Mariana Islands,MP,MNP,580,ISO 3166-2:MP,Oceania,Micronesia,009,057
Norway,NO,NOR,578,ISO 3166-2:NO,Europe,Northern Europe,150,154
Oman,OM,OMN,512,ISO 3166-2:OM,Asia,Western Asia,142,145
Pakistan,PK,PAK,586,ISO 3166-2:PK,Asia,Southern Asia,142,034
Palau,PW,PLW,585,ISO 3166-2:PW,Oceania,Micronesia,009,057
"Palestine, State of",PS,PSE,275,ISO 3166-2:PS,Asia,Western Asia,142,145
Panama,PA,PAN,591,ISO 3166-2:PA,Americas,Central America,019,013
Papua New Guinea,PG,PNG,598,ISO 3166-2:PG,Oceania,Melanesia,009,054
Paraguay,PY,PRY,600,ISO 3166-2:PY,Americas,South America,019,005
Peru,PE,PER,604,ISO 3166-2:PE,Americas,South America,019,005
Philippines,PH,PHL,608,ISO 3166-2:PH,Asia,South-Eastern Asia,142,035
Pitcairn,PN,PCN,612,ISO 3166-2:PN,Oceania,Polynesia,009,061
Poland,PL,POL,616,ISO 3166-2:PL,Europe,Eastern Europe,150,151
Portugal,PT,PRT,620,ISO 3166-2:PT,Europe,Southern Europe,150,039
Puerto Rico,PR,PRI,630,ISO 3166-2:PR,Americas,Caribbean,019,029
Qatar,QA,QAT,634,ISO 3166-2:QA,Asia,Western Asia,142,145
Réunion,RE,REU,638,ISO 3166-2:RE,Africa,Eastern Africa,002,014
Romania,RO,ROU,642,ISO 3166-2:RO,Europe,Eastern Europe,150,151
Russian Federation,RU,RUS,643,ISO 3166-2:RU,Europe,Eastern Europe,150,151
Rwanda,RW,RWA,646,ISO 3166-2:RW,Africa,Eastern Africa,002,014
Saint Barthélemy,BL,BLM,652,ISO 3166-2:BL,Americas,Caribbean,019,029
"Saint Helena, Ascension and Tristan da Cunha",SH,SHN,654,ISO 3166-2:SH,Africa,Western Africa,002,011
Saint Kitts and Nevis,KN,KNA,659,ISO 3166-2:KN,Americas,Caribbean,019,029
Saint Lucia,LC,LCA,662,ISO 3166-2:LC,Americas,Caribbean,019,029
Saint Martin (French part),MF,MAF,663,ISO 3166-2:MF,Americas,Caribbean,019,029
Saint Pierre and Miquelon,PM,SPM,666,ISO 3166-2:PM,Americas,Northern America,019,021
Saint Vincent and the Grenadines,VC,VCT,670,ISO 3166-2:VC,Americas,Caribbean,019,029
Samoa,WS,WSM,882,ISO 3166-2:WS,Oceania,Polynesia,009,061
San Marino,SM,SMR,674,ISO 3166-2:SM,Europe,Southern Europe,150,039
Sao Tome and Principe,ST,STP,678,ISO 3166-2:ST,Africa,Middle Africa,002,017
Saudi Arabia,SA,SAU,682,ISO 3166-2:SA,Asia,Western Asia,142,145
Senegal,SN,SEN,686,ISO 3166-2:SN,Africa,Western Africa,002,011
Serbia,RS,SRB,688,ISO 3166-2:RS,Europe,Southern Europe,150,039
Seychelles,SC,SYC,690,ISO 3166-2:SC,Africa,Eastern Africa,002,014
Sierra Leone,SL,SLE,694,ISO 3166-2:SL,Africa,Western Africa,002,011
Singapore,SG,SGP,702,ISO 3166-2:SG,Asia,South-Eastern Asia,142,035
Sint Maarten (Dutch part),SX,SXM,534,ISO 3166-2:SX,Americas,Caribbean,019,029
Slovakia,SK,SVK,703,ISO 3166-2:SK,Europe,Eastern Europe,150,151
Slovenia,SI,SVN,705,ISO 3166-2:SI,Europe,Southern Europe,150,039
Solomon Islands,SB,SLB,090,ISO 3166-2:SB,Oceania,Melanesia,009,054
Somalia,SO,SOM,706,ISO 3166-2:SO,Africa,Eastern Africa,002,014
South Africa,ZA,ZAF,710,ISO 3166-2:ZA,Africa,Southern Africa,002,018
South Georgia and the South Sandwich Islands,GS,SGS,239,ISO 3166-2:GS,,,,
South Sudan,SS,SSD,728,ISO 3166-2:SS,Africa,Eastern Africa,002,014
Spain,ES,ESP,724,ISO 3166-2:ES,Europe,Southern Europe,150,039
Sri Lanka,LK,LKA,144,ISO 3166-2:LK,Asia,Southern Asia,142,034
Sudan,SD,SDN,729,ISO 3166-2:SD,Africa,Northern Africa,002,015
Suriname,SR,SUR,740,ISO 3166-2:SR,Americas,South America,019,005
Svalbard and Jan Mayen,SJ,SJM,744,ISO 3166-2:SJ,Europe,Northern Europe,150,154
Swaziland,SZ,SWZ,748,ISO 3166-2:SZ,Africa,Southern Africa,002,018
Sweden,SE,SWE,752,ISO 3166-2:SE,Europe,Northern Europe,150,154
Switzerland,CH,CHE,756,ISO 3166-2:CH,Europe,Western Europe,150,155
Syrian Arab Republic,SY,SYR,760,ISO 3166-2:SY,Asia,Western Asia,142,145
"Taiwan, Province of China",TW,TWN,158,ISO 3166-2:TW,Asia,Eastern Asia,142,030
Tajikistan,TJ,TJK,762,ISO 3166-2:TJ,Asia,Central Asia,142,143
"Tanzania, United Republic of",TZ,TZA,834,ISO 3166-2:TZ,Africa,Eastern Africa,002,014
Thailand,TH,THA,764,ISO 3166-2:TH,Asia,South-Eastern Asia,142,035
Timor-Leste,TL,TLS,626,ISO 3166-2:TL,Asia,South-Eastern Asia,142,035
Togo,TG,TGO,768,ISO 3166-2:TG,Africa,Western Africa,002,011
Tokelau,TK,TKL,772,ISO 3166-2:TK,Oceania,Polynesia,009,061
Tonga,TO,TON,776,ISO 3166-2:TO,Oceania,Polynesia,009,061
Trinidad and Tobago,TT,TTO,780,ISO 3166-2:TT,Americas,Caribbean,019,029
Tunisia,TN,TUN,788,ISO 3166-2:TN,Africa,Northern Africa,002,015
Turkey,TR,TUR,792,ISO 3166-2:TR,Asia,Western Asia,142,145
Turkmenistan,TM,TKM,795,ISO 3166-2:TM,Asia,Central Asia,142,143
Turks and Caicos Islands,TC,TCA,796,ISO 3166-2:TC,Americas,Caribbean,019,029
Tuvalu,TV,TUV,798,ISO 3166-2:TV,Oceania,Polynesia,009,061
Uganda,UG,UGA,800,ISO 3166-2:UG,Africa,Eastern Africa,002,014
Ukraine,UA,UKR,804,ISO 3166-2:UA,Europe,Eastern Europe,150,151
United Arab Emirates,AE,ARE,784,ISO 3166-2:AE,Asia,Western Asia,142,145
United Kingdom of Great Britain and Northern Ireland,GB,GBR,826,ISO 3166-2:GB,Europe,Northern Europe,150,154
United States of America,US,USA,840,ISO 3166-2:US,Americas,Northern America,019,021
United States Minor Outlying Islands,UM,UMI,581,ISO 3166-2:UM,,,,
Uruguay,UY,URY,858,ISO 3166-2:UY,Americas,South America,019,005
Uzbekistan,UZ,UZB,860,ISO 3166-2:UZ,Asia,Central Asia,142,143
Vanuatu,VU,VUT,548,ISO 3166-2:VU,Oceania,Melanesia,009,054
Venezuela (Bolivarian Republic of),VE,VEN,862,ISO 3166-2:VE,Americas,South America,019,005
Viet Nam,VN,VNM,704,ISO 3166-2:VN,Asia,South-Eastern Asia,142,035
Virgin Islands (British),VG,VGB,092,ISO 3166-2:VG,Americas,Caribbean,019,029
Virgin Islands (U.S.),VI,VIR,850,ISO 3166-2:VI,Americas,Caribbean,019,029
Wallis and Futuna,WF,WLF,876,ISO 3166-2:WF,Oceania,Polynesia,009,061
Western Sahara,EH,ESH,732,ISO 3166-2:EH,Africa,Northern Africa,002,015
Yemen,YE,YEM,887,ISO 3166-2:YE,Asia,Western Asia,142,145
Zambia,ZM,ZMB,894,ISO 3166-2:ZM,Africa,Eastern Africa,002,014
Zimbabwe,ZW,ZWE,716,ISO 3166-2:ZW,Africa,Eastern Africa,002,014
                """
    res = 0
    names = []
    countries = get_google_countries()
    for k in countries:
        country_name = k
        database.db_insert_countries_row(country_name,'')




    print("###: ", res)


def fill_streaming_services_popularity():
        movies_list = database.db_get_streaming_services
        print(type(movies_list))
        # for k in movies_list:
        #     print(k)

def get_country_names():
        countries = """
                    name,alpha-2,alpha-3,country-code,iso_3166-2,region,sub-region,region-code,sub-region-code
    Afghanistan,AF,AFG,004,ISO 3166-2:AF,Asia,Southern Asia,142,034
    Åland Islands,AX,ALA,248,ISO 3166-2:AX,Europe,Northern Europe,150,154
    Albania,AL,ALB,008,ISO 3166-2:AL,Europe,Southern Europe,150,039
    Algeria,DZ,DZA,012,ISO 3166-2:DZ,Africa,Northern Africa,002,015
    American Samoa,AS,ASM,016,ISO 3166-2:AS,Oceania,Polynesia,009,061
    Andorra,AD,AND,020,ISO 3166-2:AD,Europe,Southern Europe,150,039
    Angola,AO,AGO,024,ISO 3166-2:AO,Africa,Middle Africa,002,017
    Anguilla,AI,AIA,660,ISO 3166-2:AI,Americas,Caribbean,019,029
    Antarctica,AQ,ATA,010,ISO 3166-2:AQ,,,,
    Antigua and Barbuda,AG,ATG,028,ISO 3166-2:AG,Americas,Caribbean,019,029
    Argentina,AR,ARG,032,ISO 3166-2:AR,Americas,South America,019,005
    Armenia,AM,ARM,051,ISO 3166-2:AM,Asia,Western Asia,142,145
    Aruba,AW,ABW,533,ISO 3166-2:AW,Americas,Caribbean,019,029
    Australia,AU,AUS,036,ISO 3166-2:AU,Oceania,Australia and New Zealand,009,053
    Austria,AT,AUT,040,ISO 3166-2:AT,Europe,Western Europe,150,155
    Azerbaijan,AZ,AZE,031,ISO 3166-2:AZ,Asia,Western Asia,142,145
    Bahamas,BS,BHS,044,ISO 3166-2:BS,Americas,Caribbean,019,029
    Bahrain,BH,BHR,048,ISO 3166-2:BH,Asia,Western Asia,142,145
    Bangladesh,BD,BGD,050,ISO 3166-2:BD,Asia,Southern Asia,142,034
    Barbados,BB,BRB,052,ISO 3166-2:BB,Americas,Caribbean,019,029
    Belarus,BY,BLR,112,ISO 3166-2:BY,Europe,Eastern Europe,150,151
    Belgium,BE,BEL,056,ISO 3166-2:BE,Europe,Western Europe,150,155
    Belize,BZ,BLZ,084,ISO 3166-2:BZ,Americas,Central America,019,013
    Benin,BJ,BEN,204,ISO 3166-2:BJ,Africa,Western Africa,002,011
    Bermuda,BM,BMU,060,ISO 3166-2:BM,Americas,Northern America,019,021
    Bhutan,BT,BTN,064,ISO 3166-2:BT,Asia,Southern Asia,142,034
    Bolivia (Plurinational State of),BO,BOL,068,ISO 3166-2:BO,Americas,South America,019,005
    "Bonaire, Sint Eustatius and Saba",BQ,BES,535,ISO 3166-2:BQ,Americas,Caribbean,019,029
    Bosnia and Herzegovina,BA,BIH,070,ISO 3166-2:BA,Europe,Southern Europe,150,039
    Botswana,BW,BWA,072,ISO 3166-2:BW,Africa,Southern Africa,002,018
    Bouvet Island,BV,BVT,074,ISO 3166-2:BV,,,,
    Brazil,BR,BRA,076,ISO 3166-2:BR,Americas,South America,019,005
    British Indian Ocean Territory,IO,IOT,086,ISO 3166-2:IO,,,,
    Brunei Darussalam,BN,BRN,096,ISO 3166-2:BN,Asia,South-Eastern Asia,142,035
    Bulgaria,BG,BGR,100,ISO 3166-2:BG,Europe,Eastern Europe,150,151
    Burkina Faso,BF,BFA,854,ISO 3166-2:BF,Africa,Western Africa,002,011
    Burundi,BI,BDI,108,ISO 3166-2:BI,Africa,Eastern Africa,002,014
    Cambodia,KH,KHM,116,ISO 3166-2:KH,Asia,South-Eastern Asia,142,035
    Cameroon,CM,CMR,120,ISO 3166-2:CM,Africa,Middle Africa,002,017
    Canada,CA,CAN,124,ISO 3166-2:CA,Americas,Northern America,019,021
    Cabo Verde,CV,CPV,132,ISO 3166-2:CV,Africa,Western Africa,002,011
    Cayman Islands,KY,CYM,136,ISO 3166-2:KY,Americas,Caribbean,019,029
    Central African Republic,CF,CAF,140,ISO 3166-2:CF,Africa,Middle Africa,002,017
    Chad,TD,TCD,148,ISO 3166-2:TD,Africa,Middle Africa,002,017
    Chile,CL,CHL,152,ISO 3166-2:CL,Americas,South America,019,005
    China,CN,CHN,156,ISO 3166-2:CN,Asia,Eastern Asia,142,030
    Christmas Island,CX,CXR,162,ISO 3166-2:CX,,,,
    Cocos (Keeling) Islands,CC,CCK,166,ISO 3166-2:CC,,,,
    Colombia,CO,COL,170,ISO 3166-2:CO,Americas,South America,019,005
    Comoros,KM,COM,174,ISO 3166-2:KM,Africa,Eastern Africa,002,014
    Congo,CG,COG,178,ISO 3166-2:CG,Africa,Middle Africa,002,017
    Congo (Democratic Republic of the),CD,COD,180,ISO 3166-2:CD,Africa,Middle Africa,002,017
    Cook Islands,CK,COK,184,ISO 3166-2:CK,Oceania,Polynesia,009,061
    Costa Rica,CR,CRI,188,ISO 3166-2:CR,Americas,Central America,019,013
    Côte d'Ivoire,CI,CIV,384,ISO 3166-2:CI,Africa,Western Africa,002,011
    Croatia,HR,HRV,191,ISO 3166-2:HR,Europe,Southern Europe,150,039
    Cuba,CU,CUB,192,ISO 3166-2:CU,Americas,Caribbean,019,029
    Curaçao,CW,CUW,531,ISO 3166-2:CW,Americas,Caribbean,019,029
    Cyprus,CY,CYP,196,ISO 3166-2:CY,Asia,Western Asia,142,145
    Czech Republic,CZ,CZE,203,ISO 3166-2:CZ,Europe,Eastern Europe,150,151
    Denmark,DK,DNK,208,ISO 3166-2:DK,Europe,Northern Europe,150,154
    Djibouti,DJ,DJI,262,ISO 3166-2:DJ,Africa,Eastern Africa,002,014
    Dominica,DM,DMA,212,ISO 3166-2:DM,Americas,Caribbean,019,029
    Dominican Republic,DO,DOM,214,ISO 3166-2:DO,Americas,Caribbean,019,029
    Ecuador,EC,ECU,218,ISO 3166-2:EC,Americas,South America,019,005
    Egypt,EG,EGY,818,ISO 3166-2:EG,Africa,Northern Africa,002,015
    El Salvador,SV,SLV,222,ISO 3166-2:SV,Americas,Central America,019,013
    Equatorial Guinea,GQ,GNQ,226,ISO 3166-2:GQ,Africa,Middle Africa,002,017
    Eritrea,ER,ERI,232,ISO 3166-2:ER,Africa,Eastern Africa,002,014
    Estonia,EE,EST,233,ISO 3166-2:EE,Europe,Northern Europe,150,154
    Ethiopia,ET,ETH,231,ISO 3166-2:ET,Africa,Eastern Africa,002,014
    Falkland Islands (Malvinas),FK,FLK,238,ISO 3166-2:FK,Americas,South America,019,005
    Faroe Islands,FO,FRO,234,ISO 3166-2:FO,Europe,Northern Europe,150,154
    Fiji,FJ,FJI,242,ISO 3166-2:FJ,Oceania,Melanesia,009,054
    Finland,FI,FIN,246,ISO 3166-2:FI,Europe,Northern Europe,150,154
    France,FR,FRA,250,ISO 3166-2:FR,Europe,Western Europe,150,155
    French Guiana,GF,GUF,254,ISO 3166-2:GF,Americas,South America,019,005
    French Polynesia,PF,PYF,258,ISO 3166-2:PF,Oceania,Polynesia,009,061
    French Southern Territories,TF,ATF,260,ISO 3166-2:TF,,,,
    Gabon,GA,GAB,266,ISO 3166-2:GA,Africa,Middle Africa,002,017
    Gambia,GM,GMB,270,ISO 3166-2:GM,Africa,Western Africa,002,011
    Georgia,GE,GEO,268,ISO 3166-2:GE,Asia,Western Asia,142,145
    Germany,DE,DEU,276,ISO 3166-2:DE,Europe,Western Europe,150,155
    Ghana,GH,GHA,288,ISO 3166-2:GH,Africa,Western Africa,002,011
    Gibraltar,GI,GIB,292,ISO 3166-2:GI,Europe,Southern Europe,150,039
    Greece,GR,GRC,300,ISO 3166-2:GR,Europe,Southern Europe,150,039
    Greenland,GL,GRL,304,ISO 3166-2:GL,Americas,Northern America,019,021
    Grenada,GD,GRD,308,ISO 3166-2:GD,Americas,Caribbean,019,029
    Guadeloupe,GP,GLP,312,ISO 3166-2:GP,Americas,Caribbean,019,029
    Guam,GU,GUM,316,ISO 3166-2:GU,Oceania,Micronesia,009,057
    Guatemala,GT,GTM,320,ISO 3166-2:GT,Americas,Central America,019,013
    Guernsey,GG,GGY,831,ISO 3166-2:GG,Europe,Northern Europe,150,154
    Guinea,GN,GIN,324,ISO 3166-2:GN,Africa,Western Africa,002,011
    Guinea-Bissau,GW,GNB,624,ISO 3166-2:GW,Africa,Western Africa,002,011
    Guyana,GY,GUY,328,ISO 3166-2:GY,Americas,South America,019,005
    Haiti,HT,HTI,332,ISO 3166-2:HT,Americas,Caribbean,019,029
    Heard Island and McDonald Islands,HM,HMD,334,ISO 3166-2:HM,,,,
    Holy See,VA,VAT,336,ISO 3166-2:VA,Europe,Southern Europe,150,039
    Honduras,HN,HND,340,ISO 3166-2:HN,Americas,Central America,019,013
    Hong Kong,HK,HKG,344,ISO 3166-2:HK,Asia,Eastern Asia,142,030
    Hungary,HU,HUN,348,ISO 3166-2:HU,Europe,Eastern Europe,150,151
    Iceland,IS,ISL,352,ISO 3166-2:IS,Europe,Northern Europe,150,154
    India,IN,IND,356,ISO 3166-2:IN,Asia,Southern Asia,142,034
    Indonesia,ID,IDN,360,ISO 3166-2:ID,Asia,South-Eastern Asia,142,035
    Iran (Islamic Republic of),IR,IRN,364,ISO 3166-2:IR,Asia,Southern Asia,142,034
    Iraq,IQ,IRQ,368,ISO 3166-2:IQ,Asia,Western Asia,142,145
    Ireland,IE,IRL,372,ISO 3166-2:IE,Europe,Northern Europe,150,154
    Isle of Man,IM,IMN,833,ISO 3166-2:IM,Europe,Northern Europe,150,154
    Israel,IL,ISR,376,ISO 3166-2:IL,Asia,Western Asia,142,145
    Italy,IT,ITA,380,ISO 3166-2:IT,Europe,Southern Europe,150,039
    Jamaica,JM,JAM,388,ISO 3166-2:JM,Americas,Caribbean,019,029
    Japan,JP,JPN,392,ISO 3166-2:JP,Asia,Eastern Asia,142,030
    Jersey,JE,JEY,832,ISO 3166-2:JE,Europe,Northern Europe,150,154
    Jordan,JO,JOR,400,ISO 3166-2:JO,Asia,Western Asia,142,145
    Kazakhstan,KZ,KAZ,398,ISO 3166-2:KZ,Asia,Central Asia,142,143
    Kenya,KE,KEN,404,ISO 3166-2:KE,Africa,Eastern Africa,002,014
    Kiribati,KI,KIR,296,ISO 3166-2:KI,Oceania,Micronesia,009,057
    Korea (Democratic People's Republic of),KP,PRK,408,ISO 3166-2:KP,Asia,Eastern Asia,142,030
    Korea (Republic of),KR,KOR,410,ISO 3166-2:KR,Asia,Eastern Asia,142,030
    Kuwait,KW,KWT,414,ISO 3166-2:KW,Asia,Western Asia,142,145
    Kyrgyzstan,KG,KGZ,417,ISO 3166-2:KG,Asia,Central Asia,142,143
    Lao People's Democratic Republic,LA,LAO,418,ISO 3166-2:LA,Asia,South-Eastern Asia,142,035
    Latvia,LV,LVA,428,ISO 3166-2:LV,Europe,Northern Europe,150,154
    Lebanon,LB,LBN,422,ISO 3166-2:LB,Asia,Western Asia,142,145
    Lesotho,LS,LSO,426,ISO 3166-2:LS,Africa,Southern Africa,002,018
    Liberia,LR,LBR,430,ISO 3166-2:LR,Africa,Western Africa,002,011
    Libya,LY,LBY,434,ISO 3166-2:LY,Africa,Northern Africa,002,015
    Liechtenstein,LI,LIE,438,ISO 3166-2:LI,Europe,Western Europe,150,155
    Lithuania,LT,LTU,440,ISO 3166-2:LT,Europe,Northern Europe,150,154
    Luxembourg,LU,LUX,442,ISO 3166-2:LU,Europe,Western Europe,150,155
    Macao,MO,MAC,446,ISO 3166-2:MO,Asia,Eastern Asia,142,030
    Macedonia (the former Yugoslav Republic of),MK,MKD,807,ISO 3166-2:MK,Europe,Southern Europe,150,039
    Madagascar,MG,MDG,450,ISO 3166-2:MG,Africa,Eastern Africa,002,014
    Malawi,MW,MWI,454,ISO 3166-2:MW,Africa,Eastern Africa,002,014
    Malaysia,MY,MYS,458,ISO 3166-2:MY,Asia,South-Eastern Asia,142,035
    Maldives,MV,MDV,462,ISO 3166-2:MV,Asia,Southern Asia,142,034
    Mali,ML,MLI,466,ISO 3166-2:ML,Africa,Western Africa,002,011
    Malta,MT,MLT,470,ISO 3166-2:MT,Europe,Southern Europe,150,039
    Marshall Islands,MH,MHL,584,ISO 3166-2:MH,Oceania,Micronesia,009,057
    Martinique,MQ,MTQ,474,ISO 3166-2:MQ,Americas,Caribbean,019,029
    Mauritania,MR,MRT,478,ISO 3166-2:MR,Africa,Western Africa,002,011
    Mauritius,MU,MUS,480,ISO 3166-2:MU,Africa,Eastern Africa,002,014
    Mayotte,YT,MYT,175,ISO 3166-2:YT,Africa,Eastern Africa,002,014
    Mexico,MX,MEX,484,ISO 3166-2:MX,Americas,Central America,019,013
    Micronesia (Federated States of),FM,FSM,583,ISO 3166-2:FM,Oceania,Micronesia,009,057
    Moldova (Republic of),MD,MDA,498,ISO 3166-2:MD,Europe,Eastern Europe,150,151
    Monaco,MC,MCO,492,ISO 3166-2:MC,Europe,Western Europe,150,155
    Mongolia,MN,MNG,496,ISO 3166-2:MN,Asia,Eastern Asia,142,030
    Montenegro,ME,MNE,499,ISO 3166-2:ME,Europe,Southern Europe,150,039
    Montserrat,MS,MSR,500,ISO 3166-2:MS,Americas,Caribbean,019,029
    Morocco,MA,MAR,504,ISO 3166-2:MA,Africa,Northern Africa,002,015
    Mozambique,MZ,MOZ,508,ISO 3166-2:MZ,Africa,Eastern Africa,002,014
    Myanmar,MM,MMR,104,ISO 3166-2:MM,Asia,South-Eastern Asia,142,035
    Namibia,NA,NAM,516,ISO 3166-2:NA,Africa,Southern Africa,002,018
    Nauru,NR,NRU,520,ISO 3166-2:NR,Oceania,Micronesia,009,057
    Nepal,NP,NPL,524,ISO 3166-2:NP,Asia,Southern Asia,142,034
    Netherlands,NL,NLD,528,ISO 3166-2:NL,Europe,Western Europe,150,155
    New Caledonia,NC,NCL,540,ISO 3166-2:NC,Oceania,Melanesia,009,054
    New Zealand,NZ,NZL,554,ISO 3166-2:NZ,Oceania,Australia and New Zealand,009,053
    Nicaragua,NI,NIC,558,ISO 3166-2:NI,Americas,Central America,019,013
    Niger,NE,NER,562,ISO 3166-2:NE,Africa,Western Africa,002,011
    Nigeria,NG,NGA,566,ISO 3166-2:NG,Africa,Western Africa,002,011
    Niue,NU,NIU,570,ISO 3166-2:NU,Oceania,Polynesia,009,061
    Norfolk Island,NF,NFK,574,ISO 3166-2:NF,Oceania,Australia and New Zealand,009,053
    Northern Mariana Islands,MP,MNP,580,ISO 3166-2:MP,Oceania,Micronesia,009,057
    Norway,NO,NOR,578,ISO 3166-2:NO,Europe,Northern Europe,150,154
    Oman,OM,OMN,512,ISO 3166-2:OM,Asia,Western Asia,142,145
    Pakistan,PK,PAK,586,ISO 3166-2:PK,Asia,Southern Asia,142,034
    Palau,PW,PLW,585,ISO 3166-2:PW,Oceania,Micronesia,009,057
    "Palestine, State of",PS,PSE,275,ISO 3166-2:PS,Asia,Western Asia,142,145
    Panama,PA,PAN,591,ISO 3166-2:PA,Americas,Central America,019,013
    Papua New Guinea,PG,PNG,598,ISO 3166-2:PG,Oceania,Melanesia,009,054
    Paraguay,PY,PRY,600,ISO 3166-2:PY,Americas,South America,019,005
    Peru,PE,PER,604,ISO 3166-2:PE,Americas,South America,019,005
    Philippines,PH,PHL,608,ISO 3166-2:PH,Asia,South-Eastern Asia,142,035
    Pitcairn,PN,PCN,612,ISO 3166-2:PN,Oceania,Polynesia,009,061
    Poland,PL,POL,616,ISO 3166-2:PL,Europe,Eastern Europe,150,151
    Portugal,PT,PRT,620,ISO 3166-2:PT,Europe,Southern Europe,150,039
    Puerto Rico,PR,PRI,630,ISO 3166-2:PR,Americas,Caribbean,019,029
    Qatar,QA,QAT,634,ISO 3166-2:QA,Asia,Western Asia,142,145
    Réunion,RE,REU,638,ISO 3166-2:RE,Africa,Eastern Africa,002,014
    Romania,RO,ROU,642,ISO 3166-2:RO,Europe,Eastern Europe,150,151
    Russian Federation,RU,RUS,643,ISO 3166-2:RU,Europe,Eastern Europe,150,151
    Rwanda,RW,RWA,646,ISO 3166-2:RW,Africa,Eastern Africa,002,014
    Saint Barthélemy,BL,BLM,652,ISO 3166-2:BL,Americas,Caribbean,019,029
    "Saint Helena, Ascension and Tristan da Cunha",SH,SHN,654,ISO 3166-2:SH,Africa,Western Africa,002,011
    Saint Kitts and Nevis,KN,KNA,659,ISO 3166-2:KN,Americas,Caribbean,019,029
    Saint Lucia,LC,LCA,662,ISO 3166-2:LC,Americas,Caribbean,019,029
    Saint Martin (French part),MF,MAF,663,ISO 3166-2:MF,Americas,Caribbean,019,029
    Saint Pierre and Miquelon,PM,SPM,666,ISO 3166-2:PM,Americas,Northern America,019,021
    Saint Vincent and the Grenadines,VC,VCT,670,ISO 3166-2:VC,Americas,Caribbean,019,029
    Samoa,WS,WSM,882,ISO 3166-2:WS,Oceania,Polynesia,009,061
    San Marino,SM,SMR,674,ISO 3166-2:SM,Europe,Southern Europe,150,039
    Sao Tome and Principe,ST,STP,678,ISO 3166-2:ST,Africa,Middle Africa,002,017
    Saudi Arabia,SA,SAU,682,ISO 3166-2:SA,Asia,Western Asia,142,145
    Senegal,SN,SEN,686,ISO 3166-2:SN,Africa,Western Africa,002,011
    Serbia,RS,SRB,688,ISO 3166-2:RS,Europe,Southern Europe,150,039
    Seychelles,SC,SYC,690,ISO 3166-2:SC,Africa,Eastern Africa,002,014
    Sierra Leone,SL,SLE,694,ISO 3166-2:SL,Africa,Western Africa,002,011
    Singapore,SG,SGP,702,ISO 3166-2:SG,Asia,South-Eastern Asia,142,035
    Sint Maarten (Dutch part),SX,SXM,534,ISO 3166-2:SX,Americas,Caribbean,019,029
    Slovakia,SK,SVK,703,ISO 3166-2:SK,Europe,Eastern Europe,150,151
    Slovenia,SI,SVN,705,ISO 3166-2:SI,Europe,Southern Europe,150,039
    Solomon Islands,SB,SLB,090,ISO 3166-2:SB,Oceania,Melanesia,009,054
    Somalia,SO,SOM,706,ISO 3166-2:SO,Africa,Eastern Africa,002,014
    South Africa,ZA,ZAF,710,ISO 3166-2:ZA,Africa,Southern Africa,002,018
    South Georgia and the South Sandwich Islands,GS,SGS,239,ISO 3166-2:GS,,,,
    South Sudan,SS,SSD,728,ISO 3166-2:SS,Africa,Eastern Africa,002,014
    Spain,ES,ESP,724,ISO 3166-2:ES,Europe,Southern Europe,150,039
    Sri Lanka,LK,LKA,144,ISO 3166-2:LK,Asia,Southern Asia,142,034
    Sudan,SD,SDN,729,ISO 3166-2:SD,Africa,Northern Africa,002,015
    Suriname,SR,SUR,740,ISO 3166-2:SR,Americas,South America,019,005
    Svalbard and Jan Mayen,SJ,SJM,744,ISO 3166-2:SJ,Europe,Northern Europe,150,154
    Swaziland,SZ,SWZ,748,ISO 3166-2:SZ,Africa,Southern Africa,002,018
    Sweden,SE,SWE,752,ISO 3166-2:SE,Europe,Northern Europe,150,154
    Switzerland,CH,CHE,756,ISO 3166-2:CH,Europe,Western Europe,150,155
    Syrian Arab Republic,SY,SYR,760,ISO 3166-2:SY,Asia,Western Asia,142,145
    "Taiwan, Province of China",TW,TWN,158,ISO 3166-2:TW,Asia,Eastern Asia,142,030
    Tajikistan,TJ,TJK,762,ISO 3166-2:TJ,Asia,Central Asia,142,143
    "Tanzania, United Republic of",TZ,TZA,834,ISO 3166-2:TZ,Africa,Eastern Africa,002,014
    Thailand,TH,THA,764,ISO 3166-2:TH,Asia,South-Eastern Asia,142,035
    Timor-Leste,TL,TLS,626,ISO 3166-2:TL,Asia,South-Eastern Asia,142,035
    Togo,TG,TGO,768,ISO 3166-2:TG,Africa,Western Africa,002,011
    Tokelau,TK,TKL,772,ISO 3166-2:TK,Oceania,Polynesia,009,061
    Tonga,TO,TON,776,ISO 3166-2:TO,Oceania,Polynesia,009,061
    Trinidad and Tobago,TT,TTO,780,ISO 3166-2:TT,Americas,Caribbean,019,029
    Tunisia,TN,TUN,788,ISO 3166-2:TN,Africa,Northern Africa,002,015
    Turkey,TR,TUR,792,ISO 3166-2:TR,Asia,Western Asia,142,145
    Turkmenistan,TM,TKM,795,ISO 3166-2:TM,Asia,Central Asia,142,143
    Turks and Caicos Islands,TC,TCA,796,ISO 3166-2:TC,Americas,Caribbean,019,029
    Tuvalu,TV,TUV,798,ISO 3166-2:TV,Oceania,Polynesia,009,061
    Uganda,UG,UGA,800,ISO 3166-2:UG,Africa,Eastern Africa,002,014
    Ukraine,UA,UKR,804,ISO 3166-2:UA,Europe,Eastern Europe,150,151
    United Arab Emirates,AE,ARE,784,ISO 3166-2:AE,Asia,Western Asia,142,145
    United Kingdom of Great Britain and Northern Ireland,GB,GBR,826,ISO 3166-2:GB,Europe,Northern Europe,150,154
    United States of America,US,USA,840,ISO 3166-2:US,Americas,Northern America,019,021
    United States Minor Outlying Islands,UM,UMI,581,ISO 3166-2:UM,,,,
    Uruguay,UY,URY,858,ISO 3166-2:UY,Americas,South America,019,005
    Uzbekistan,UZ,UZB,860,ISO 3166-2:UZ,Asia,Central Asia,142,143
    Vanuatu,VU,VUT,548,ISO 3166-2:VU,Oceania,Melanesia,009,054
    Venezuela (Bolivarian Republic of),VE,VEN,862,ISO 3166-2:VE,Americas,South America,019,005
    Viet Nam,VN,VNM,704,ISO 3166-2:VN,Asia,South-Eastern Asia,142,035
    Virgin Islands (British),VG,VGB,092,ISO 3166-2:VG,Americas,Caribbean,019,029
    Virgin Islands (U.S.),VI,VIR,850,ISO 3166-2:VI,Americas,Caribbean,019,029
    Wallis and Futuna,WF,WLF,876,ISO 3166-2:WF,Oceania,Polynesia,009,061
    Western Sahara,EH,ESH,732,ISO 3166-2:EH,Africa,Northern Africa,002,015
    Yemen,YE,YEM,887,ISO 3166-2:YE,Asia,Western Asia,142,145
    Zambia,ZM,ZMB,894,ISO 3166-2:ZM,Africa,Eastern Africa,002,014
    Zimbabwe,ZW,ZWE,716,ISO 3166-2:ZW,Africa,Eastern Africa,002,014
                    """


        res = 0
        names = []
        for k in countries.split("\n"):
            country_name = k.split(",")[0]
            index = 0;
            names.append(country_name)

        return names
def get_google_countries():
    pytrend = TrendReq()

    # Create payload and capture API tokens. Only needed for interest_over_time(), interest_by_region() & related_queries()
    pytrend.build_payload(kw_list=['jessica jones'])

    # Interest Over Time
    interest_over_time_df = pytrend.interest_over_time()
    print(interest_over_time_df.head())

    interest_by_region_df = pytrend.interest_by_region()
    #print(interest_by_region_df)
    res = []
    for country, row in interest_by_region_df.iterrows():
        res.append(country)

    return res

def get_google_trend(movie_name):
    pytrend = TrendReq()

    # Create payload and capture API tokens. Only needed for interest_over_time(), interest_by_region() & related_queries()
    pytrend.build_payload(kw_list=[movie_name])

    # Interest Over Time
    interest_over_time_df = pytrend.interest_over_time()
    print(interest_over_time_df.head())

    interest_by_region_df = pytrend.interest_by_region()
    #print(interest_by_region_df)
    res = []
    for country, row in interest_by_region_df.iterrows():
        print(country)
        print(row[0])
        res.append((country, row[0]))

    res = sorted(res, key=lambda x: x[1], reverse=True)
    print("SORTED: ", res[:20])
    print("DONE")
    return res[:20]
    # names = get_country_names()
    #
    # countries = []

    # for k in names:
    #     str = ""
    #     flipped = 0
    #     for i in k:
    #         if i != ' ' or flipped == 1:
    #             flipped = 1
    #             str = str + i
    #
    #     countries.append(str)
    #
    # print(countries)

    # for k in countries:
    #     try:
    #         print(k)
    #         print(interest_by_region_df['jessica jones'][k])
    #     except Exception:
    #         print("NOT FOUND: ", k)
    #print(type(interest_by_region_df['altered carbon']))

    # for k in interest_by_region_df['altered carbon'][]:
    #     print(k['United States'])





def get_country_pics(country_name):
    print("GETTING GUIDEBOX")
    #countries_url = "http://restcountries.eu/rest/v2/name/" + country_name
    countries_url = "http://restcountries.eu/rest/v2/all"
    req = urllib.request.Request(countries_url)
    r = urllib.request.urlopen(req).read()
    cont = json.loads(r.decode('utf-8'))
    print(cont[0]['name'])
    bad_count = 0

    res = get_google_countries()
    count = 0

    for k in cont:
        print("$$: ",k)
        if any(k['name'] in s for s in res):
            print("FOUND: ", k['name'])
            pop = k['population']
            lang_list = []
            for lang in k['languages']:
                lang_list.append(lang['name'])
            langs = ", ".join(lang_list)
            country_id = database.db_get_country_id(k['name'])
            country_id = database.get_sql_results()
            if len(country_id) > 0:
                count+=1
                c_id = country_id[0][0]
                print("ID: ", c_id)
                print("POP: ", pop)
                print("LANGS : ", langs)
                print("FLAG URL: ", k['flag'])
                print("REGION: ", k['region'])
                print("LATLNG: ", k['latlng'])
                print("LATLNG: ", type(k['latlng']))
                database.db_update_country_image(c_id, k['flag'], pop, langs)
        else:
            b = 1
            #print("DIDNT FIND: ", k['name'])

        # special case to get US Flag, disreguarding other small countries
        if k['name'] == "United States of America":
            print("FOUND: ", k['name'])
            country_id = database.db_get_country_id("United States")
            country_id = database.get_sql_results()
            c_id = country_id[0][0]
            print("ID: ", country_id)
            database.db_update_country_image(c_id, k['flag'])

    print("COUNT: ", count)

    # if cont['status']


def get_country_region_latlng(country_name):
    print("GETTING COUNTRIES")
    #countries_url = "http://restcountries.eu/rest/v2/name/" + country_name
    countries_url = "http://restcountries.eu/rest/v2/all"
    req = urllib.request.Request(countries_url)
    r = urllib.request.urlopen(req).read()
    cont = json.loads(r.decode('utf-8'))
    print(cont[0]['name'])
    bad_count = 0

    res = get_google_countries()
    count = 0

    for k in cont:
        print("$$: ",k)
        if any(k['name'] in s for s in res):
            print("FOUND: ", k['name'])
            pop = k['population']
            lang_list = []
            for lang in k['languages']:
                lang_list.append(lang['name'])
            langs = ", ".join(lang_list)
            country_id = database.db_get_country_id(k['name'])
            country_id = database.get_sql_results()
            if len(country_id) > 0:
                count+=1
                c_id = country_id[0][0]
                print("ID: ", c_id)
                print("POP: ", pop)
                print("LANGS : ", langs)
                print("FLAG URL: ", k['flag'])
                print("REGION: ", k['region'])
                print("LATLNG: ", k['region'])
                print("LATLNG: ", type(k['latlng']))
                temp = []
                for p in k['latlng']:
                    temp.append(p)

                database.db_update_country_region_latlng(c_id, k['region'], temp[0], temp[1])
        else:
            b = 1
            #print("DIDNT FIND: ", k['name'])

        #special case to get US Flag, disreguarding other small countries
        if k['name'] == "United States of America":
            print("FOUND: ", k['name'])
            country_id = database.db_get_country_id("United States")
            country_id = database.get_sql_results()
            temp = []
            for p in k['latlng']:
                temp.append(p)
            c_id = country_id[0][0]
            print("ID: ", country_id)
            database.db_update_country_region_latlng(c_id, k['region'], temp[0], temp[1])

    print("COUNT: ", count)

    # if cont['status']



def get_ssid(name):
    res = database.db_get_ssid(name)
    res = database.get_sql_results()
    return res[0][0]


if __name__ == "__main__":
    #get_omdb_show(441701)
    #database.db_insert_omdb_movie("t", "t","t", "t", "t", "t", "t", "trailer")
    #get_guidebox_shows("netflix", "0")
    #get_ssid("netflix")
    #get_google_trend("altered carbon")
    #get_twitter_response("altered carbon")
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
            # results = get_guidebox_shows("netflix", offset)
            # for j, v, m in results:
            #   insert_guidebox_movie_row(j, v, m, get_ssid("netflix"))


            # results = get_guidebox_shows("hbo", offset)
            # for j, v, m in results:
            #   insert_guidebox_movie_row(j, v, m, get_ssid("hbo"))
            #
            # results = get_guidebox_shows("amazon_prime", offset)
            # for j, v, m in results:
            #   insert_guidebox_movie_row(j, v, m, get_ssid("amazon_prime"))
            #
            # results = get_guidebox_shows("hulu_plus", offset)
            # for j, v, m in results:
            #   insert_guidebox_movie_row(j, v, m, get_ssid("hulu_plus"))
            #
            # results = get_guidebox_shows("showtime_subscription", offset)
            # for j, v, m in results:
            #   insert_guidebox_movie_row(j, v, m, get_ssid("showtime_subscription"))

            # results = get_guidebox_shows("lifetimemovieclub_amazon_prime", offset)
            # for j, v, m in results:
            #   insert_guidebox_movie_row(j, v, m, get_ssid("lifetime"))
            #
            # results = get_guidebox_shows("ifc", offset)
            # for j, v, m in results:
            #   insert_guidebox_movie_row(j, v, m, get_ssid("ifc"))
            #
            # results = get_guidebox_shows("hallmark_everywhere", offset)
            # for j, v, m in results:
            #   insert_guidebox_movie_row(j, v, m, get_ssid("hallmark_everywhere"))

            # results = get_guidebox_shows("maxgo", offset)
            # for j, v, m in results:
            #   insert_guidebox_movie_row(j, v, m, get_ssid("max_go"))
            #
            # results = get_guidebox_shows("epix", offset)
            # for j, v, m in results:
            #   insert_guidebox_movie_row(j, v, m, get_ssid("epix"))
            #
            # results = get_guidebox_shows("mubi", offset)
            # for j, v, m in results:
            #   insert_guidebox_movie_row(j, v, m, get_ssid("mubi"))

            # results = get_guidebox_shows("paramount_movies", offset)
            # for j, v, m in results:
            #   insert_guidebox_movie_row(j, v, m, get_ssid("paramount_movies"))

            # results = get_guidebox_shows("mgo", offset)
            # for j, v, m in results:
            #   insert_guidebox_movie_row(j, v, m, get_ssid("fandango"))
            #
            # results = get_guidebox_shows("google_play", offset)
            # for j, v, m in results:
            #   insert_guidebox_movie_row(j, v, m, get_ssid("google_play"))
            #
            # results = get_guidebox_shows("vudu", offset)
            # for j, v, m in results:
            #   insert_guidebox_movie_row(j, v, m, get_ssid("vudu"))

            # results = get_guidebox_shows("crackle", offset)
            # for j, v, m in results:
            #   insert_guidebox_movie_row(j, v, m, get_ssid("crackle"))
            #
            # results = get_guidebox_shows("fx", offset)
            # for j, v, m in results:
            #   insert_guidebox_movie_row(j, v, m, get_ssid("fx"))
            #
            # results = get_guidebox_shows("starz_tveverywhere", offset)
            # for j, v, m in results:
            #   insert_guidebox_movie_row(j, v, m, get_ssid("starz_tveverywhere"))

            # results = get_guidebox_shows("tbs", offset)
            # for j, v, m in results:
            #   insert_guidebox_movie_row(j, v, m, get_ssid("tbs"))
            #
            # results = get_guidebox_shows("tnt", offset)
            # for j, v, m in results:
            #   insert_guidebox_movie_row(j, v, m, get_ssid("tnt"))







            #
            # ifc
            # hallmark_everywhere
            # indieflix
            # lifetimemovieclub_amazon_prime
            # maxgo
            # epix
            # mubi
            # paramount_movies
            # popcornflix
            # mgo:fandango
            # comedycentral_tveverywhere
            # google_play
            # vudu
            # crackle
            # fx
            # starz_tveverywhere
            # tbs
            # tnt



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
            sr = 1
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
                    ss_ids = []
                    for p in res:
                        ss_ids.append(p[0])
                    #streaming_service_id = res[0][0]
                    print("SSIDS____: "+ str(ss_ids))

                    time.sleep(3)
                    #print("K is: ",k)
                    #res = get_omdb_show(k[1].replace(" ", "%20"))
                    res = get_omdb_show(k[4])
                    #print("RES: ", res[0])
                    if res != []:
                        om_id = insert_omdb_movie_row(res[0]["title"], res[0]["description"], res[0]["rating"], res[0]["released"], res[0]["language"], res[0]["poster_url"], res[0]["movie_cast"], res[0]["trailer_url"], res[0]["genres"])
                        print("INSERTING OMDB: ", om_id)
                        #print("SSSSSSSS: ",streaming_service_id)
                        for j in ss_ids:
                            print("$$$REL: om_id "+ str(om_id) +" :: stream_id "+ str(k))
                            insert_om_to_ss_row(om_id, j)
                # toggle point to run data from guidebox_movies table based on ID
                if k[0] == -1:
                    print("FLIPPING SR")
                    sr = 1

                if k[0] == -1:
                    print("OFF SR")
                    sr = 0
            y = 1

        elif k == "translate":
            translate_relationships()

        elif k == "countries":
            fill_countries_table()

        elif k == "googletrend":
            switch = -1
            res = database.db_get_streaming_services()
            #res = database.db_get_omdb_movies()
            for k in database.get_sql_results():
                toggle_id = k[0]
                if toggle_id > switch:
                    print(k)
                    country_ranks = get_google_trend(k[1].replace("'", "%27"))
                    #country_ranks = sorted(country_counts, key=country_counts.get, reverse=True)[:5]
                    database.db_insert_country_to_ss_rows(toggle_id, country_ranks)
                    #database.db_insert_country_to_om_rows(toggle_id, country_ranks)
                    print("ranks: ",country_ranks)
                    print("IM ASLEEP FOR 10 secs")
                    time.sleep(15)
                    print("IM AWAKE!")
        elif k == "countrypics":
            get_country_pics("albania")
        elif k == "countryregion":
            get_country_region_latlng("albania")

            #fill_streaming_services_popularity()

            #do imdb
            #
