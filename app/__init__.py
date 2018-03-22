from flask import Flask, render_template
from flask import request,redirect
import urllib.request
import json
import pdb
import canitstreamtome_api as api
import sys
from flask_httpauth import HTTPBasicAuth
auth = HTTPBasicAuth()
app = Flask(__name__)
app.config['SERVER_NAME']='canitstreamto.me'
#app.config['SERVER_NAME']='localhost:5000'

api.startdbconnection()

### Authentication functions
@auth.get_password
def getpassword(username):
    if username == 'admin':
        return 'swe_2018_cistm'
    return None
@auth.error_handler
def unauthorized():
    return make_response(jsonify({'error':'Unauthorized access'}),403)

### Movie endpoint stuff
@app.route('/v1/movie',subdomain="api",methods=['GET'])
def callmovieapi():
    print("In api call",file=sys.stderr)
    return api.movieapi()
@app.route('/v1/movie/<int:movie_id>',subdomain="api",methods=['GET'])
def callsinglemovieapi(movie_id):
    return api.singlemovieapi(movie_id)
@app.route('/v1/movie/<int:movie_id>/popularity',subdomain="api",methods=['GET'])
def callmoviepopularityapi(movie_id):
    return api.moviepopularityapi(movie_id)
@app.route('/v1/movie/<int:movie_id>/streaming',subdomain="api",methods=['GET'])
def callmoviestreamapi(movie_id):
    return api.moviestreamapi(movie_id)

### Country endpoint stuff
@app.route('/v1/country',subdomain="api",methods=['GET'])
def callcountryapi():
    return api.countryapi()
@app.route('/v1/country/<int:country_id>',subdomain="api",methods=['GET'])
def callsinglecountryapi(country_id):
    return api.singlecountryapi(country_id)
#@app.route('/v1/country/<int:country_id>',subdomain="api",methods=['GET'])
#def callcountrypopmovieapi(country_id):
#    return api.singlecountryapi(country_id)


### Streaming service endpoint stuff
@app.route('/v1/streaming_service',subdomain="api",methods=['GET'])
def callstreamingapi():
    return api.streamingapi()
@app.route('/v1/streaming_service/<int:stream_id>',subdomain="api",methods=['GET'])
def callsinglestreamingapi(stream_id):
    return api.singlestreamingapi(stream_id)
@app.route('/v1/streaming_service/<int:stream_id>/popcountry',subdomain="api",methods=['GET'])
def callstreampopcountryapi(stream_id):
    return api.streampopcountryapi(stream_id)

@app.route('/.')
def nothing():
    return redirect("http://www.canitstreamto.me",code=302)



if __name__ == "__main__":
    #app.run(host='localhost', port=5000)#,ssl_context='adhoc')
    app.run(host='0.0.0.0', port=80)#,ssl_context=('/etc/letsencrypt/live/canitstreamto.me/fullchain.pem','/etc/letsencrypt/live/canitstreamto.me/privkey.pem'))
