export const authReducer = (state = {}, action: any) => {
  switch (action.type) {
    case 'IS_LOGGED_IN': {
      return action.payload;
    }
    default:
      return state;
  }
};

export const onboardingReducer = (state = {}, action: any) => {
  switch (action.type) {
    case 'HAS_ONBOARDED': {
      return action.payload;
    }
    default:
      return state;
  }
};

export const tokenReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case 'AUTH_TOKEN': {
      return action.payload;
    }
    default:
      return state;
  }
};

export const userReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case 'USER': {
      return action.payload;
    }
    default:
      return state;
  }
};

export const loginReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case 'AUTHENTICATE': {
      return action.payload;
    }

    default:
      return state;
  }
};
