from flask import Flask, url_for, render_template, request, redirect, session
from flask_sqlalchemy import SQLAlchemy
from check import check_valid

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    dl_no = db.Column(db.String(8))
    contact_no = db.Column(db.String(10))
    fname = db.Column(db.String(100))
    lname = db.Column(db.String(100))

    def __init__(self, username, dl_no, contact_no, fname, lname):
        self.username = username
        self.dl_no = dl_no
        self.contact_no = contact_no
        self.fname = fname
        self.lname = lname


@app.route('/', methods=['GET'])
def index():
    if session.get('logged_in'):
        return render_template('home.html')
    else:
        return render_template('index.html', message="Hello!")


@app.route('/register/', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        try:
            user = User(username=request.form['username'], \
                        dl_no=request.form['dl_no'], \
                        fname=request.form['fname'], \
                        lname=request.form['lname'], \
                        contact_no=request.form['contact_no'])
            # print(user.username)
            db.session.add(user)
            db.session.commit()
            # return redirect(url_for('login'))

            status = check_valid(user) # for now, let's assume the status = 1 and the user is a valid CA resident
            # nah, i just created a new function that checks with a dummy db, lezz see if it workssss

            # db.session.delete(user.dl_no)
            # db.session.commit()

            if status == 1:
                return redirect(url_for('login'))
            else:
                return render_template('index.html', message="User not valid CA resident!") 
        except: # If TTL is needed, its logic would be implemented here
            return render_template('index.html', message="User Already Exists!")
        # else:
        #     return render_template('index.html', message="User Not Valid CA resident!")

    else:
        return render_template('register.html')



# @app.route('/check/',methods=['GET', 'POST'])
# def check():
#     if request.method == 'GET':
#         # do the check here --- assume 3rd party check is successful and user is a valid CA resident
#         return redirect(url_for('login'))
#     else:
#         return render_template('index.html', message="User not valid CA resident!")



@app.route('/login/', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        u = request.form['username']
        # f = request.form['fname']
        # l = request.form['lname']
        data = User.query.filter_by(username=u).first()
        # , fname=f, lname=l).first()
        if data is not None:
            session['logged_in'] = True
            return redirect(url_for('index'))
        return render_template('index.html', message="Incorrect Details")


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session['logged_in'] = False
    return redirect(url_for('index'))

if(__name__ == '__main__'):
    app.secret_key = "ThisIsNotASecret:p"
    db.create_all()
    app.run(host='0.0.0.0', port=5050)
