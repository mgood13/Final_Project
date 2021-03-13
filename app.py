from flask import request, Flask, jsonify, render_template, redirect, json, url_for, session
import pandas as pd
import numpy as np 
from tensorflow.keras.models import load_model



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
# def return_predict(model,scaler, symptoms_json):
    

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
    df = pd.read_csv("static/js/disease_detail.csv")
    temp = df.to_dict('disease')
    columnNames = df.columns
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
            model_input.append(1)

        else:
            if val != 'prognosis':
                model_input.append(0)

    print(len(model_input))

    user_symptoms = pd.Series(symptoms)
    user_json = user_symptoms.to_json()

    model = load_model('model')

    model_array = np.array(model_input).reshape(-1,132)

    result = model.predict(model_array)[0]
    print(result)

    decoder_df = pd.read_csv('encoder.csv')

    found = []
    locations = []
    for index, row in decoder_df.iterrows():
        if row['Prognosis'] not in found:
            locations.append(row['Unnamed: 0'])
            found.append(row['Prognosis'])

    slim_df = decoder_df.iloc[locations]
    decoder_df = slim_df

    strings = []
    count = 0
    for i in decoder_df['y']:
        strings.append("")
        undesirables = ['[', ']', '\n']
        for x in i:
            if x not in undesirables:
                strings[count] = strings[count] + x
        count += 1
    strings
    y = []

    for x in strings:
        temp = x.split('.')
        final = []
        for i in temp:
            if i != '':
                final.append(int(i.strip()))
        y.append(final)

    final_df = decoder_df['Prognosis'].to_frame()
    final_df['y'] = y

    indices = []
    for x in y:
        indices.append(x.index(1))

    final_df['Index'] = indices

    probability = []
    for x in final_df['Index']:
        probability.append(result[x])
    final_df['Probability'] = probability

    top_diagnosis = final_df.sort_values('Probability', ascending = False).head(3)

    user_json = top_diagnosis.to_json(orient = 'records')

    return user_json


    

if __name__=="__main__":

    app.run(port = 5000)

