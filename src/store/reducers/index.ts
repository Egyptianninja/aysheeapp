import { combineReducers } from "redux";
import UserReducer from "./userReducer";
import GlobReducer from "./globReducer";
import ViewReducer from "./viewReducer";
import PostReducer from "./postReducer";

const reducers = combineReducers({
  user: UserReducer,
  glob: GlobReducer,
  view: ViewReducer,
  post: PostReducer
});
export default reducers;
