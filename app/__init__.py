from flask import Flask, render_template
from flask import request
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
@app.route('/v1/movie/<string:title>',subdomain="api",methods=['GET'])
def callsinglemovieapi(title):
    return api.singlemovieapi(title)

### Country endpoint stuff
@app.route('/v1/country',subdomain="api",methods=['GET'])
def callcountryapi():
    return api.countryapi()
@app.route('/v1/country/<string:name>',subdomain="api",methods=['GET'])
def callsinglecountryapi(name):
    return api.singlecountryapi(name)

### Streaming service endpoint stuff
@app.route('/v1/streaming_service',subdomain="api",methods=['GET'])
def callstreamingapi():
    return api.streamingapi()
@app.route('/v1/streaming_service/<string:name>',subdomain="api",methods=['GET'])
def callsinglestreamingapi(name):
    return api.singlestreamingapi(name)




@app.route('/')
def index():
    return render_template('home.html')
@app.route('/about')
def about():
    req = urllib.request.Request("https://api.github.com/repos/kattawar/canitstreamtome/stats/contributors")
    r = urllib.request.urlopen(req).read()
    cont = json.loads(r.decode('utf-8'))
    jordan_commits = cont[0]['total']
    kattawar_commits = cont[1]['total'] + cont[2]['total']
    erin_commits = cont[3]['total']
    nick_commits = cont[4]['total']
    kevin_commits = cont[5]['total']
    req = urllib.request.Request("https://api.github.com/repos/kattawar/canitstreamtome/issues?creator=erinjensby&state=all")
    r = urllib.request.urlopen(req).read()
    cont = json.loads(r.decode('utf-8'))
    erin_issues = len(cont)
    req = urllib.request.Request("https://api.github.com/repos/kattawar/canitstreamtome/issues?creator=kevinsalcedo&state=all")
    r = urllib.request.urlopen(req).read()
    cont = json.loads(r.decode('utf-8'))
    kevin_issues = len(cont)
    req = urllib.request.Request("https://api.github.com/repos/kattawar/canitstreamtome/issues?creator=kattawar&state=all")
    r = urllib.request.urlopen(req).read()
    cont = json.loads(r.decode('utf-8'))
    kattawar_issues = len(cont)
    req = urllib.request.Request("https://api.github.com/repos/kattawar/canitstreamtome/issues?creator=QuantumSoundings&state=all")
    r = urllib.request.urlopen(req).read()
    cont = json.loads(r.decode('utf-8'))
    jordan_issues = len(cont)
    req = urllib.request.Request("https://api.github.com/repos/kattawar/canitstreamtome/issues?creator=nico1utaustin&state=all")
    r = urllib.request.urlopen(req).read()
    cont = json.loads(r.decode('utf-8'))
    nick_issues = len(cont)
    total_commits = erin_commits + kevin_commits + nick_commits + kattawar_commits + jordan_commits
    total_issues = erin_issues + kevin_issues + nick_issues + kattawar_issues + jordan_issues
    return render_template('about.html', erin_commits = erin_commits, erin_no_issues = erin_issues, jordan_commits = jordan_commits, jordan_no_issues = jordan_issues, kattawar_commits = kattawar_commits, kattawar_no_issues = kattawar_issues, nick_commits = nick_commits, nick_no_issues = nick_issues, kevin_commits = kevin_commits, kevin_no_issues = kevin_issues, total_commits = total_commits, total_issues = total_issues)
@app.route('/movies')
def movies():
    return render_template('movies.html')
@app.route('/countries')
def countries():
    return render_template('countries.html')
@app.route('/services')
def services():
    return render_template('services.html')
@app.route('/movie1')
def movie1():
    return render_template('movie1.html')
@app.route('/movie2')
def movie2():
    return render_template('movie2.html')
@app.route('/movie3')
def movie3():
    return render_template('movie3.html')
@app.route('/movie4')
def movie4():
    return render_template('movie4.html')
@app.route('/service1')
def service1():
    return render_template('service1.html')
@app.route('/service2')
def service2():
    return render_template('service2.html')
@app.route('/service3')
def service3():
    return render_template('service3.html')
@app.route('/service4')
def service4():
    return render_template('service4.html')
@app.route('/country1')
def country1():
    return render_template('country1.html')
@app.route('/country2')
def country2():
    return render_template('country2.html')
@app.route('/country3')
def country3():
    return render_template('country3.html')
@app.route('/country4')
def country4():
    return render_template('country4.html')

if __name__ == "__main__":
    #app.run(host='localhost', port=5000)#,ssl_context='adhoc')
    app.run(host='0.0.0.0', port=80)#,ssl_context=('/etc/letsencrypt/live/canitstreamto.me/fullchain.pem','/etc/letsencrypt/live/canitstreamto.me/privkey.pem'))
