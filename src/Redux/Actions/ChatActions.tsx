import { Dispatch } from "redux";
import { Pagination, ResponseDetails, Tokens } from "../../Interfaces/interface";
import AuthService from "../../Services/AuthService";
import ChatService from "../../Services/ChatService";
import NotificationService from "../../Services/NotificationService";

export const getActiveChats = (state: Pagination, token: Tokens) => {
  const api = new ChatService().getActiveChats(state, token);

  return (dispatch: Dispatch) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'GET_ACTIVE_CHATS',
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

export const getChats = (state: Pagination, userId: string, token: Tokens) => {
  const api = new ChatService().getChats(state, userId, token);

  return (dispatch: Dispatch) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {

          dispatch({
            type: 'GET_CHATS',
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

export const sendMessage = (data: any, token: Tokens) => {
  const api = new ChatService().createChat(data, token);

  return (dispatch: Dispatch) => {
    api
      .then((res: any) => {
        
        if (res.successful) {
          dispatch({
            type: 'ALERT',
            payload: {
              message: 'Message sent',
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


export const getChatUserDetails = (id: any, token: Tokens) => {
  const api = new AuthService().getUser(id, token);

  return (dispatch: any) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {

          // set logged in user state
          dispatch({
            type: 'CHAT_USER',
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


export const markAsRead = (state: any, token: Tokens) => {
  const api = new NotificationService().markAsRead(state, token);

  return (dispatch: Dispatch) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'MARK_AS_READ',
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
}