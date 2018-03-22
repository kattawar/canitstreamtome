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
    out = database.db_select_movie(filtertype="omdb_movie_id",value=movie_id)
    if len(out) == 0:
        abort(404)
    return jsonify(out)  

def singlecountryapi(country_id):
    out = database.db_select_country(filtertype="country_id",value=country_id)
    if len(out) == 0:
        abort(404)
    return jsonify(out)

def singlestreamingapi(stream_id):
    out = database.db_select_streaming_service(filtertype="stream_id",value=stream_id)
    if len(out) == 0:
        abort(404)
    return jsonify(out)

def getGeneralArgs():
    return request.args.get("filter",default=None),int(request.args.get("pagesize",default=25)),int(request.args.get(
        "pagenum",default=0)),request.args.get("sortdir",default="asc"),request.args.get("comparison","="),request.args.get("value",default=None)
def movieapi():
    filtertype,pagesize,pagenum,sortdir,comparison,value = getGeneralArgs()
    sort = request.args.get("sortby",default="title")
    try:
        out = database.db_select_movie(filtertype=filtertype,value=value,comparison=comparison, pagesize=pagesize,pagenum=pagenum,sortby=sort,sortdir=sortdir)
        return jsonify(out)
    except Exception as e:
        return abort(400)
def countryapi():
    filtertype,pagesize,pagenum,sortdir,comparison,value = getGeneralArgs()
    sort = request.args.get("sortby",default="name")
    try:
        out = database.db_select_country(filtertype=filtertype,value=value,comparison=comparison, pagesize=pagesize,pagenum=pagenum,sortby=sort,sortdir=sortdir)
        return jsonify(out)
    except Exception as e:
        return abort(400)
def streamingapi():
    filtertype,pagesize,pagenum,sortdir,comparison,value = getGeneralArgs()
    sort = request.args.get("sortby",default="name")
    try:
        out = database.db_select_streaming_service(filtertype=filtertype,value=value,comparison=comparison, pagesize=pagesize,pagenum=pagenum,sortby=sort,sortdir=sortdir)
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
    
    
    
