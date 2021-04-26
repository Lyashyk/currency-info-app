import {
  createAction,
  dateToRequestString,
  getСurrentDate,
  readFromLocalStorige,
  writeToLocalStorige,
  toggleElementFromList,
} from "../utils";
import api from "../api";

// Actions
const UPDATE_TABLE = "TABLE/UPDATE_TABLE";
const START_LOADING = "TABLE/START_LOADING";
const SET_CURRENT_DATE = "TABLE/SET_CURRENT_DATE";
const UPDATE_FAVORITES_LIST = "TABLE/TOGGLE_FAVORITE_CURRENCY";

export const startLoading = () => createAction(START_LOADING);

export const updateTable = (date, currencyList) =>
  createAction(UPDATE_TABLE, { date, currencyList });

export const setCurrentDate = (date) =>
  createAction(SET_CURRENT_DATE, { date });

export const updateFavoaritesList = (list) =>
  createAction(UPDATE_FAVORITES_LIST, { list });

export const requestTable = (date) => (dispatch) => {
  dispatch(startLoading());

  api
    .headingForDate(dateToRequestString(date))
    .then((data) => {
      dispatch(setCurrentDate(date));

      dispatch(updateTable(date, data));
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const toggleFavoriteCurrency = (code) => (dispatch) => {
  dispatch(startLoading());

  const currentFavoriteListByLS = readFromLocalStorige("favorite_list");

  const resultList = toggleElementFromList(currentFavoriteListByLS, code);

  writeToLocalStorige("favorite_list", resultList);

  dispatch(updateFavoaritesList(resultList));
};

// Normilizers
const normilizeList = (list) =>
  list.map(({ cc, txt, rate }) => ({
    code: cc,
    title: txt,
    rate,
    isFavorite: false,
  }));

// State

const initialState = {
  currencyRate: {},
  isTableLoading: false,
  currentDate: getСurrentDate(),
  favoriteList: readFromLocalStorige("favorite_list") || [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_DATE: {
      const { date } = payload;

      return {
        ...state,
        currentDate: date,
      };
    }

    case START_LOADING: {
      return {
        ...state,
        isTableLoading: true,
      };
    }

    case UPDATE_TABLE: {
      const { date, currencyList } = payload;

      return {
        ...state,
        currencyRate: {
          ...state.currencyRate,
          [date]: normilizeList(currencyList),
        },
        isTableLoading: false,
      };
    }

    case UPDATE_FAVORITES_LIST: {
      const { list } = payload;

      return {
        ...state,
        favoriteList: list,
        isTableLoading: false,
      };
    }

    default:
      return state;
  }
};

// SELECTORS

const getTable = (state) => state.table.currencyRate;

export const getIsLoading = (state) => state.table.isTableLoading;

export const getCurrentDate = (state) => state.table.currentDate;

const getFavoritesList = (state) => state.table.favoriteList;

export const getDataByCarrentDate = (state) => {
  const table = getTable(state);

  const currentDate = getCurrentDate(state);

  if (!table[currentDate]) {
    return null;
  }

  return table[currentDate];
};

export const getFavoritesCarrencyList = (state) => {
  const currencyList = getDataByCarrentDate(state);

  const favoritesList = getFavoritesList(state);

  if (favoritesList.length < 0 || !currencyList) {
    return null;
  }

  const favoritesCarrencyList = currencyList.filter(({ code }) =>
    favoritesList.find((item) => item === code)
  );

  if (!favoritesCarrencyList || favoritesCarrencyList.length < 1) {
    return null;
  }

  return favoritesCarrencyList;
};

export const getUnremarkableCurrencyList = (state) => {
  const currencyList = getDataByCarrentDate(state);

  const favoritesList = getFavoritesList(state);

  if (favoritesList.length < 0 || !currencyList) {
    return null;
  }

  const unremarkableCarrencyList = currencyList.filter(
    ({ code }) => !favoritesList.find((item) => item === code)
  );

  if (!unremarkableCarrencyList || unremarkableCarrencyList.length < 1) {
    return null;
  }

  return unremarkableCarrencyList;
};

export default reducer;
