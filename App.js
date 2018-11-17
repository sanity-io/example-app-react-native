import React from 'react'
import {createAppContainer, createStackNavigator} from 'react-navigation'

import HomeScreen from './screens/Home'
import MoviesScreen from './screens/Movies'
import MovieScreen from './screens/Movie'
import PersonScreen from './screens/Person'
import PeopleScreen from './screens/People'

const AppNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Movies: {screen: MoviesScreen},
  People: {screen: PeopleScreen},
  Movie: {screen: MovieScreen},
  Person: {screen: PersonScreen}
})

export default createAppContainer(AppNavigator)
