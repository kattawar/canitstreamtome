import json as json
from flask import request
from flask import jsonify
from flask import abort
import sys

#from .
import database

def startdbconnection():
    database.startup_database_connection()

def singlemovieapi():
    title = request.args.get("title",default=None)
    getall = request.args.get("all",default=None)
    if title == None:
        if getall == "true":
            out = database.db_select_movie()
            return jsonify(out)
        return abort(400)
    else:
        #print(title,file=sys.stderr)
        #abort(400)
        out = database.db_select_movie("title",title)
        print(out,file=sys.stderr)
    return jsonify(out)  

def singlecountryapi():
    name = request.args.get("name",default=None)
    getall = request.args.get("all",default=None)
    if name == None:
        if getall == "true":
            out = database.db_select_country()
            return jsonify(out)
        return abort(400)
    else:
        out = database.db_select_country("name",name)
    return jsonify(out)

def singleserviceapi():
    name = request.args.get("name",default=None)
    getall = request.args.get("all",default=None)
    if name == None:
        if getall == "true":
            out = database.db_select_streaming_service()
            return jsonify(out)
        return abort(400)
    else:
        out = database.db_select_streaming_service("name",name)
    return jsonify(out)
        
        
