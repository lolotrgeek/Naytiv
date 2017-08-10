# Installation

[Install NativeScript](https://docs.nativescript.org/start/quick-setup)

npm install -g nativescript

Windows:
```
@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://www.nativescript.org/setup/win'))"
```

Mac:
```
ruby -e "$(curl -fsSL https://www.nativescript.org/setup/mac)"
```

[Install firebase native plugin](https://github.com/eddyverbruggen/nativescript-plugin-firebase)

```
tns plugin add nativescript-plugin-firebase
```
## Set IDs 
NOTE: use reverse domain name notation for app ID

__App ID locations:__

/app/package.json

/package.json

/app/App_Resources/Android/app.gradle

__Storage Bucket ID location:__
/app/main.ts

## Login Setup

__Get Sha-1 from Keystore:__
```
$ $ keytool -exportcert -list -v -alias androiddebugkey -keystore ~/.android/<your-key-here>.keystore
```

[Download Windows OpenSSL](http://code.google.com/p/openssl-for-windows/downloads/detail?name=openssl-0.9.8k_X64.zip) extract to `C:\Users\<yourusername>\openssl\`

Generate Key Hash
```
$ keytool -exportcert -alias androiddebugkey -keystore C:\Users\<yourusername>\.android\<your-key-here>.keystore | "C:\Users\<yourusername>\openssl\bin\openssl.exe" sha1 -binary | "C:\Users\<yourusername>\openssl\bin\openssl.exe" base64
```

[Facebook Login Setup](https://github.com/EddyVerbruggen/nativescript-plugin-firebase/blob/master/docs/AUTHENTICATION.md#facebook-login)

[Google Login Setup](https://github.com/EddyVerbruggen/nativescript-plugin-firebase/blob/master/docs/AUTHENTICATION.md#google-sign-in)

## Icons/ Splashscreens
[Generate from Image](http://images.nativescript.rocks/)

Use image that is 1024 x 1024, got to "Launch Icons" tab, upload image, set background color, and press "Go". 

Copy files into /app/App_Resources

[Useful Code](https://github.com/EddyVerbruggen/nativescript-plugin-firebase-demo/blob/master/Firebase/app/main-view-model.js)

# Build
Must build for release for facebook and google to function properly. [Documentation](https://docs.nativescript.org/publishing/publishing-android-apps)
```
$ tns build android --release --key-store-path <path-to-your-keystore> --key-store-password <your-key-store-password> --key-store-alias <your-alias-name> --key-store-alias-password <your-alias-password>

$ tns build ios
```
# Built with
[NativeScript](https://www.nativescript.org/)

[Giftler](https://github.com/jlooper/giftler)

[NativeScript Firebase](https://github.com/EddyVerbruggen/nativescript-plugin-firebase)