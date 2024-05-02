from flask import Flask, request, jsonify, render_template

from flask_cors import CORS, cross_origin
from transformers import pipeline
from PIL import Image

app = Flask(__name__)

cors = CORS(app)
# Initialize the pipeline model
parkinson = pipeline("image-classification", model='gianlab/swin-tiny-patch4-window7-224-finetuned-parkinson-classification')
mri = pipeline("image-classification", model="dewifaj/alzheimer_mri_classification")


@app.route('/')
def index():
    print('hello world')
    return 'hello world'

@app.route('/parkinson', methods=['POST'])
def process_image_parkinson():
    # Check if an image file is present in the request
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    # Get the image file from the request
    # image = request.files['image']
    image = Image.open(request.files['image'].stream)
    print('image recieved')

    result = parkinson(image)
    print(result)
    return result
    
'''
[
    {
        "label": "parkinson",
        "score": 0.8618625402450562
    },
    {
        "label": "healthy",
        "score": 0.13813747465610504
    }
]
'''
    
@app.route('/mri', methods=['POST'])
def process_image_mri():
    # Check if an image file is present in the request
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    # Get the image file from the request
    # image = request.files['image']
    image = Image.open(request.files['image'].stream)
    print('image recieved')

    result = mri(image)
    print(result)
    
    return result

if __name__ == '__main__':
    app.run(debug=True)
