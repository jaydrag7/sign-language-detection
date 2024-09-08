import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from ultralytics import YOLO
import base64
from PIL import Image
from io import BytesIO
from openai import OpenAI
import tempfile

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

phrases_model = YOLO("phrases.pt")
greetings_model = YOLO("greetings2.pt")
alphabet_model = YOLO("alphabet.pt")
numbers_model = YOLO("numbers.pt")
client = OpenAI(api_key='')

@app.route('/audio',methods=['POST'])
def transcribe_audio():
    if request.method == 'POST':
        try:
            audio_blob = request.files['audio'].read()
            audio_file_path = 'audio.wav'
            with open(audio_file_path, 'wb') as audio_file:
                audio_file.write(audio_blob)
            audio_file = open("audio.wav","rb")
            transcript = client.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file
            )
            return jsonify(transcript.text)
        except Exception as e:
            return jsonify({'error':str(e)})

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        try:
            frame = request.json['frame']
            base64_frame = str(frame).split(',')[1]
            binary_data = base64.b64decode(base64_frame)
            image = Image.open(BytesIO(binary_data))
            image.save('decoded_image.png')
            arr =[]
            conf_scores = []
            alphabet_output = alphabet_model('decoded_image.png')
            for detection in alphabet_output[0]: 
                class_index = detection.boxes 
                class_name = detection.names  
            
                tensor_idx = class_index.cls
                conf_score = class_index.conf
                arr.append(class_name[ tensor_idx.item()])

            if len(arr) != 0:
                result={
                    'predictions':arr
                }
                return jsonify(result)
            # else:
            #     greetings_output = greetings_model('decoded_image.png')
            #     for detection in greetings_output[0]: 
            #         class_index = detection.boxes 
            #         class_name = detection.names  
                
            #         tensor_idx = class_index.cls
            #         conf_score = class_index.conf
            #         arr.append(class_name[ tensor_idx.item()])
            #     if len(arr) != 0:
            #         result={
            #             'predictions':arr
            #         }
            #         return jsonify(result)
            else:
                phrases_output = phrases_model('decoded_image.png')
                for detection in phrases_output[0]: # Loop over each detection in the first image of the batch

                    class_index = detection.boxes # Get the class index of the detection
                    class_name = detection.names  # Get the name of the detection
                    
                    tensor_idx = class_index.cls
                    conf_score = class_index.conf
                    arr.append(class_name[ tensor_idx.item()])
                    # conf_scores.append(type(conf_score))
                if len(arr) != 0:
                    result={
                        'predictions':arr
                    }
                    return jsonify(result)
                else:
                        # numbers_output = numbers_model('decoded_image.png')
                        # for detection in numbers_output[0]: 
                        #     class_index = detection.boxes 
                        #     class_name = detection.names  
                        
                        #     tensor_idx = class_index.cls
                        #     conf_score = class_index.conf
                        #     arr.append(class_name[ tensor_idx.item()])

                    result={
                        'predictions':arr
                    }
                    return jsonify(result)
        except Exception as e:
            return jsonify({'error':str(e)})
    else:
        return jsonify({'error': 'Method not allowed'})
if __name__ == '__main__':
    app.run(debug=True)