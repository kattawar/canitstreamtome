import json as json
from flask import request
from flask import jsonify
from flask import abort
import sys

#from .
import database

def startdbconnection():
    database.startup_database_connection()




def singlemovieapi(movie_id):
    out = database.db_select_moviev2(filtertype={"omdb_movie_id":[movie_id,"="]})
    if len(out) == 0:
        abort(404)
    return jsonify(out)  

def singlecountryapi(country_id):
    out = database.db_select_countryv2(filtertype={"country_id":[country_id,"="]})
    if len(out) == 0:
        abort(404)
    return jsonify(out)

def singlestreamingapi(stream_id):
    out = database.db_select_streaming_servicev2(filtertype={"stream_id":[stream_id,"="]})
    if len(out) == 0:
        abort(404)
    return jsonify(out)

def getGeneralArgs():
    return json.loads(request.args.get("filter",default=None)),int(request.args.get("pagesize",default=25)),int(request.args.get(
        "pagenum",default=0)),request.args.get("sortdir",default="asc")
def movieapi():
    filtertype,pagesize,pagenum,sortdir = getGeneralArgs()
    sort = request.args.get("sortby",default="title")
    try:
        out = database.db_select_moviev2(filtertype=filtertype, pagesize=pagesize,pagenum=pagenum,sortby=sort,sortdir=sortdir)
        return jsonify(out)
    except Exception as e:
        print(e)
        return abort(400)
def countryapi():
    filtertype,pagesize,pagenum,sortdir= getGeneralArgs()
    sort = request.args.get("sortby",default="name")
    try:
        out = database.db_select_countryv2(filtertype=filtertype, pagesize=pagesize,pagenum=pagenum,sortby=sort,sortdir=sortdir)
        return jsonify(out)
    except Exception as e:
        return abort(400)
def streamingapi():
    filtertype,pagesize,pagenum,sortdir = getGeneralArgs()
    sort = request.args.get("sortby",default="name")
    try:
        out = database.db_select_streaming_servicev2(filtertype=filtertype, pagesize=pagesize,pagenum=pagenum,sortby=sort,sortdir=sortdir)
        return jsonify(out)
    except Exception as e:
        return abort(400)
### Movie popularity
def moviepopularityapi(movie_id):
    out = database.db_select_movie_popularity(movie_id)
    if len(out) == 0:
        abort(404)
    return jsonify(out)
### Movie stream
def moviestreamapi(movie_id):
    out = database.db_select_movie_stream(movie_id)
    if len(out) == 0:
        abort(404)
    return jsonify(out)

### Stream Pop countries
def streampopcountryapi(stream_id):
    out = database.db_select_stream_country(stream_id)
    if len(out) == 0:
        abort(404)
    return jsonify(out)
### Country stream
def countrystreamapi(country_id):
    out = database.db_select_country_stream(country_id)
    if len(out) == 0:
        abort(404)
    return jsonify(out)

### Country movie
def countrymovieapi(country_id):
    out = database.db_select_country_movie(country_id)
    if len(out) == 0:
        abort(404)
    return jsonify(out)

### Stream movie
def streammovieapi(stream_id):
    out = database.db_select_stream_movie(stream_id)
    if len(out) == 0:
        abort(404)
    return jsonify(out)
    
    
    
    
