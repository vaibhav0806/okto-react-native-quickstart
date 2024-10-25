/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { OktoProvider, BuildType } from 'okto-sdk-react-native';

// Create a Root component that wraps App with OktoProvider
function Root() {
    return (
        <OktoProvider apiKey={"dcece6f3-68d3-4ca8-b5eb-e14d4a0dac36"} buildType={BuildType.SANDBOX}>
            <App />
        </OktoProvider>
    );
}

// Register the Root component instead of App
AppRegistry.registerComponent(appName, () => Root);