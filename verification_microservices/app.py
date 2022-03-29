# Citing https://code.visualstudio.com/docs/python/tutorial-flask as big help for this 
# add in john patel
# jp
from crypt import methods
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

# from rakshit's python code
@app.route('/register/', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        try:
            username = request.form['username']
            fname = request.form['fname']
            lname = request.form['lname']
            dl_no = request.form['dl_no']

            status = initial_verification(fname, lname, dl_no)

            if status == "1":
                print('Status: ' + status + ' User, ' + username + 
                      ' with name, ' + fname + ' ' + lname + ' is a valid CA resident!')
                # return redirect(url_for('register'))
                return '<script>window.alert("Congratulations! You are registered with Uni-Verify")</script>'

            elif status == "0":
                print('Status: ' + status + ' User, ' + username + 
                      ' with name, ' + fname + ' ' + lname + ' is not a valid CA resident!')
                #return render_template('register.html', message="User is not a valid CA resident!")
                return '<script>window.alert("Sorry, but we were unable to register you with Uni-verify! Please try again with valid California Resident details")</script>' 

            elif status == "-1":
                print('Status: ' + status + ' User, ' + username + 
                      ' with name, ' + fname + ' ' + lname + ' is not a valid CA resident!')
                # return render_template('register.html', message="User not a valid CA resident!") 
                return '<script>window.alert("Sorry, but we were unable to register you with Uni-verify! Please try again with a valid California State ID")</script>' 

        except: # If TTL is needed, its logic would be implemented here
            print('User Already Exists!')
            #return render_template('register.html', message="User Already Exists!")

    else:
        print('Not a POST Request flow!')
        return render_template('register.html')

#for future enhancements 
@app.route('/extensionLogin/', methods=['GET', 'POST'])
def extensionLogin():
    userDB = ['{ "username":"jwick", "password":"theFirstOne25" }']

    if request.method == 'POST':
        try:
            username = request.form['username']
            password = request.form['password']

            for i in userDB:
                curr = json.loads(i)
                if password == curr["password"] :
                    status = "1"
                else:
                    status = "-1"

            if status == "1":
                print('Status: ' + status + ' User, ' + username + ' is a valid verified CA resident!')
            
            elif status == "-1":
                print('Status: ' + status + ' User, ' + username + ' is not a verified CA resident!')

            else:
                print('Status: ' + status + ' User, ' + username + ' is not registered with Uni-Verify!')

        except: # If TTL is needed, its logic would be implemented here
            print('ERROR! CHECK THE MESSAGE')
    else:
        print('Not a POST Request flow!')
