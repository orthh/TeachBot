from flask import Flask, render_template, Response, request, jsonify
import cv2
import numpy as np
from flask_cors import CORS
import mediapipe as mp

app = Flask(__name__)
CORS(app)

mp_hands = mp.solutions.hands
hands = mp_hands.Hands()
mp_drawing = mp.solutions.drawing_utils


def gen_frames():
    global folded_fingers
    global unfolded_fingers

    folded_fingers = 0
    unfolded_fingers = 0

    # 웹캠
    camera = cv2.VideoCapture(0, cv2.CAP_DSHOW)
    #camera = cv2.VideoCapture('my_video.mp4')
    try:
        while True:
            success, frame = camera.read()
            if not success:
                # break
                # 비디오 캡처 객체를 다시 초기화합니다.
                camera = cv2.VideoCapture('my_video.mp4')
                continue

            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = hands.process(frame_rgb)

            if results.multi_hand_landmarks:
                for landmarks in results.multi_hand_landmarks:
                    pass

            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

            if results.multi_hand_landmarks:
                landmarks = results.multi_hand_landmarks[0]
                finger_tips = [8, 12, 16, 20]
                mcp_joints = [5, 9, 13, 17]

                unfolded_fingers = sum([1 for tip, mcp in zip(finger_tips, mcp_joints) if
                                      landmarks.landmark[tip].y < landmarks.landmark[mcp].y])
                folded_fingers = 4 - unfolded_fingers

    finally:
        camera.release()

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

# @app.route('/api', methods=['POST'])
# def get_text_response():
#
#     response_message = f"접힌 손가락 수: {folded_fingers}, 안 접힌 손가락 수: {unfolded_fingers}"
#
#     return jsonify({"response": response_message})
@app.route('/api', methods=['POST'])
def get_text_response():
    return jsonify({
        "folded_fingers": folded_fingers,
        "unfolded_fingers": unfolded_fingers
    })

@app.route('/')
def index():
    return render_template('mediapip.html')

if __name__ == '__main__':
    app.run(debug=True)