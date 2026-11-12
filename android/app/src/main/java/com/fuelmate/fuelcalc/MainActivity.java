package com.fuelmate.fuelcalc;

import android.app.AlertDialog;
import android.os.Bundle;
import android.util.Log;
import com.getcapacitor.BridgeActivity;
import java.io.PrintWriter;
import java.io.StringWriter;

public class MainActivity extends BridgeActivity {
    private static final String TAG = "FuelMateMain";

    @Override
    public void onCreate(Bundle savedInstanceState) {
        Log.i(TAG, "MainActivity onCreate starting...");

        try {
            super.onCreate(savedInstanceState);
            Log.i(TAG, "MainActivity onCreate completed successfully.");
        } catch (final Throwable t) {
            Log.e(TAG, "CRASH IN ONCREATE: ", t);
            final StringWriter sw = new StringWriter();
            t.printStackTrace(new PrintWriter(sw));
            final String error = sw.toString();

            try {
                runOnUiThread(() -> {
                    new AlertDialog.Builder(MainActivity.this)
                        .setTitle("Lỗi Khởi Động App")
                        .setMessage("App gặp lỗi:\n\n" + error)
                        .setPositiveButton("Đóng", (dialog, which) -> finish())
                        .setCancelable(false)
                        .show();
                });
            } catch (Exception ignored) {}
        }
    }
}
