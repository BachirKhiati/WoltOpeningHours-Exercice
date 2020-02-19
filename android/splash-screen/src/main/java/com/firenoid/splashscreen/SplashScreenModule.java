package com.firenoid.splashscreen;


import android.os.Handler;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Collections;
import java.util.Map;


import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

/**
 * Native module that provides image cropping functionality.
 */
public class SplashScreenModule extends ReactContextBaseJavaModule {
    private boolean splashScreen = true;

  protected static final String NAME = "RNSplashScreen";


  public SplashScreenModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return NAME;
  }

  @Override
  public Map<String, Object> getConstants() {
    return Collections.emptyMap();
  }



  @ReactMethod
  public void removeSplashScreen(double delay, final Promise promise) {
      if(splashScreen){
          Handler handler = new Handler();
          handler.postDelayed(new Runnable() {
              @Override
              public void run() {
                  runOnUiThread(new Runnable() {
                      @Override
                      public void run() {
                          getCurrentActivity().getWindow().setBackgroundDrawableResource(android.R.color.white);
                          promise.resolve(true);
                      }
                  });
              }
          }, (long) delay);
      }


  }



}




