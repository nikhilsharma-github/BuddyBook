# importing packages 
from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

# Default Code 
# It initializes our app 
app=Flask(__name__)
# providing app to CORS Method 
CORS(app)

# Configuring our app with sqlalchemy 
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///buddybook.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# creating our db 
db=SQLAlchemy(app)

frontend_folder = os.path.join(os.getcwd(),"..","frontend")
dist_folder = os.path.join(frontend_folder,"dist")


@app.route("/",defaults={"filename":""})
@app.route("/<path:filename>",)
def index(filename):
    if not filename:
        filename = "index.html"
    return send_from_directory(dist_folder,filename)

import routes
with app.app_context():
    db.create_all()

# only run the debug method when we run the app.py file 
if __name__ == "__main__":
    app.run(debug=True)