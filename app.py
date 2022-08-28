import sqlite3

from flask import Flask, render_template, request, session, url_for, redirect
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import failure


app=Flask(__name__)

app.config["TEMPLATES_AUTO_RELOAD"] = True



@app.route("/", methods=["GET"])
def index():
    return render_template("start.html")

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

