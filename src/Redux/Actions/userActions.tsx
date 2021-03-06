import AuthService from '../../Services/AuthService';
import { ResponseDetails, Tokens } from '../../Interfaces/interface';
import AsyncStorage from '@react-native-community/async-storage';

export const userAction = (state: any) => {
  return (dispatch: any) => {
    dispatch({ type: 'TYPING', payload: state });
  };
};

export const logout = () => {
  return (dispatch: any) => {
    dispatch({
      type: 'IS_LOGGED_IN',
      payload: {},
    });

    dispatch({
      type: 'AUTH_TOKEN',
      payload: {},
    });
    dispatch({
      type: 'USER',
      payload: {},
    });

    AsyncStorage.clear();
  }
};

export const refreshToken = (token: Tokens) => {
  const authService = new AuthService();

  const api = authService.refreshToken(token);

  return (dispatch: any) => {
    api
      .then((res: any) => {
        const result = res;
        if (result.token) {
          // set auth
          Storage();

          // set authentication to true
          dispatch({
            type: 'AUTH_TOKEN',
            payload: { auth_token: result.token, refresh_token: result.refresh_token },
          });
          // set logged in user state
          dispatch({
            type: 'USER',
            payload: result.user,
          });

          dispatch({
            type: 'IS_LOGGED_IN',
            payload: { isLoggedIn: true },
          });

          // send response to login screen
          dispatch({
            type: 'ALERT',
            payload: {
              successful: true,
              message: 'Refreshed successfully.',
            },
          });
        } else {
          dispatch({
            type: 'ALERT',
            payload: res,
          });
        }
      })
      .catch(() => {
        // send err to application
        dispatch({
          type: 'ALERT',
          payload: {
            message: 'Network request failed',
            successful: false,
          },
        });
      });
  };
};

export const login = (state: any) => {
  const authService = new AuthService();

  const api = authService.login(state);

  return (dispatch: any) => {
    api
      .then((res: any) => {
        const result = res;
        if (result.token) {
          // set auth
          Storage();

          if (result.user.userType === 2 && !result.user.hasOnboarded) {
            dispatch({
              type: 'AUTH_TOKEN',
              payload: { auth_token: result.token, refresh_token: result.refresh_token },
            });
            // set logged in user state
            dispatch({
              type: 'USER',
              payload: result.user,
            });
            // send response to login screen
            dispatch({
              type: 'ALERT',
              payload: {
                successful: true,
                message: 'unverified',
              },
            });

            // dispatch({
            //   type: 'IS_LOGGED_IN',
            //   payload: { isLoggedIn: true },
            // });
          } else {
            // set authentication to true
            dispatch({
              type: 'AUTH_TOKEN',
              payload: { auth_token: result.token, refresh_token: result.refresh_token },
            });
            // set logged in user state
            dispatch({
              type: 'USER',
              payload: result.user,
            });

            dispatch({
              type: 'IS_LOGGED_IN',
              payload: { isLoggedIn: true },
            });

            // send response to login screen
            // dispatch({
            //   type: 'ALERT',
            //   payload: {
            //     successful: true,
            //     message: 'Logged in successfully.',
            //   },
            // });
          }
        } else {
          dispatch({
            type: 'ALERT',
            payload: res,
          });
        }
      })
      .catch(() => {
        // send err to application
        dispatch({
          type: 'ALERT',
          payload: {
            message: 'Network request failed',
            successful: false,
          },
        });
      });
  };
};

export const socialAuth = (state: any) => {
  const api = new AuthService().socialAuth(state);

  return (dispatch: any) => {
    api
      .then((res: any) => {
        const result = res;
        if (result.token) {
          // set auth
          Storage();

          if (result.user.userType === 2 && !result.user.hasOnboarded) {
            dispatch({
              type: 'AUTH_TOKEN',
              payload: { auth_token: result.token, refresh_token: result.refresh_token },
            });
            // set logged in user state
            dispatch({
              type: 'USER',
              payload: result.user,
            });
            // send response to login screen
            dispatch({
              type: 'ALERT',
              payload: {
                successful: true,
                message: 'unverified',
              },
            });
          } else {
            // set authentication to true
            dispatch({
              type: 'AUTH_TOKEN',
              payload: { auth_token: result.token, refresh_token: result.refresh_token },
            });
            // set logged in user state
            dispatch({
              type: 'USER',
              payload: result.user,
            });

            dispatch({
              type: 'IS_LOGGED_IN',
              payload: { isLoggedIn: true },
            });

            // send response to login screen
            // dispatch({
            //   type: 'ALERT',
            //   payload: {
            //     successful: true,
            //     message: 'Logged in successfully.',
            //   },
            // });
          }

        } else {
          dispatch({
            type: 'ALERT',
            payload: res,
          });
        }
      })
      .catch(() => {
        // send err to application
        dispatch({
          type: 'ALERT',
          payload: {
            message: 'Network request failed',
            successful: false,
          },
        });
      }).finally(() => {
        dispatch({
          type: 'LOADING',
          payload: false,
        });

      });
  };
};


export const signUp = (state: any) => {
  const authService = new AuthService();

  const api = authService.signUp(state);

  return (dispatch: any) => {
    api
      .then((res: any) => {
        const result = res;
        if (result.token) {
          // set auth
          Storage();

          // set authentication to true
          if (result.user.userType === 2 && !result.user.hasOnboarded) {
            dispatch({
              type: 'AUTH_TOKEN',
              payload: { auth_token: result.token, refresh_token: result.refresh_token },
            });
            // set logged in user state
            dispatch({
              type: 'USER',
              payload: result.user,
            });
            // send response to login screen
            dispatch({
              type: 'ALERT',
              payload: {
                successful: true,
                message: 'unverified',
              },
            });
          } else {
            // set authentication to true
            dispatch({
              type: 'AUTH_TOKEN',
              payload: { auth_token: result.token, refresh_token: result.refresh_token },
            });
            // set logged in user state
            dispatch({
              type: 'USER',
              payload: result.user,
            });

            dispatch({
              type: 'IS_LOGGED_IN',
              payload: { isLoggedIn: true },
            });

            // send response to login screen
            // dispatch({
            //   type: 'ALERT',
            //   payload: {
            //     successful: true,
            //     message: 'Logged in successfully.',
            //   },
            // });
          }
        } else {
          dispatch({
            type: 'ALERT',
            payload: res,
          });
        }
      })
      .catch(() => {
        // send err to application
        dispatch({
          type: 'ALERT',
          payload: {
            message: 'Network request failed',
            successful: false,
          },
        });
      });
  };
};


export const getUserDetails = (id: any, tokens: Tokens) => {
  const authService = new AuthService();

  const api = authService.getUser(id, tokens);

  return (dispatch: any) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {

          // set logged in user state
          dispatch({
            type: 'USER',
            payload: res.result,
          });
        } else {
          dispatch({
            type: 'ALERT',
            payload: res,
          });
        }
      })
      .catch(() => {
        // send err to application
        dispatch({
          type: 'ALERT',
          payload: {
            message: 'Network request failed',
            successful: false,
          },
        });
      }).finally(() => {
        dispatch({
          type: 'LOADING',
          payload: false,
        });

      });
  };
};


export const forgotPassword = (data: any) => {
  const api = new AuthService().forgotPassword(data);

  return (dispatch: any) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'ALERT',
            payload: {
              message: 'If the provided email is correct, we have sent you a password reset email',
              successful: true,
            }
          });
        } else {
          dispatch({
            type: 'ALERT',
            payload: res,
          });
        }
      })
      .catch(() => {
        // send err to application
        dispatch({
          type: 'ALERT',
          payload: {
            message: 'Network request failed',
            successful: false,
          },
        });
      }).finally(() => {
        dispatch({
          type: 'LOADING',
          payload: false,
        });

      });
  };
};

export const changePassword = (data: any, tokens: Tokens) => {
  const api = new AuthService().changePassword(data, tokens);

  return (dispatch: any) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'ALERT',
            payload: {
              message: 'Password changed successfully',
              successful: true,
            }
          });
        } else {
          dispatch({
            type: 'ALERT',
            payload: res,
          });
        }
      })
      .catch(() => {
        // send err to application
        dispatch({
          type: 'ALERT',
          payload: {
            message: 'Network request failed',
            successful: false,
          },
        });
      }).finally(() => {
        dispatch({
          type: 'LOADING',
          payload: false,
        });

      });
  };
};


export const resetPassword = (data: any) => {
  const api = new AuthService().resetPassword(data);

  return (dispatch: any) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {

          dispatch({
            type: 'ALERT',
            payload: {
              message: 'Password reset successfully. Login to continue',
              successful: true,
            }
          });
        } else {
          dispatch({
            type: 'ALERT',
            payload: res,
          });
        }
      })
      .catch(() => {
        // send err to application
        dispatch({
          type: 'ALERT',
          payload: {
            message: 'Network request failed',
            successful: false,
          },
        });
      }).finally(() => {
        dispatch({
          type: 'LOADING',
          payload: false,
        });

      });
  };
};

export const updateAccount = (data: any, tokens: Tokens) => {
  const api = new AuthService().updateUser(data, tokens);

  return (dispatch: any) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {

          // set logged in user state
          dispatch({
            type: 'USER',
            payload: res.result,
          });

          dispatch({
            type: 'ALERT',
            payload: {
              message: 'Account updated successfully',
              successful: true,
            }
          });
        } else {
          dispatch({
            type: 'ALERT',
            payload: res,
          });
        }
      })
      .catch(() => {
        // send err to application
        dispatch({
          type: 'ALERT',
          payload: {
            message: 'Network request failed',
            successful: false,
          },
        });
      }).finally(() => {
        dispatch({
          type: 'LOADING',
          payload: false,
        });

      });
  };
};

async function Storage() {
  await AsyncStorage.setItem('auth', 'true')
}