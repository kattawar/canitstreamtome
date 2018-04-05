from flask import Flask, render_template
from flask import request,redirect
import urllib.request
import json
import pdb
import canitstreamtome_api as api
import canitstreamtome_apiv2 as v2
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
@app.route('/v1/country/<int:country_id>/streaming',subdomain="api",methods=['GET'])
def callcountrystreamapi(country_id):
    return api.countrystreamapi(country_id)
@app.route('/v1/country/<int:country_id>/movie',subdomain="api",methods=['GET'])
def callcountrymovieapi(country_id):
    return api.countrymovieapi(country_id)


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
@app.route('/v1/streaming_service/<int:stream_id>/movie',subdomain="api",methods=['GET'])
def callstreammovieapi(stream_id):
    return api.streammovieapi(stream_id)
@app.route('/.')
def nothing():
    return redirect("http://www.canitstreamto.me",code=302)

### Movie endpoint stuff
@app.route('/v2/movie',subdomain="api",methods=['GET'])
def callmovieapiv2():
    print("In api call",file=sys.stderr)
    return v2.movieapi()
@app.route('/v2/movie/<int:movie_id>',subdomain="api",methods=['GET'])
def callsinglemovieapiv2(movie_id):
    return v2.singlemovieapi(movie_id)
@app.route('/v2/movie/<int:movie_id>/popularity',subdomain="api",methods=['GET'])
def callmoviepopularityapiv2(movie_id):
    return v2.moviepopularityapi(movie_id)
@app.route('/v2/movie/<int:movie_id>/streaming',subdomain="api",methods=['GET'])
def callmoviestreamapiv2(movie_id):
    return v2.moviestreamapi(movie_id)
@app.route('/v2/movie/search',subdomain="api",methods=['GET'])
def callsearchmovie():
    return v2.searchmovie()


### Country endpoint stuff
@app.route('/v2/country',subdomain="api",methods=['GET'])
def callcountryapiv2():
    return v2.countryapi()
@app.route('/v2/country/<int:country_id>',subdomain="api",methods=['GET'])
def callsinglecountryapiv2(country_id):
    return v2.singlecountryapi(country_id)
@app.route('/v2/country/<int:country_id>/streaming',subdomain="api",methods=['GET'])
def callcountrystreamapiv2(country_id):
    return v2.countrystreamapi(country_id)
@app.route('/v2/country/<int:country_id>/movie',subdomain="api",methods=['GET'])
def callcountrymovieapiv2(country_id):
    return v2.countrymovieapi(country_id)
@app.route('/v2/country/search',subdomain="api",methods=['GET'])
def callsearchcountry():
    return v2.searchcountry()

### Streaming service endpoint stuff
@app.route('/v2/streaming_service',subdomain="api",methods=['GET'])
def callstreamingapiv2():
    return v2.streamingapi()
@app.route('/v2/streaming_service/<int:stream_id>',subdomain="api",methods=['GET'])
def callsinglestreamingapiv2(stream_id):
    return v2.singlestreamingapi(stream_id)
@app.route('/v2/streaming_service/<int:stream_id>/popcountry',subdomain="api",methods=['GET'])
def callstreampopcountryapiv2(stream_id):
    return v2.streampopcountryapi(stream_id)
@app.route('/v2/streaming_service/<int:stream_id>/movie',subdomain="api",methods=['GET'])
def callstreammovieapiv2(stream_id):
    return v2.streammovieapi(stream_id)
@app.route('/v2/streaming_service/search',subdomain="api",methods=['GET'])
def callsearchstreaming():
    return v2.searchstreaming()

if __name__ == "__main__":
    #app.run(host='localhost', port=5000)#,ssl_context='adhoc')
    app.run(host='0.0.0.0', port=80)#,ssl_context=('/etc/letsencrypt/live/canitstreamto.me/fullchain.pem','/etc/letsencrypt/live/canitstreamto.me/privkey.pem'))
