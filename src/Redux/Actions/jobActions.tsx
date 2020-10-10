import JobService from "../../Services/JobService";
import { Pagination, ResponseDetails, Tokens } from "../../interfaces/interface";
import { Dispatch } from "redux";

export const getJobs = (state: Pagination, tokens: Tokens) => {
  const api = new JobService().getJobs(state, tokens);

  return (dispatch: Dispatch) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'GET_JOBS',
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

export const getJobDetails = (id: any, tokens: Tokens) => {
  const api = new JobService().getJobDetails(id, tokens);

  return (dispatch: Dispatch) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'GET_JOBS_DETAILS',
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

export const createJob = (state: any, tokens: Tokens) => {
  const api = new JobService().createJob(state, tokens);

  return (dispatch: Dispatch) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'ALERT',
            payload: {
              message: 'Job created successfully',
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

export const completeJob = (id: any, tokens: Tokens) => {
  const api = new JobService().completeJob(id, tokens);

  return (dispatch: Dispatch) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'ALERT',
            payload: {
              message: 'Job created successfully',
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