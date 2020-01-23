import React from 'react';
import {View, Text, Button, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import { CATEGORIES } from '../data/dummy-data';
import HeaderButton from '../components/HeaderButton';
import CategoryGridTile from '../components/CategoryGridTile';

const CategoriesScreen = props => {
  // We create the function so we can access to props
  const renderGridItem = (itemData) => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() =>
        // Because we have already map this component in MealsNavigator. We receive a special prop
        // from there. We can use it to navigate between our pages. The first argument in .navigate
        // is the identifier name that we used in MealsNavigator to map our components.

        // Instead of .navigate we can use .push or .replace. The difference with the .push is that
        // we can use the same screen (page) onto the stack and load it with different content.
        // The difference with .replace is we don't add the screen to our stack. So when we want to
        // go to a new screen without the option to go back on the new page, we use .replace.
        // .replace is very useful when we create a login screen, where a user did sign in and
        // once signed in, the user can't go back.
        // e.x props.navigation.push('CategoryMeals') or props.navigation .replace('CategoryMeals')

        // Another alternative of .navigate is the .goBack() or .pop() or popToTop(). With all of them
        // we can create buttons that go to the previous screen. (ex props.navigation.goBack())
        // The difference between .goBack and .pop is that .pop can only be used if you're in a stack
        // navigator instead of .goBack which can be available in others navigators.
        // The popToTop go back to our main screen at once. So if we have open many screens and we want
        // to go back immediately back to our main page then we use popToTop.

        // If we want to send data in our next screen. We use in navigate() the second parameter
        // with name params: {}. It accepts an object. In the component that we sent the data
        // we can use them with the method props.navigation.getParam('categoryId')
        {props.navigation.navigate({routeName: 'CategoryMeals', params: {
          categoryId: itemData.item.id
        }})}}
      />
    )
  };

  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2}
    />
  )
};

CategoriesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Meal Categories',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='Menu' iconName='ios-menu' onPress={() => {
          navData.navigation.toggleDrawer();
        }} />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CategoriesScreen;

  // <Button title="Go to meals!" onPress={() => {

  //   props.navigation.navigate({
  //     routeName: 'CategoryMeals'
  //   })
  // }} />
