package com.mlkit.rnmodule;

import android.graphics.Rect;
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
import com.google.firebase.ml.vision.common.FirebaseVisionPoint;
import com.google.firebase.ml.vision.face.FirebaseVisionFace;
import com.google.firebase.ml.vision.face.FirebaseVisionFaceContour;
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

    private WritableArray processFaceList(List<FirebaseVisionFace> firebaseVisionFaces) {
        WritableArray data = Arguments.createArray();

        for(FirebaseVisionFace mCurrentFace : firebaseVisionFaces) {
            WritableMap faceObj = Arguments.createMap();

            if(mCurrentFace.getLeftEyeOpenProbability() != FirebaseVisionFace.UNCOMPUTED_PROBABILITY) {
                faceObj.putDouble("leftEyeOpenProbability", mCurrentFace.getLeftEyeOpenProbability());
            }

            if(mCurrentFace.getRightEyeOpenProbability() != FirebaseVisionFace.UNCOMPUTED_PROBABILITY) {
                faceObj.putDouble("rightEyeOpenProbability", mCurrentFace.getRightEyeOpenProbability());
            }

            if(mCurrentFace.getSmilingProbability() != FirebaseVisionFace.UNCOMPUTED_PROBABILITY) {
                faceObj.putDouble("smilingProbability", mCurrentFace.getSmilingProbability());
            }

            if(mCurrentFace.getContour(FirebaseVisionFaceContour.ALL_POINTS).getPoints().size() != 0) {
                WritableArray mContourArray = Arguments.createArray();

                List<FirebaseVisionPoint> mFaceContours = mCurrentFace.getContour(FirebaseVisionFaceContour.ALL_POINTS).getPoints();

                for (FirebaseVisionPoint mPoint : mFaceContours) {
                    WritableMap mPointMap = Arguments.createMap();
                    mPointMap.putDouble("x", mPoint.getX());
                    mPointMap.putDouble("y", mPoint.getY());

                    mContourArray.pushMap(mPointMap);
                }

                faceObj.putArray("contourPoints", mContourArray);
            }

            Rect mBoundingBox = mCurrentFace.getBoundingBox();

            WritableMap mBoundingObj = Arguments.createMap();

            mBoundingObj.putInt("top", mBoundingBox.top);
            mBoundingObj.putInt("bottom", mBoundingBox.bottom);
            mBoundingObj.putInt("left", mBoundingBox.left);
            mBoundingObj.putInt("right", mBoundingBox.right);

            faceObj.putMap("boundingBox", mBoundingObj);
            data.pushMap(faceObj);
        }

        return data;
    }

    private FirebaseVisionFaceDetector getFaceDetectorInstance() {
        if (this.faceDetector == null) {
            FirebaseVisionFaceDetectorOptions options = new FirebaseVisionFaceDetectorOptions.Builder()
                    .setPerformanceMode(FirebaseVisionFaceDetectorOptions.FAST)
                    .setLandmarkMode(FirebaseVisionFaceDetectorOptions.ALL_LANDMARKS)
                    .setClassificationMode(FirebaseVisionFaceDetectorOptions.ALL_CLASSIFICATIONS)
                    .setMinFaceSize(0.15f)
                    .enableTracking()
                    .build();

            FirebaseVisionFaceDetectorOptions realTimeOpts =
                    new FirebaseVisionFaceDetectorOptions.Builder()
                            .setPerformanceMode(FirebaseVisionFaceDetectorOptions.FAST)
                            .setContourMode(FirebaseVisionFaceDetectorOptions.ALL_CONTOURS)
                            .build();

            this.faceDetector = FirebaseVision.getInstance().getVisionFaceDetector(realTimeOpts);
        }
        return faceDetector;
    }

    @Override
    public String getName() {
        return "RNMLKit";
    }
}
