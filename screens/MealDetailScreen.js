import React, {useEffect, useCallback} from 'react';
import {View, Image, Text, StyleSheet, ScrollView} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import {toggleFavorite} from '../store/actions/meals';

const ListItem = props => {
  return <View style={styles.listItem}>
    <DefaultText>{props.children}</DefaultText>
  </View>
}

const MealDetailScreen = props => {
  const availableMeals = useSelector(state => state.meals.meals);
  const mealId = props.navigation.getParam('mealId');
  const currentMealIsFavorite = useSelector(state =>
    state.meals.favoriteMeals.some(meal => meal.id === mealId)
  );

  const selectedMeal = availableMeals.find(meal => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({toggleFav: toggleFavoriteHandler});
  }, [toggleFavoriteHandler])

  useEffect(() => {
    props.navigation.setParams({isFav: currentMealIsFavorite});
  },[currentMealIsFavorite]);

  return (
    <ScrollView>
      <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {
        selectedMeal.ingredients.map(ingredient => {
          return <ListItem key={ingredient}>{ingredient}</ListItem>
        })
      }
      <Text style={styles.title}>Steps</Text>
      {
        selectedMeal.steps.map(step => {
          return <ListItem key={step}>{step}</ListItem>
        })
      }
    </ScrollView>
  )
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
  const isFavorite = navigationData.navigation.getParam('isFav');

  return {
    headerTitle: mealTitle,
    // We use <HeaderButtons> component so we fit our button easier in different device screens.
    // The first parameter that it accept's is HeaderButtonComponent, in there we add our custom button component made
    // with HeaderButton component from the same package.
    // In addition, if we want to add props in our HeaderButton, we have to wrap a new component with name <Item>
    // in our <HeaderButtons>. The <Item> component will work as our button and we can set there the props that we want,
    // these props will be transfer to our HeaderButton component.
    // The title property in <Item> should be unique, if we want to add more than once buttons.
    headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='Favorite' iconName={isFavorite ? 'ios-star' : 'ios-star-outline'} onPress={toggleFavorite}/></HeaderButtons>
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center'
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10
  }
});

export default MealDetailScreen;
