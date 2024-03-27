import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from ultralytics import YOLO
import base64
from PIL import Image
from io import BytesIO


# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})


# sanity check route
@app.route('/', methods=['POST'])
def ping_pong():
    try:
        frame = request.json['frame']
        customModel = YOLO("CustomModel_v1.pt")
        base64_frame = str(frame).split(',')[1]
        binary_data = base64.b64decode(base64_frame)
        image = Image.open(BytesIO(binary_data))
        image.save('decoded_image.jpeg')
        output = customModel('decoded_image.jpeg')
        arr =[]
        for detection in output[0]: # Loop over each detection in the first image of the batch

            class_index = detection.boxes # Get the class index of the detection
            class_name = detection.names  # Get the name of the detection
            
            tensor_idx = class_index.cls
            conf_score = class_index.conf
            arr.append(class_name[ tensor_idx.item()])
        result={
            'value':arr
        }
        return jsonify(result)
    except Exception as e:
        return jsonify({'error':str(e)})
    # customModel = YOLO("CustomModel.pt")
    # class_indxs = []
    # classes_detected= []
    # webcam = cv2.VideoCapture(0)

    # # Loop through the video frames
    # while webcam.isOpened():
    #     # Read a frame from the video
    #     success, frame = webcam.read()

    #     if success:
    #         # Run YOLOv8 inference on the frame
    #         results3 = customModel(frame)
    #         for detection in results3[0]: # Loop over each detection in the first image of the batch
    #             class_index = detection.boxes # Get the class index of the detection
    #             class_name = detection.names  # Get the name of the detection
                
    #             conf_score = class_index.conf
    #             if conf_score.item() > 0.6:
    #                 tensor_idx = class_index.cls
    #                 class_indxs.append(tensor_idx)
    #                 classes_detected.append(class_name[ tensor_idx.item()])

    #         # Visualize the results on the frame
    #         annotated_frame = results3[0].plot()

    #         # Display the annotated frame
    #         cv2.imshow("YOLOv8 Custom Inference", annotated_frame)

    #         # Break the loop if 'q' is pressed
    #         if cv2.waitKey(1) & 0xFF == ord("q"):
    #             break
    #     else:
    #         # Break the loop if the end of the video is reached
    #         break

    # # Release the video capture object and close the display window
    # webcam.release()
    # cv2.destroyAllWindows()
    # return jsonify(classes_detected)

if __name__ == '__main__':
    app.run(debug=True)