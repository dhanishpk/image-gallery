# save this as app.py
import os #this is required to get access to env 
from flask import Flask,request
import requests # this is installed by me dhanish using pipenv
from dotenv import load_dotenv

load_dotenv(dotenv_path="./.env.local")

## List Env vakue print(os.environ)

ENVVAR = os.environ;
print(ENVVAR.get("UNSPLASH_API_ACCESSKEY",""))

#BASE_URL="https://api.unsplash.com/photos/random"
#API_KEY="gB_I0ItKf2L9p7eyWISfM-Fb32b3Qu59nQ_bSc7jHpc"

BASE_URL=ENVVAR.get("BASE_URL","")
API_KEY=ENVVAR.get("UNSPLASH_API_ACCESSKEY","")
if not API_KEY:
    raise EnvironmentError("Please create and .env.local file and createn UNSPLASH_API_ACCESSKEY value")

app = Flask(__name__)

@app.route("/new_image")
def new_image():

    word=request.args.get('word')

    headers={"Authorization":"Client-ID "+ API_KEY,
            "User-Agent":"the-odin-project",
           }

    payload={"query":word}

    req = requests.get(url=BASE_URL, headers=headers,data=payload)
    print(req)
    if req.status_code == 200:
        result={"status":1,"result":req.json()}
    else:
         result={"status":0,"result":"Error"}
    
         

    return result





if __name__ =='__main__':
    app.run(host="0.0.0.0",port="5050")