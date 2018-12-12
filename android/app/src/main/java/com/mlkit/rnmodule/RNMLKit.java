package com.mlkit.rnmodule;

import android.support.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.ml.vision.FirebaseVision;
import com.google.firebase.ml.vision.common.FirebaseVisionImage;
import com.google.firebase.ml.vision.face.FirebaseVisionFace;
import com.google.firebase.ml.vision.face.FirebaseVisionFaceDetector;
import com.google.firebase.ml.vision.face.FirebaseVisionFaceDetectorOptions;

import java.io.IOException;
import java.util.List;

public class RNMLKit extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private FirebaseVisionFaceDetector faceDetector;

    public RNMLKit(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @ReactMethod
    public void deviceFaceRecognition(String fileUri, final Promise promise) {
        try {
            FirebaseVisionImage mImage = FirebaseVisionImage.fromFilePath(this.reactContext, android.net.Uri.parse(fileUri));
            FirebaseVisionFaceDetector detector = this.getFaceDetectorInstance();
            Task<List<FirebaseVisionFace>> result =
                    detector.detectInImage(mImage)
                    .addOnSuccessListener(new OnSuccessListener<List<FirebaseVisionFace>>() {
                        @Override
                        public void onSuccess(List<FirebaseVisionFace> firebaseVisionFaces) {
                            promise.resolve(processFaceList(firebaseVisionFaces));
                        }
                    })
                    .addOnFailureListener(new OnFailureListener() {
                        @Override
                        public void onFailure(@NonNull Exception e) {
                            e.printStackTrace();
                            promise.reject(e);
                        }
                    });
        }
        catch (IOException e) {
            e.printStackTrace();
            promise.reject(e);
        }
    }

    public WritableArray processFaceList(List<FirebaseVisionFace> firebaseVisionFaces) {
        WritableArray data = Arguments.createArray();

        for(int i = 0; i < firebaseVisionFaces.size(); i ++) {
            FirebaseVisionFace mCurrentFace = firebaseVisionFaces.get(i);
            WritableMap faceObj = Arguments.createMap();

            faceObj.putInt("Face Number", i);
            data.pushMap(faceObj);
        }

        return data;
    }

    private FirebaseVisionFaceDetector getFaceDetectorInstance() {
        if (this.faceDetector == null) {
            FirebaseVisionFaceDetectorOptions options = new FirebaseVisionFaceDetectorOptions.Builder()
                    .setClassificationMode(FirebaseVisionFaceDetectorOptions.ACCURATE)
                    .setLandmarkMode(FirebaseVisionFaceDetectorOptions.ALL_LANDMARKS)
                    .setClassificationMode(FirebaseVisionFaceDetectorOptions.ALL_CLASSIFICATIONS)
                    .setMinFaceSize(0.5f)
                    .enableTracking()
                    .build();

            this.faceDetector = FirebaseVision.getInstance().getVisionFaceDetector(options);
        }
        return faceDetector;
    }

    @Override
    public String getName() {
        return "RNMLKit";
    }
}