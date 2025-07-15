from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)

summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")

from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)

summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")

@app.route("/summarise", methods=["POST"])
def summarise():
    data = request.get_json()
    text = data.get("text", "")

    if not text.strip():
        return jsonify({"summary": "⚠️ Empty input!"}), 400

    try:
        summary_result = summarizer(text, max_length=150, min_length=30, do_sample=False)
        summary = summary_result[0]['summary_text']
        return jsonify({"summary": summary})
    except Exception as e:
        return jsonify({"summary": f"❌ Error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)

