from flask import request, Flask, jsonify, render_template, redirect, json, url_for, session
from flask_wtf import FlaskForm
from wtforms import TextField, SubmitField
from wtform.validatiors import NumberRange
import pandas as pd
import numpy as np 
from tensorflow.keras.models import load_model
import joblib


app = Flask(__name__)

symptoms_df = pd.read_csv('symptom_clean.csv')

@app.route('/')
def hello():
    return render_template('example.html')


@app.route('/get_symptoms')
def page_population():

    symptoms_json = symptoms_df.to_json(orient = 'records')
    print('Hello there')
    return symptoms_json

# define function for returning model prediction
def return_predict(model,scaler, symptoms_json):
    



@app.route('/example')
def contact():
    return render_template('example.html')


# @app.route('/disease_index')
# def about():
#     disease_detail = pd.read_csv('disease_detail.csv')
#     disease_detail = disease_detail.drop('Type', axis = 1)
#     disease_json = disease_detail.to_json()

#     return render_template('disease_index.html', structure = disease_json)
@app.route("/GetData")
def GetData():
    df = pd.read_csv("DemoData.csv")
    temp = df.to_dict('disease')
    columnNames = df.columns.values
    return render_template('disease_index.html', records=temp, colnames=columnNames)
@app.route('/model')
def model():
    return render_template('our_model.html')


@app.route('/diagnose/symptoms=<symptoms>', methods=['POST'])
def diagnosis(symptoms):

    sorted_df = symptoms_df.sort_values('colName', ascending = True)

    model_input = []
    for val in sorted_df['colName']:
        if val in symptoms:
            model_input.append("1")

        else:
            model_input.append("0")

    print(model_input)

    user_symptoms = pd.Series(symptoms)
    user_json = user_symptoms.to_json()


    return user_json


    

if __name__=="__main__":

    app.run(port = 5000)

