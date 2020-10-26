package com.carebookmobile;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.github.reactnativecommunity.location.RNLocationPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
//import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
//import com.reactnative.photoview.PhotoViewPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; // <-- Add this line
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import org.reactnative.camera.RNCameraPackage;
import com.imagepicker.ImagePickerPackage;
import com.entria.views.RNViewOverflowPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.remobile.toast.RCTToastPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.vonovak.AddCalendarEventPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNLocationPackage(),
            new ReactNativeRestartPackage(),
//            new ReactNativePushNotificationPackage(),
//            new PhotoViewPackage(),
//            new RNI18nPackage(),
            new AddCalendarEventPackage(),
            new RNFirebasePackage(),
            new RNFirebaseDatabasePackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage(),
            new RNCameraPackage(),
            new ImagePickerPackage(),
            new RNViewOverflowPackage(),
            new VectorIconsPackage(),
            new FastImageViewPackage(),
            new RCTToastPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
