# this is for accounts that have already previously been checked

# first we gotta take in this bad boi
import json

# what our json obj would look like at a bare minimum
user = '{ "first_name":"John", "last_name":"Wick", "identification_number":"123456789-005", "verification": true}'

# for now, the CA data base is simply... a dictionary
users_db = ['{ "first_name":"John", "last_name":"Wick", "identification_number":"123456789-005", "expired": true }']

# true if currently verified
# false if not verified
def current_verification_status(user):
    userpy = json.loads(user)
    for i in users_db:
        elem = json.loads(i)
        if elem["identification_number"] == userpy["identification_number"]:
            if elem["expired"] == True:
                return False
            else:
                return True
    # otherwise, the ID number doesn't exist in our db
    return False

# print(user)
userpy = json.loads(user)
userpy["verification"] = current_verification_status(user)
user = json.dumps(userpy)
# print(user)

# it's 2am don't come for me for how garbage this code is 