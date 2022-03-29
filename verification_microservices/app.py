# Citing https://code.visualstudio.com/docs/python/tutorial-flask as big help for this 
# add in john patel
# jp
from flask import Flask, url_for, render_template, request, redirect, session
import json
import pandas as pd

app = Flask(__name__)

@app.route("/")
def home():
    return "Flask is running"

@app.route("/initial_verification/<first_name>/<last_name>/<id_number>")
def initial_verification(first_name, last_name, id_number):
    # below line is fake CA database - later versions will have to use a real database
    userDB = ['{ "first_name":"John", "last_name":"Wick", "id_number":"123456789-005" }']
    # print(first_name + last_name + id_number)
    for i in userDB:
        curr = json.loads(i)
        # print(curr["id_number"])
        # print(id_number)
        if id_number == curr["id_number"]:
            # print("in if")
            if first_name == curr["first_name"] and last_name == curr["last_name"]:
                return "1"
            else:
                return "0"
    return "-1"

@app.route("/current-verification-status/<username>/")
def current_verification(username):
    # userdb in this case represents our own internal user DB - assuming account 
    userDB = ['{ "first_name":"John", "last_name":"Wick", "username":"jwick", "id_number":"123456789-005", "verified":"1", "valid":"1" }']
    for i in userDB:
        curr = json.loads(i)
        # print(curr["id_number"])
        # print(id_number)
        if username == curr["username"]:
            # print("in if")
            return curr["valid"]
    return "-1"

def check_valid(user):
    df = pd.read_csv("dummydb_3rdpartygovt.csv")
    dl_no_list = df["DL number"].tolist()
    first_name_list = df["First Name"].tolist()
    last_name_list = df["Last Name"].tolist()
    if user.dl_no in dl_no_list and user.fname in first_name_list and user.lname in last_name_list:
        return 1
    else:
        return 0

# from rakshit's python code
@app.route('/register/', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        try:
            username=request.form['username']
            dl_no=request.form['dl_no']
            fname=request.form['fname']
            lname=request.form['lname']
            contact_no=request.form['contact_no']

            print(username)

            status = check_valid(user) 

            if status == 1:
                return redirect(url_for('login'))
            else:
                return render_template('register.html', message="User not valid CA resident!") 
        except: # If TTL is needed, its logic would be implemented here
            return render_template('register.html', message="User Already Exists!")
        # else:
        #     return render_template('index.html', message="User Not Valid CA resident!")

    else:
        return render_template('register.html')
