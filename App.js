import React from 'react';
import {StackNavigator} from 'react-navigation';

import HomeScreen from './screens/Home'
import MoviesScreen from './screens/Movies'
import MovieScreen from './screens/Movie'
import PersonScreen from './screens/Person'
import PeopleScreen from './screens/People'

export default StackNavigator({
  Home: { screen: HomeScreen },
  Movies: { screen: MoviesScreen },
  People: { screen: PeopleScreen },
  Movie: { screen: MovieScreen },
  Person: { screen: PersonScreen }
});

