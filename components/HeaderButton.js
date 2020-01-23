import React from 'react';
import {Platform} from 'react-native';
import {HeaderButton} from 'react-navigation-header-buttons'; // npm i --save react-navigation-header-buttons
import {Ionicons} from '@expo/vector-icons'; // We used this package npm install --save @expo/vector-icons

import Colors from '../consts/colors';

const CustomHeaderButton = props => {
  // The first step that we have to do when we work with the HeaderButton is that we need to pull out all the key-value
  // pairs and passing them to this object ({...props}).
  // The second step is that we add the icon component prop which expects a vector icon package, so it has to be from
  // @expo/vector-icons or from React native vector icons package
  // check MealDetailScreen.js for the implementation of this button
  return (
    // All of these props we will get them from the <Item> component after we set them, from MealDetailScreen.js
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : Colors.primaryColor} />
    );
};

export default CustomHeaderButton;
