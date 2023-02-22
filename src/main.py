from flask import Flask, render_template, request, jsonify
from model import class_detect
import os
app = Flask(__name__)


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


if __name__ == "__main__":
    app.run(debug=True)
