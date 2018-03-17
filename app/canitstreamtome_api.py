import json as json
from flask import request
from flask import jsonify
from flask import abort
import sys

#from .
import database

def startdbconnection():
    database.startup_database_connection()




def singlemovieapi(title):
    out = database.db_select_movie(filtertype="title",value=title)
    if len(out) == 0:
        abort(404)
    return jsonify(out)  

def singlecountryapi(name):
    out = database.db_select_country(filtertype="name",value=name)
    if len(out) == 0:
        abort(404)
    return jsonify(out)

def singlestreamingapi(name):
    out = database.db_select_streaming_service(filtertype="name",value=name)
    if len(out) == 0:
        abort(404)
    return jsonify(out)

def getGeneralArgs():
    return request.args.get("filter",default=None),int(request.args.get("pagesize",default=25)),int(request.args.get(
        "pagenum",default=0)),request.args.get("sortdir",default="desc"),request.args.get("comparison","="),request.args.get("value",default=None)
def movieapi():
    filtertype,pagesize,pagenum,sortdir,comparison,value = getGeneralArgs()
    sort = request.args.get("sortby",default="title")
    out = database.db_select_movie(filtertype=filtertype,value=value,comparison=comparison, pagesize=pagesize,pagenum=pagenum,sortby=sort,sortdir=sortdir)
    return jsonify(out)
def countryapi():
    filtertype,pagesize,pagenum,sortdir,comparison,value = getGeneralArgs()
    sort = request.args.get("sortby",default="name")
    out = database.db_select_country(filtertype=filtertype,value=value,comparison=comparison, pagesize=pagesize,pagenum=pagenum,sortby=sort,sortdir=sortdir)
    return jsonify(out)
def streamingapi():
    filtertype,pagesize,pagenum,sortdir,comparison,value = getGeneralArgs()
    sort = request.args.get("sortby",default="name")
    out = database.db_select_streaming_service(filtertype=filtertype,value=value,comparison=comparison, pagesize=pagesize,pagenum=pagenum,sortby=sort,sortdir=sortdir)
    return jsonify(out)
    
