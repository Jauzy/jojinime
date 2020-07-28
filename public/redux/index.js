import { combineReducers } from 'redux';
import user from './Reducers/user';
import anime from './Reducers/anime'

export default combineReducers({ user, anime });