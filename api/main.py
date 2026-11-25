# save this as app.py
import os  # this is required to get access to env
from flask import Flask, request, jsonify
import requests  # this is installed by me dhanish using pipenv
from dotenv import load_dotenv
from flask_cors import CORS
from dbconnection import create_gallery_db

load_dotenv(dotenv_path="./.env.local")


db_collection = create_gallery_db()


## List Env vakue print(os.environ)

ENVVAR = os.environ

# BASE_URL="https://api.unsplash.com/photos/random"
# API_KEY="gB_I0ItKf2L9p7eyWISfM-Fb32b3Qu59nQ_bSc7jHpc"

BASE_URL = ENVVAR.get("BASE_URL", "")
API_KEY = ENVVAR.get("UNSPLASH_API_ACCESSKEY", "")
DEBUG = bool(ENVVAR.get("DEBUGMODE", True))


if not API_KEY:
    raise EnvironmentError(
        "Please create and .env.local file and createn UNSPLASH_API_ACCESSKEY value"
    )

app = Flask(__name__)


app.config["DEBUG"] = DEBUG
CORS(
    app,
    resources={r"/*": {"origins": "*"}},
    methods=["GET", "POST", "OPTIONS", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)


# this is the function to add new images
@app.route("/new_image")
def new_image():

    word = request.args.get("word")

    headers = {
        "Authorization": "Client-ID " + API_KEY,
        "User-Agent": "the-odin-project",
    }

    payload = {"query": word}

    req = requests.get(url=BASE_URL, headers=headers, data=payload)

    if req.status_code == 200:
        result = {"status": 1, "result": req.json()}
    else:
        result = {"status": 0, "result": "Error"}

    return result


@app.route("/images", methods=["GET", "POST"])
def images():

    if request.method == "GET":
        image = db_collection.find({})
        outputvalue = [img for img in image]
        result = {"status": 1, "result": outputvalue}
        return jsonify(result)

    if request.method == "POST":
        img = request.get_json()

        img["_id"] = img.get("id")
        result = db_collection.insert_one(img)
        insertedId = result.inserted_id
        return {"id": insertedId}


@app.route("/images/<image_id>", methods=["DELETE"])
def image(image_id):
    if request.method == "DELETE":
        result = db_collection.delete_one({"_id": image_id})

        if not result:
            return {"status": False, "msg": "unable to delete"}, 500
        if result and not result.deleted_count:
            return {"status": False, "msg": "Image not found"}, 404

        return {"status": True, "id": image_id}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5050")
