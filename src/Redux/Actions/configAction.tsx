import ConfigService from "../../Services/ConfigService";
import { ResponseDetails, Tokens } from "../../interfaces/interface";
import NotificationService from "../../Services/NotificationService";

export const fileUpload = (state: FormData, token: Tokens) => {
  const api = new ConfigService().fileUpload(state, token);

  return (dispatch: any) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'FILE_UPLOAD',
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

export const getArtisanDashboard = (token: Tokens) => {
  const api = new ConfigService().getArtisanDashboard(token);

  return (dispatch: any) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'DASHBOARD',
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


export const getUserDashboard = (token: Tokens) => {
  const api = new ConfigService().getUserDashboard(token);

  return (dispatch: any) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'DASHBOARD',
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
export const getNotifications = (id: any, token: Tokens) => {
  const api = new NotificationService().getNotifications(id, token);

  return (dispatch: any) => {
    api
      .then((res: ResponseDetails) => {        
        if (res.successful) {
          dispatch({
            type: 'NOTIFICATIONS',
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