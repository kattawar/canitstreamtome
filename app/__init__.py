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


