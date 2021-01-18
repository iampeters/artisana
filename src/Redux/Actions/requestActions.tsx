import RequestService from "../../Services/RequestService";
import { Pagination, ResponseDetails, Tokens } from "../../interfaces/interface";
import { Dispatch } from "redux";

export const getRequests = (state: Pagination, tokens: Tokens) => {
  const api = new RequestService().getRequests(state, tokens);

  return (dispatch: Dispatch) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'GET_REQUESTS',
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

export const getRequestDetails = (id: any, tokens: Tokens) => {
  const api = new RequestService().getRequestDetails(id, tokens);

  return (dispatch: Dispatch) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'GET_REQUESTS_DETAILS',
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

export const assignRequest = (state: any, tokens: Tokens) => {
  const api = new RequestService().assignRequest(state, tokens);

  return (dispatch: Dispatch) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'ALERT',
            payload: {
              message: 'Job assigned successfully',
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

export const cancelRequest = (state: any, tokens: Tokens) => {
  const api = new RequestService().cancelRequest(state, tokens);

  return (dispatch: Dispatch) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'ALERT',
            payload: {
              message: 'Job request cancelled successfully',
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

export const acceptRequest = (state: any, tokens: Tokens) => {
  const api = new RequestService().acceptRequest(state, tokens);

  return (dispatch: Dispatch) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'ALERT',
            payload: {
              message: 'Job request accepted successfully',
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

export const rejectRequest = (state: any, tokens: Tokens) => {
  const api = new RequestService().rejectRequest(state, tokens);

  return (dispatch: Dispatch) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'ALERT',
            payload: {
              message: 'Job request declined',
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


export const timeoutRequest = (state: any, tokens: Tokens) => {
  const api = new RequestService().timeoutRequest(state, tokens);

  return (dispatch: Dispatch) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'ALERT',
            payload: {
              message: 'Job request timed out',
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