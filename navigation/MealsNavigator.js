import React from 'react';
// To deal with the navigation we install this library: npm install --save react-navigation
// expo install react-native-gesture-handler react-native-reanimated and
// npm install --save react-navigation-stack.
// We need to add this component as a default component when the app start. To do that, we set in app.js
// the return to this component.
// ==========================================================================
// When we change screens or pages it creates a stack. When we click a button to open a new screen
// it put that screen on the top of our stack and we go back it pops off from the stack to go back
// to our previous page. That's why we need a stack navigator.

// Below, we import createStackNavigator
// to help us create a stack navigator. This method is the basic way to navigate between pages.
// So we need a stack navigator whenever we have screens, pages in our app that are connected with forward and
// backward flow.
// We can have multiple navigators in our app.
// ===========================================================================

// To use it see App.js
import { createStackNavigator } from 'react-navigation-stack';
import {Platform, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

// Alternative bottom tab navigator for androidish look
// We used npm i --save react-navigation-material-bottom-tabs react-native-paper
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

// npm install --save react-navigation-tabs
import { createBottomTabNavigator } from 'react-navigation-tabs';

// npm install --save react-navigation-drawer
import { createDrawerNavigator } from 'react-navigation-drawer';

// In the createAppContainer we need to wrap our root, so our main (most important) navigator.
import {createAppContainer} from 'react-navigation';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';

import Colors from '../consts/colors';

// Here we map our pages
// Any component that mapped here, will get a special prop. (Nested Components in there won't
// get it automatically) just the top level components (CategoriesScreen, CategoryMealsScreen,
// MealDetailScreen) we mapped to identifiers in our navigators

// We can access the navigationOptions and customize the header (top bar) of our app
// We can use navigationOptions in the component inside (outside of the main function)
// ex mainFunctionName.navigationOptions = {} or we can use it as a function to get
// the getParams data and change the title dynamically for example
// CategoryMealsScreen.navigationOptions = (navigationData) => {
// return { headerTitle: title etc..}}
// If we want to set the same style across of our app. The second param in our StackNavigator
// is defaultNavigationOptions.
// If we have navigationOptions in here and in the component, always the navigationOptions
// in the component will overwrite the defaultNavigationOptions. (check MealDetailScreen.js for component navigationOptions)
// We can have navigationOptions in each identifier in createStackNavigator({}) or in the component.
// navigationOptions and defaultNavigationOptions are different.

// One more thing, under the headerTitle, we can use the headerRight: ourJsxCode or headerLeft: ourJsxCode and with these
// keys we can set the right or the left button in the header bar. The left button usually is by default the back
// button but in the right side we can add whatever we want, favorite button, login etc...
// In addition, it's recommended to have install this package npm install --save react-navigation-header-buttons
// because it will help us with the different device screens. (check components/HeaderButton.js and MealDetailScreen.js)

// if we use the mode: 'modal' key inside the second param we can set an animation (screen
// transition)for iOS devices.

// If we use the initialRouteName: 'ComponentName' key in the second param we can set the
// main screen of our app.

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
  // We customize in the header (top bar) the title of the screen
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  // We customize in the header (top bar) the back button title
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  headerTitle: 'A Screen'
}

// With MealsNavigator we wrap a navigator stack (top bar, etc..) in our CategoriesScreen screen,
// CategoryMealsScreen, MealDetailScreen and we create a back/front flow between those screens.
// check CategoriesScreen.js about how to use stackNavigator in a button or a function to navigate
const MealsNavigator = createStackNavigator({
  Categories: {
    screen: CategoriesScreen
  },
  CategoryMeals: {
    screen: CategoryMealsScreen,
  },
  MealDetail: MealDetailScreen
}, {
  initialRouteName: 'Categories',
  defaultNavigationOptions: defaultStackNavOptions
});

// With FavNavigator we wrap a navigator stack (top bar, etc..) in our favorite screen and our MealDetailScreen
// and we create a back/front flow between those screens.
const FavNavigator = createStackNavigator({
  Favorites: FavoritesScreen,
  MealDetail: MealDetailScreen
},
{
  defaultNavigationOptions: defaultStackNavOptions
});

// With FiltersNavigator we wrap a navigator stack (top bar, etc..) in our FiltersScreen screen
const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen
}, {
  defaultNavigationOptions: defaultStackNavOptions
});

const tabScreenConfig = {
  // We can add identifiers exactly like Stack Navigator. Here we add the MealsNavigator as our first tab.
  // That's mean that when we press that button it will return us to MealsNavigator categories
  Meals: {screen: MealsNavigator, navigationOptions: {
    tabBarIcon: (tabInfo) => {
      return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
    },
    tabBarColor: Colors.primaryColor,
    // If we don't add label title then the identifier name will be the title.
    // We can use JSX component as tabBarLabel or just a string.
    // The above rules are apply in every navigator that we have create till now.
    tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals'
  }},
  Favorites: {screen: FavNavigator, navigationOptions: {
    tabBarLabel: 'My Favorites',
    tabBarIcon: (tabInfo) => {
      return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
    },
    tabBarColor: Colors.accentColor,
    tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Favorites</Text> : 'Favorites'
  }}
}

// BottomTabNavigator and createMaterialBottomTabNavigator takes an object where we have to inform it about
// the different tabs. In addition, they take as a second argument some configuration settings
const MealsFavTabNavigator = Platform.OS === 'android' ?
// Android look
createMaterialBottomTabNavigator (
  tabScreenConfig,
  {
    activeColor: 'white',
    shifting: true, // Add a color effect change if we have set tabBarColor in each identifier. In addition, it
                    // gives an animation hide/show title under the bottom bar icons
    barStyle: {
      backgroundColor: Colors.primaryColor
    }
  }
)
// Ios look
: createBottomTabNavigator(
  tabScreenConfig,
  {
  tabBarOptions: {
    labelStyle: {
      fontFamily: 'open-sans'
    },
    activeTintColor: Colors.accentColor
  }
});

// Drawer navigator (with hamburger icon)
const MainNavigator = createDrawerNavigator({
  MealsFavs: {
    screen: MealsFavTabNavigator,
    navigationOptions: {
      drawerLabel: 'Meals'
    }
  },
  Filters: FiltersNavigator
}, {
  contentOptions: {
    activeTintColor: Colors.accentColor,
    labelStyle: {
      fontFamily: 'open-sans-bold'
    }
  }
});

// We used the MainNavigator as our route navigator because the MealsFavTabNavigator is nested inside
// MainNavigator and the FiltersNavigator. In addition, MealsFavTabNavigator contain the other two navigators
// MealsNavigator and FavNavigator. As a result MainNavigator contain every navigator that we have create.
export default createAppContainer(MainNavigator);
