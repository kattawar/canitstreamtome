from flask import Flask, render_template

app = Flask(__name__)



@app.route('/')
def index():
    return render_template('home.html')
@app.route('/about')
def about():
    return render_template('about.html')
@app.route('/movies')
def movies():
    return render_template('movies.html')
@app.route('/countries')
def countries():
    return render_template('countries.html')
