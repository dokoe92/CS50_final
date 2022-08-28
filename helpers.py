from flask import redirect, render_template, request, session

def failure(message):
    return render_template("failure.html", message=message)