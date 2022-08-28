from flask import redirect, render_template, request, session
from functools import wraps

def failure(message):
    return render_template("failure.html", message=message)

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/welcome")
        return f(*args, **kwargs)
    return decorated_function
