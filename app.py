from flask import Flask, render_template, request, session, url_for
import sqlite3

app=Flask(__name__)

app.config["TEMPLATES_AUTO_RELOAD"] = True

# Add 



@app.route("/", methods=["GET"])
def index():
    return render_template("start.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        confirmation = request.form.get("password_confirm")

    else:
        return render_template("register.html")

