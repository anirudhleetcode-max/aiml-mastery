package com.anirudh.aimlmastery;

import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;

import com.getcapacitor.Bridge;
import com.getcapacitor.BridgeWebViewClient;

/**
 * Decides what a failed page load means.
 *
 * Capacitor's own client already routes navigation correctly: {@code
 * Bridge.launchIntent} keeps the host listed in {@code server.allowNavigation}
 * inside the WebView and hands every other destination to the system browser,
 * so external links are not trapped in a chrome-less WebView. That behaviour is
 * inherited, not replaced.
 *
 * What is added here is failure handling, because the default is to show
 * nothing. A WebView whose load failed renders as a blank white rectangle with
 * no explanation and no way to try again, which is indistinguishable from the
 * app being broken.
 *
 * Two distinctions matter and both are easy to get wrong:
 *
 *   - Only main-frame failures are interesting. A single image or font that
 *     404s must not replace a page the learner is reading.
 *   - Only transport failures and server faults are ours. The application
 *     answers 401 on a protected route for a signed-out visitor and 404 for an
 *     unknown one, and it renders real pages for both. Treating those as
 *     "offline" would hide the sign-in redirect behind an error screen, so
 *     HTTP statuses below 500 are deliberately left alone.
 */
public class AimlWebViewClient extends BridgeWebViewClient {

    private final MainActivity activity;

    public AimlWebViewClient(Bridge bridge, MainActivity activity) {
        super(bridge);
        this.activity = activity;
    }

    @Override
    public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
        // Not calling super on purpose: the inherited implementation navigates
        // to `bridge.getErrorUrl()`, which belongs to the bundled local-server
        // setup this app does not use. The native overlay is the error surface.
        if (request != null && request.isForMainFrame()) {
            activity.showOfflineOverlay();
        }
    }

    @Override
    public void onReceivedHttpError(WebView view, WebResourceRequest request, WebResourceResponse errorResponse) {
        boolean mainFrame = request != null && request.isForMainFrame();
        boolean serverFault = errorResponse != null && errorResponse.getStatusCode() >= 500;

        if (mainFrame && serverFault) {
            activity.showOfflineOverlay();
        }
    }

    @Override
    public void onPageFinished(WebView view, String url) {
        super.onPageFinished(view, url);
        // A page arrived, so whatever failed before has recovered.
        activity.hideOfflineOverlay();
    }
}
