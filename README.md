# Installation

[Install NativeScript](https://docs.nativescript.org/start/quick-setup)
```
npm install -g nativescript
```
__Windows:__
```
@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://www.nativescript.org/setup/win'))"
```

__Mac:__
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

__Generate Key Hash__

[Download Windows OpenSSL](http://code.google.com/p/openssl-for-windows/downloads/detail?name=openssl-0.9.8k_X64.zip) extract to `C:\Users\<yourusername>\openssl\`
```
$ keytool -exportcert -alias androiddebugkey -keystore C:\Users\<yourusername>\.android\<your-key-here>.keystore | "C:\Users\<yourusername>\openssl\bin\openssl.exe" sha1 -binary | "C:\Users\<yourusername>\openssl\bin\openssl.exe" base64
```

[Facebook Login Setup](https://github.com/EddyVerbruggen/nativescript-plugin-firebase/blob/master/docs/AUTHENTICATION.md#facebook-login)

[Google Login Setup](https://github.com/EddyVerbruggen/nativescript-plugin-firebase/blob/master/docs/AUTHENTICATION.md#google-sign-in)

## Icons/ Splashscreens
[Generate from Image](http://images.nativescript.rocks/)

Use 1024 x 1024 image, go to "Launch Icons" tab in site above link, upload image, set background color, and press "Go". 

Copy downloaded files into /app/App_Resources


# Build
Must build for release for facebook and google to function properly. [Documentation](https://docs.nativescript.org/publishing/publishing-android-apps)
```
$ tns build android --release --key-store-path <path-to-your-keystore> --key-store-password <your-key-store-password> --key-store-alias <your-alias-name> --key-store-alias-password <your-alias-password>

$ tns build ios
```
# Reference
[NativeScript](https://www.nativescript.org/)

[Giftler](https://github.com/jlooper/giftler)

[NativeScript Firebase](https://github.com/EddyVerbruggen/nativescript-plugin-firebase)