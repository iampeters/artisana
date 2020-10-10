import CategoryService from "../../Services/CategoryService";
import { Pagination, ResponseDetails, Tokens } from "../../interfaces/interface";
import { Dispatch } from "redux";

export const getCategory = (state: Pagination, tokens: Tokens) => {
  const api = new CategoryService().getCategory(state, tokens);

  return (dispatch: Dispatch) => {
    api
      .then((res: ResponseDetails) => {
        if (res.successful) {
          dispatch({
            type: 'GET_CATEGORY',
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