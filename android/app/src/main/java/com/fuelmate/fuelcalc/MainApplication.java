package com.fuelmate.fuelcalc;

import android.app.Application;
import android.util.Log;

public class MainApplication extends Application {
    private static final String TAG = "FuelMateApp";

    @Override
    public void onCreate() {
        super.onCreate();
        Thread.setDefaultUncaughtExceptionHandler((thread, throwable) -> {
            Log.e(TAG, "FATAL UNCAUGHT EXCEPTION on thread " + thread.getName(), throwable);
        });
        Log.i(TAG, "MainApplication initialized cleanly.");
    }
}
