import React from 'react';
import {Provider} from 'react-redux';
import AppContainer from './src/navigations/AppContainer';
import store from './src/redux/store';
import {Provider as PaperProvider} from 'react-native-paper';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex:1}}>
    <PaperProvider>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default App;
