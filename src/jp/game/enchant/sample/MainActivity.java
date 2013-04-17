package jp.game.enchant.sample;

import android.os.Bundle;
import android.app.Activity;
import android.webkit.WebView;

public class MainActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
	    // WebViewを生成
	    WebView webView = new WebView(getApplicationContext());
	    // WebViewをセット
	    setContentView(webView);
	    // JavaScriptを有効に
	    webView.getSettings().setJavaScriptEnabled(true);
	    // HTMLを読み込む
	    webView.loadUrl("file:///android_asset/www/index.html");	
	}
}
