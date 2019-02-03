import { combineReducers } from 'redux';
import UserReducer from './userReducer';
import GlobReducer from './globReducer';
import PostReducer from './postReducer';

const reducers = combineReducers({
  user: UserReducer,
  glob: GlobReducer,
  post: PostReducer
});
export default reducers;
