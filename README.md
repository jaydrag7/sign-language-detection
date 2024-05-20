
# IslandSigns <img src="https://firebasestorage.googleapis.com/v0/b/islandsigns-99848.appspot.com/o/logo%2FIslandSigns-logo.png?alt=media&token=1d839540-92e4-4547-9800-3bcc81f33415" alt="Island Signs Logo" width="500" height="500">
The Islands application is built upon many different technologies but the key ones are:
- YOLOv8 computer vision models: trained on our custom dataset to capture JSL. https://github.com/ultralytics/ultralytics
- Flask: back-end we utilize to host our trained YOLO models to make inferences.
- Firebase Realtime Database: facilitates login authentication, sentiment analysis and real-time text messaging capabilities. https://firebase.google.com/docs

**Annotation Tool**
- *Label Studio* <br/>
We use Label Studio to annotate our image data before training it on a pretrained YOLO model.
Check out the link to see how to get your workspace setup. It is quite easy-to-follow and extensive:
https://labelstud.io/guide/install

**GPU**
- *Kaggle*<br/>
After labelling our data we train it on Kaggle. Kaggle provides GPUs which is needed to speed up the training process on the image data. Here's a link: https://www.kaggle.com/#

**Front-end**
- *Vuejs*<br/>
We utilize Vuejs for our front-end. To get started, ensure you have Nodejs installed on your machine. https://nodejs.org/en <br/>
Once you have Nodejs installed and on your $PATH, create a NUXT workspace in a folder of your choice. https://nuxt.com/docs/getting-started/installation

**Back-end**
- *Flask*<br/>
Here's a link to setup your Flask environment whether you're on macOS/Linux or Windows. https://flask.palletsprojects.com/en/3.0.x/installation/
