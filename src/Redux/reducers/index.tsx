import { combineReducers } from 'redux';
import { themeReducer } from './themeReducer';
import { loaderReducer, menuReducer, navBarReducer } from './loaderReducer';
import { authReducer, userReducer, tokenReducer, loginReducer, onboardingReducer, dashboardReducer, messageReducer, activeChatsReducer, notificationReducer, chatUserReducer } from './userReducer';
import { artisanReducer } from './artisanReducer';
import { alertReducer } from './alertReducer';
import { fileReducer } from './fileReducer';
import { reviewReducer } from './reviewReducer';
import { categoryReducer } from './categoryReducer';
import { jobReducer, requestReducer } from './jobReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  loading: loaderReducer,
  auth: authReducer,
  user: userReducer,
  tokens: tokenReducer,
  onboarding: onboardingReducer,
  // login: loginReducer,
  artisan: artisanReducer,
  alert: alertReducer,
  file: fileReducer,
  reviews: reviewReducer,
  category: categoryReducer,
  dashboard: dashboardReducer,
  jobs: jobReducer,
  requests: requestReducer,
  chats: messageReducer,
  activeChats: activeChatsReducer,
  messageDots: notificationReducer,
  chatUser: chatUserReducer,
});

export default rootReducer;
