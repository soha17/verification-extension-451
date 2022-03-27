""" Since we don't have a database set up, we're gonna pretend like everything we need is going to come to us in json and we'll export what we need in json """
import json
from tabnanny import check

# ty w3 schools u a homie 
# Source: https://www.w3schools.com/python/python_json.asp


# what our json obj would look like
user = '{ "first_name":"John", "last_name":"Wick", "identification_number":"123456789-005" }'

# for now, the CA data base is simply... a LIST of dictionaries
users_db = ['{ "first_name":"John", "last_name":"Wick", "identification_number":"123456789-005" }']

# before anyone @s me for this garbage, i'm writing this at 1:30AM
# also, def could be improved. doing a look up by only the identification number and then checking the other parts would be much better
# true if currently verified
# false if not verified
def checking_cali_database(user_example):
    # parse the user passed in and pass it into the database
    user_py = json.loads(user_example)
    # pretend the database exists - for now we're just gonna search a hardcoded list
    for i in users_db:
        elem = json.loads(i)
        if elem["identification_number"] == user_py["identification_number"]:
            if elem["first_name"] == user_py["first_name"] and elem["last_name"] == user_py["last_name"]:
                return True
    # no record found for this ID in the california database... imposter! 
    return False

userpy = json.loads(user)
if checking_cali_database(user):
    userpy["verification"] = True
else:
    userpy["verification"] = False

user = json.dumps(userpy)
print(user)