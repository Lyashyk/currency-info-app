import { createAction, genereteDefaultArr } from "../utils";
import api from "../api";

const initializeList = genereteDefaultArr(1, 12);

// Actions
const UPDATE_LIST = "SHEDULE/UPDATE_LIST";
const START_LOADING = "SHEDULE/START_LOADING";

export const startLoading = () => createAction(START_LOADING);

export const updateList = (listOfCurrencyList) =>
  createAction(UPDATE_LIST, { listOfCurrencyList });

export const requestList = () => (dispatch) => {
  dispatch(startLoading());

  let promiseList = initializeList.map(({ valcode, date }) =>
    api.headingForCurrenDateAndCurrentCurrency(valcode, date)
  );

  Promise.all(promiseList)
    .then((responses) => {
      dispatch(updateList(responses));
    })
    .catch((err) => {
      console.log("err", err);
    });
};

// Normilizers

const reduceList = (list) => list.reduce((acc, item) => [...acc, ...item], []);

const normilizeList = (list) =>
  list.map(({ exchangedate, rate }) => ({ date: exchangedate, rate }));

// State

const initialState = {
  list: [],
  isLoading: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case START_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case UPDATE_LIST: {
      const { listOfCurrencyList } = payload;

      return {
        isLoading: false,
        list: normilizeList(reduceList(listOfCurrencyList)),
      };
    }

    default:
      return state;
  }
};

// SELECTORS

export const getListOfCurrency = (state) => {
  if (!state?.shedule?.list) {
    return null;
  }

  return state.shedule.list;
};

export const getIsLoading = (state) => {
  if (!state?.shedule) {
    return null;
  }

  return state.shedule.isLoading;
};

export default reducer;
