
export default {
  expo: {
    name: "MyNewExhibitionApp",
    slug: "MyNewExhibitionApp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.sunenglishjr.MyNewExhibitionApp",
      "infoPlist": {
        "NSCameraUsageDescription": "This app needs access to your camera to allow photo capture.",
        "NSLocationWhenInUseUsageDescription": "This app requires your location to provide relevant exhibition information."
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      apiUrl: process.env.REACT_APP_API_URL,  // EAS Secret for API URL
      eas: {
        projectId: "e7bb70f9-613b-438f-9800-3b779b16dc04"
      }
    }
  }
};
