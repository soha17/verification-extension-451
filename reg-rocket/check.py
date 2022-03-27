import pandas as pd


def check_valid(user):
    df = pd.read_csv("dummydb_3rdpartygovt.csv")
    dl_no_list = df["DL number"].tolist()
    first_name_list = df["First Name"].tolist()
    last_name_list = df["Last Name"].tolist()
    if user.dl_no in dl_no_list and user.fname in first_name_list and user.lname in last_name_list:
        return 1
    else:
        return 0


