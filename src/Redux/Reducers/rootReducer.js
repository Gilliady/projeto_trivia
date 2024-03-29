import { combineReducers } from 'redux';
import { playerReducer } from './playerReducer';
import tokenReducer from './tokenReducer';
import questionsReducer from './questionsReducer';
import timerReducer from './timerReducer';

const rootReducer = combineReducers({
  player: playerReducer,
  token: tokenReducer,
  questions: questionsReducer,
  timer: timerReducer,
});

export default rootReducer;
