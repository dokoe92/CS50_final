import sqlite3

from flask import Flask, render_template, request, session, url_for, redirect
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import failure, login_required


app=Flask(__name__)

app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["SECRET_KEY"] = "hallosecretkey"


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@app.route("/welcome")
@login_required
def welcome():
    return render_template("index.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    con = sqlite3.connect("timoro.db")
    c = con.cursor()
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        confirmation = request.form.get("password_confirm")
        password = generate_password_hash(password)

        if username == "":
            return failure("Please insert username")
        elif password == "":
            return failure("Please insert password")
        elif confirmation == "":
            return failure("Please insert password confirmation")

        c.execute("SELECT username FROM users WHERE username = ?", (username,))
        user_found = c.fetchone()
        if not user_found:
            c.execute("INSERT INTO users (username, hash) VALUES(?,?)", (username, password))
            con.commit()
        else:
            return failure("Username already exists!")
        return redirect("/")
        
    else:
        return render_template("register.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":

        con = sqlite3.connect("timoro.db")
        con.row_factory = sqlite3.Row # Convert tuples from SQL query to a list of dict
        c = con.cursor()

        if not request.form.get("username"):
            return failure("Please insert username!")

        elif not request.form.get("password"):
            return failure("Please insert password!")
        
        # Check if user is in database
        username = request.form.get("username")
        password = request.form.get("password")
        error = None
        user = c.execute("SELECT * FROM users WHERE username = ?", (username,))
        user = c.fetchone()
        
        if user is None:
            error = "Incorrect username."
            return failure("Incorrect username or password")
        elif not check_password_hash(user["hash"], password):
            error = "Incorrect password."
            return failure("Incorrect password or password")

        if error is None:
            session.clear()
            session["user_id"] = user["id"]
            return redirect("/")
        
    else:
        return render_template("login.html")
        



    
    







