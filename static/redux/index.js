import { combineReducers } from 'redux';
import user from './Reducers/user';
import anime from './Reducers/anime'
import schedule from './Reducers/schedule'
import episode from './Reducers/episode'

export default combineReducers({ user, anime, schedule, episode});