package com.videoplayerdemo;

import android.net.Uri;
import android.os.Build;
import android.support.annotation.Nullable;
import android.widget.VideoView;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

public class VideoViewManager extends SimpleViewManager<VideoView> {
    @Override
    public String getName() {
        return "VideoView";
    }

    @Override
    protected VideoView createViewInstance(ThemedReactContext reactContext) {
        VideoView videoView=new VideoView(reactContext);
        return videoView;
    }

    //停止播放
    public void onDropViewInstance(VideoView view){
       super.onDropViewInstance(view);
       view.stopPlayback();
    }

    @ReactProp(name = "source")
    public void setSource(VideoView videoView,@Nullable ReadableMap source){
        if(source != null){
            if (source.hasKey("url")) {
                String url = source.getString("url");
                System.out.println("url = "+url);
                HashMap<String, String> headerMap = new HashMap<>();
                if (source.hasKey("headers")) {
                    ReadableMap headers = source.getMap("headers");
                    ReadableMapKeySetIterator iter = headers.keySetIterator();
                    while (iter.hasNextKey()) {
                        String key = iter.nextKey();
                        headerMap.put(key, headers.getString(key));
                    }
                }
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                    videoView.setVideoURI(Uri.parse(url),headerMap);
                }else{
                    try {
                        Method setVideoURIMethod = videoView.getClass().getMethod("setVideoURI", Uri.class, Map.class);
                        setVideoURIMethod.invoke(videoView, Uri.parse(url), headerMap);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
                videoView.start();
            }
        }
    }
}
