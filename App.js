import React, {useState} from 'react';
import { Text, View } from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

// react navigation uses native optimized screen components provided by Android and iOS.
// Android uses Fragment and iOS uses UI view Controllers and this library improves
// performance a little bit more.
// npm i --save react-native-screens
import {enableScreens} from 'react-native-screens';

import { createStackNavigator } from 'react-navigation-stack';

import mealsReducer from './store/reducers/meals';
import MealsNavigator from './navigation/MealsNavigator';

enableScreens();

//combineReducers is when we have more than once reducers for example one for users, one for products etc..
//here we use it, just for demonstration.
const rootReducer = combineReducers({
  meals: mealsReducer
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />
  }

  return <Provider store={store}><MealsNavigator /></Provider>;
}
