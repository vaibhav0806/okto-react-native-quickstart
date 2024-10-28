/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { OktoProvider, BuildType } from 'okto-sdk-react-native';
import { OKTO_CLIENT_APP_SECRET } from "@env";

// Create a Root component that wraps App with OktoProvider
function Root() {
    return (
        <OktoProvider apiKey={OKTO_CLIENT_APP_SECRET} buildType={BuildType.SANDBOX}>
            <App />
        </OktoProvider>
    );
}

// Register the Root component instead of App
AppRegistry.registerComponent(appName, () => Root);