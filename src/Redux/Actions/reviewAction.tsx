import ReviewService from '../../Services/ReviewService';
import { Pagination, Reviews, ResponseDetails, Tokens } from '../../interfaces/interface';
import { Dispatch } from 'redux';

export const createReviews = (state: Reviews, token: Tokens) => {
  const api = new ReviewService().createReviews(state, token);

  return (dispatch: Dispatch) => {
    api
      .then((res: ResponseDetails) => {
        const result = res;
        if (result.successful) {
          dispatch({
            type: 'ALERT',
            payload: {
              message: 'Review submitted successfully',
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

export const getReviews = (state: Pagination, token: Tokens) => {
  const api = new ReviewService().getReviews(state, token);

  return (dispatch: Dispatch) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'GET_REVIEWS',
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

export const getReviewDetails = (id: string, token: Tokens) => {
  const api = new ReviewService().getReviewDetails(id, token);

  return (dispatch: Dispatch) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'GET_REVIEW',
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

export const updateReview = (data: Reviews, token: Tokens) => {
  const api = new ReviewService().updateReview(data, token);

  return (dispatch: Dispatch) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'UPDATE_REVIEW',
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

export const deleteReview = (id: string, token: Tokens) => {
  const api = new ReviewService().deleteReview(id, token);

  return (dispatch: Dispatch) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'DELETE_REVIEW',
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
