import ArtisanService from '../../Services/ArtisanService';
import { Pagination, Artisans, ResponseDetails, Tokens } from '../../Interfaces/interface';
import { Dispatch } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';


export const createArtisan = (state: Artisans, token: Tokens) => {
  const api = new ArtisanService().createArtisan(state, token);

  return (dispatch: Dispatch) => {
    api
      .then((res: ResponseDetails) => {
        const result = res;
        if (result.successful) {
          dispatch({
            type: 'ALERT',
            payload: {
              message: 'Artisan added successfully',
              successful: true,
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
      }).finally(() => {
        dispatch({
          type: 'LOADING',
          payload: false,
        });

      });
  };
};

export const getArtisans = (state: Pagination, tokens: Tokens) => {
  const api = new ArtisanService().getArtisans(state, tokens);

  return (dispatch: Dispatch) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'GET_ARTISANS',
            payload: res,
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

export const getArtisanDetails = (id: string, tokens: Tokens) => {
  const api = new ArtisanService().getArtisanDetails(id, tokens);

  return (dispatch: Dispatch) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'GET_ARTISAN',
            payload: res,
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

export const artisanOnboarding = (state: any) => {
  const api = new ArtisanService().onboardArtisan(state);


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

            dispatch({
              type: 'IS_LOGGED_IN',
              payload: { isLoggedIn: true },
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

export const verifyEmail = (data: any) => {
  const api = new ArtisanService().verifyEmail(data);

  return (dispatch: any) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'ALERT',
            payload: {
              message: res.message,
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

export const confirmEmail = (data: any) => {
  const api = new ArtisanService().confirmEmail(data);

  return (dispatch: any) => {
    api
      .then((res: any) => {
        const result = res;
        if (result.token) {
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
          // send response to login screen
          dispatch({
            type: 'ALERT',
            payload: {
              successful: true,
              message: 'Logged in successfully.',
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
      }).finally(() => {
        dispatch({
          type: 'LOADING',
          payload: false,
        });

      });
  };
};

export const updateBusiness = (data: any, tokens: Tokens) => {
  const api = new ArtisanService().updateBusiness(data, tokens);

  return (dispatch: any) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'ALERT',
            payload: {
              message: 'Business information updated successfully',
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

export const updateNextOfKin = (data: any, tokens: Tokens) => {
  const api = new ArtisanService().updateNextOfKin(data, tokens);

  return (dispatch: any) => {
    api
      .then((res: any) => {
        const result = res;
        if (result.token) {
          sessionStorage.setItem('auth', 'true');
          sessionStorage.setItem('userType', JSON.stringify(result.userType));

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
          // send response to login screen
          dispatch({
            type: 'ALERT',
            payload: {
              successful: true,
              message: 'Logged in successfully.',
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
      }).finally(() => {
        dispatch({
          type: 'LOADING',
          payload: false,
        });

      });
  };
};

export const updateAccount = (data: any, tokens: Tokens) => {
  const api = new ArtisanService().updateArtisan(data, tokens);

  return (dispatch: any) => {
    api
      .then((res: ResponseDetails) => {
        
        if (res.successful) {
          dispatch({
            type: 'ALERT',
            payload: {
              message: 'Account updated successfully',
              successful: true,
            }
          });

          dispatch({
            type: 'IS_LOGGED_IN',
            payload: { isLoggedIn: true },
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