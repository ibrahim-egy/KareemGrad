from flask import Flask, render_template, request, redirect, url_for
from model import class_detect
import os

app = Flask(__name__)
app.secret_key = "thisisasecret"


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/detect', methods=["POST"])
def detect():
    if request.method == "POST":
        image = request.files.get('image')
        image.save(f"static/images/{image.filename}")
        data = class_detect(f"static/images/{image.filename}")
        os.remove(f"static/images/{image.filename}")
        return data


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/register')
def register():
    return render_template('register.html')


if __name__ == "__main__":
    app.run(debug=True)
