from flask import request, Flask, jsonify, render_template, redirect, json
import pandas as pd




app = Flask(__name__)


@app.route('/')
def hello():


    return render_template('example.html')


@app.route('/get_symptoms')
def page_population():
    symptoms_df = pd.read_csv('symptom_clean.csv')
    symptoms_json = symptoms_df.to_json(orient = 'records')
    print('Hello there')
    return symptoms_json




@app.route('/visualization')
def contact():
    return render_template('visualize.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/diagnose/symptoms=<symptoms>', methods=['POST'])
def diagnosis(symptoms):


    return data


    

if __name__=="__main__":

    app.run(port = 5002)

