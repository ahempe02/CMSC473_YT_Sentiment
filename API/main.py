from flask import Flask, request
from flask_cors import CORS
from transformers import pipeline

sentiment_pipeline = pipeline("sentiment-analysis", model="joshu710/CMSC473")
translation_pipeline = pipeline("translation", model="lseely916/CMSC_473_mt5", max_length=400)
'''
translation_pipeline_es = pipeline("translation_es_to_en", model="lseely916/CMSC_473_mt5", max_length=400)
translation_pipeline_zh = pipeline("translation_zh_to_en", model="lseely916/CMSC_473_mt5", max_length=400)
translation_pipeline_ja = pipeline("translation_ja_to_en", model="lseely916/CMSC_473_mt5", max_length=400)
'''

app = Flask(__name__)
CORS(app)


@app.route("/")
def main_page():
    return "<p>test</p>"


'''
@app.route("/double")  # currently just a test API that doubles a given int 'val' (i.e. http://127.0.0.1:5000/double?val=4 returns {"answer": 8})
def doubler():
    request_val = request.args.get("val")
    if request_val:
        return {
            "answer": int(request_val)*2,
        }
    else:
        return "400: \'val\' query not found", 400
'''


# ok the real one
@app.route("/sentiment")
def sentiment_api():
    request_val = request.args.get("text")
    if request_val:
        return sentiment_pipeline(request_val)
        # 0 = pos, 1 = neu, 2 = neg
    else:
        return "400: \'text\' query not found", 400


@app.route("/translation_es")
def translation_api_es():
    request_val = request.args.get("text")
    if request_val:
        return translation_pipeline(f"translate Spanish to English: {request_val}")
    else:
        return "400: \'text\' query not found", 400


@app.route("/translation_zh")
def translation_api_zh():
    request_val = request.args.get("text")
    if request_val:
        return translation_pipeline(f"translate Chinese to English: {request_val}")
    else:
        return "400: \'text\' query not found", 400


@app.route("/translation_ja")
def translation_api_ja():
    request_val = request.args.get("text")
    if request_val:
        return translation_pipeline(f"translate Japanese to English: {request_val}")
    else:
        return "400: \'text\' query not found", 400


@app.route("/translation")
def translation_api():
    request_val = request.args.get("text")
    if request_val:
        return translation_pipeline(f"translate to English: {request_val}")
    else:
        return "400: \'text\' query not found", 400
