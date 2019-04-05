import { combineReducers } from 'redux';
import GlobReducer from './globReducer';
import PostReducer from './postReducer';
import UserReducer from './userReducer';

const reducers = combineReducers({
  user: UserReducer,
  glob: GlobReducer,
  post: PostReducer
});
export default reducers;
