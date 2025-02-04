/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './Modules/App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import storeX from './Modules/Redux/store';

// move this to App.tsx
const Redux = () => (
    <Provider store={storeX} >
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => Redux);
