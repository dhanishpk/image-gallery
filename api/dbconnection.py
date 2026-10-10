import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv(dotenv_path="./.env.local")

MONGO_URL = os.environ.get(
    "MONGO_URL", "mongo"
)  # here the mongo is the name of the container
# so we can access the mongo db using the container name
MONGO_USER_NAME = os.environ.get("MONGO_USERNAME", "root")
MONGO_PASSWORD = os.environ.get("MONGO_PASSWORD", "")
MONGO_PORT = os.environ.get("MONGOPORT", 27017)  # 27017 is a default port of mongo


mongo_client = MongoClient(
    host=MONGO_URL, username=MONGO_USER_NAME, password=MONGO_PASSWORD, port=MONGO_PORT
)


def inster_test_db():
    db = mongo_client.testdbmir
    test_collection = db.test_collection
    res = test_collection.insert_one({"name": "testdata", "age": 20})
