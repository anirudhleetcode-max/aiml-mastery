package com.anirudh.aimlmastery;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;
import android.widget.FrameLayout;

import androidx.activity.OnBackPressedCallback;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.getcapacitor.BridgeActivity;

/**
 * The Android host for https://aiml-mastery.vercel.app.
 *
 * Everything here is native on purpose. The web application is the deployed
 * production site and is not modified to accommodate Android, so the wrapper
 * cannot rely on injecting JavaScript into it — and it should not want to. The
 * three things a WebView gets wrong by default are all fixable from this side:
 *
 *   1. Back. Capacitor 8's BridgeActivity adds no back handling whatsoever, so
 *      the default gesture finishes the activity. From a lesson three levels
 *      deep, "back" would close the app instead of returning to the unit list.
 *   2. Failure. A load that fails paints a blank white rectangle.
 *   3. Insets. targetSdk 36 means edge-to-edge is enforced, so without
 *      handling the content draws underneath the status bar and the gesture
 *      pill.
 */
public class MainActivity extends BridgeActivity {

    private View offlineOverlay;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        final WebView webView = getBridge().getWebView();

        getBridge().setWebViewClient(new AimlWebViewClient(getBridge(), this));

        installOfflineOverlay();
        applyWindowInsets();
        installBackHandler(webView);
    }

    /**
     * Back walks the site's own history before it leaves the app.
     *
     * Registered through the dispatcher rather than by overriding
     * onBackPressed(), because that override is deprecated and, from Android 13
     * on, is bypassed entirely by the predictive-back system. `setEnabled(false)`
     * then `onBackPressed()` is the documented way to say "I have nothing left
     * to handle, do the normal thing" without re-implementing the platform's
     * exit behaviour.
     */
    private void installBackHandler(final WebView webView) {
        getOnBackPressedDispatcher()
            .addCallback(
                this,
                new OnBackPressedCallback(true) {
                    @Override
                    public void handleOnBackPressed() {
                        if (offlineOverlay != null && offlineOverlay.getVisibility() == View.VISIBLE && webView.canGoBack()) {
                            // Backing out of a failed page should return to the
                            // last page that actually rendered, not exit.
                            hideOfflineOverlay();
                            webView.goBack();
                            return;
                        }

                        if (webView.canGoBack()) {
                            webView.goBack();
                            return;
                        }

                        setEnabled(false);
                        getOnBackPressedDispatcher().onBackPressed();
                    }
                }
            );
    }

    /**
     * Keeps content clear of the status bar, the navigation bar and the
     * keyboard.
     *
     * The IME inset is taken alongside the system bars so that focusing an
     * input — the sign-in form, the tutor prompt, a teach-back answer — resizes
     * the view instead of letting the keyboard cover the field being typed in.
     */
    private void applyWindowInsets() {
        final View content = findViewById(android.R.id.content);

        ViewCompat.setOnApplyWindowInsetsListener(
            content,
            (view, windowInsets) -> {
                Insets bars = windowInsets.getInsets(WindowInsetsCompat.Type.systemBars());
                Insets ime = windowInsets.getInsets(WindowInsetsCompat.Type.ime());

                view.setPadding(bars.left, bars.top, bars.right, Math.max(bars.bottom, ime.bottom));
                return WindowInsetsCompat.CONSUMED;
            }
        );
    }

    private void installOfflineOverlay() {
        FrameLayout root = findViewById(android.R.id.content);
        offlineOverlay = LayoutInflater.from(this).inflate(R.layout.offline_overlay, root, false);
        offlineOverlay.setVisibility(View.GONE);

        offlineOverlay
            .findViewById(R.id.offline_retry)
            .setOnClickListener(v -> {
                hideOfflineOverlay();
                getBridge().getWebView().reload();
            });

        root.addView(
            offlineOverlay,
            new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT)
        );
    }

    /** Called from {@link AimlWebViewClient} when a main-frame load fails. */
    void showOfflineOverlay() {
        runOnUiThread(() -> {
            if (offlineOverlay != null) {
                offlineOverlay.setVisibility(View.VISIBLE);
                offlineOverlay.bringToFront();
            }
        });
    }

    /** Called when any page finishes loading, successfully or not. */
    void hideOfflineOverlay() {
        runOnUiThread(() -> {
            if (offlineOverlay != null) {
                offlineOverlay.setVisibility(View.GONE);
            }
        });
    }
}
