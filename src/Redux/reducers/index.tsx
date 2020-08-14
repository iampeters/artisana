import { combineReducers } from 'redux';
import { themeReducer } from './themeReducer';
import { loaderReducer, menuReducer, navBarReducer } from './loaderReducer';
import { authReducer, userReducer, tokenReducer, loginReducer, onboardingReducer } from './userReducer';
import { artisanReducer } from './artisanReducer';
import { alertReducer } from './alertReducer';
import { fileReducer } from './fileReducer';
import { reviewReducer } from './reviewReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  loading: loaderReducer,
  auth: authReducer,
  user: userReducer,
  tokens: tokenReducer,
  onboarding: onboardingReducer,
  // login: loginReducer,
  // artisan: artisanReducer,
  alert: alertReducer,
  // file: fileReducer,
  // reviews: reviewReducer,
});

export default rootReducer;
