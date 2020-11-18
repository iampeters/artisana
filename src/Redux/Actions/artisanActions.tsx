import ArtisanService from '../../Services/ArtisanService';
import { Pagination, Artisans, ResponseDetails, Tokens } from '../../Interfaces/interface';
import { Dispatch } from 'redux';


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