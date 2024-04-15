Started: December 26, 2023
Ended: TBD

NPX needed to create Application:
    npx create-expo-app@latest --template tabs@50 ./
    or
    npx create-expo-app my-app

NPM needed:
    npm install expo-font axios react-native-dotenv
    npm install -g -expo-cli
    npm install @react-navigation/native @react-navigation/native-stack
    npx expo install react-native-screens react-native-safe-area-context

    npx expo install react-native-svg
    npx expo install react-native-reanimated
    npx expo install react-native-modal
    npx expo install react-native-extra-dimensions-android
    npx expo install react-native-gesture-handler
    npx expo install @gorhom/bottom-sheet
    npx expo install expo-notifications
    npx expo install expo-device
    npx expo install react-native-paper

    //linking project to expo
    npm install --global eas-cli
    PowerShell -ExecutionPolicy Bypass -Command "& {eas init --id 55336044-565c-49e0-bcf2-480270967740}"


Build Application:
    PowerShell -ExecutionPolicy Bypass -Command "& {eas login}"
    npx cross-env EAS_NO_VCS=1 eas build:configure
    npx cross-env EAS_NO_VCS=1 eas build -p android --profile preview

To Start Application:
    npx expo start --tunnel
    or
    npx expo-cli start --tunnel

Snippets:
    Create a new document: rnfe
    New callback function: anfn
    New const callback function: nfn