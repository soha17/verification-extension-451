# Citing https://code.visualstudio.com/docs/python/tutorial-flask as big help for this 
# add in john patel
# jp
from flask import Flask
import json

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