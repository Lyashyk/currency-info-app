import {
  createAction,
  readFromLocalStorige,
  writeToLocalStorige,
} from "../utils";
import api from "../api";

const DEFAULT_CHANGEABLE_CURRENCY_CODE = "UAH";
const DEFAULT_SELECT_CURRENCY_CODE = "USD";

// Actions

const UPDATE = "CONVERTER/UPDATE";
const START_LOADING = "CONVERTER/START_LOADING";
const SET_CHANGEABLE_CURRENCY_CODE = "CONVERTER/SET_CHANGEABLE_CURRENCY_CODE";
const SET_SELECT_CURRENCY_CODE = "CONVERTER/SET_SELECT_CURRENCY_CODE";
const SWAP_CURRENCY_CODE = "CONVERTER/SWAP_CURRENCY_CODE";

export const startLoading = () => createAction(START_LOADING);

const update = (currencyList) => createAction(UPDATE, { currencyList });

const setChangeableCurrencyCode = (code) =>
  createAction(SET_CHANGEABLE_CURRENCY_CODE, {
    changeableCurrencyCode: code,
  });

export const setChangeableCurrencyCodeCallback = (code) => (dispatch) => {
  writeToLocalStorige("changeable_currency_code", code);

  dispatch(setChangeableCurrencyCode(code));
};

export const setSelectCurrencyCode = (code) =>
  createAction(SET_SELECT_CURRENCY_CODE, { selectCurrencyCode: code });

export const setSelectCurrencyCodeCallback = (code) => (dispatch) => {
  writeToLocalStorige("select_currency_code", code);

  dispatch(setSelectCurrencyCode(code));
};

const swapCarrencyCode = () => createAction(SWAP_CURRENCY_CODE);

export const swapCurrencyCodeCallback = () => (dispatch, getState) => {
  const { converter } = getState();

  const { changeableCurrencyCode, selectCurrencyCode } = converter;

  writeToLocalStorige("changeable_currency_code", selectCurrencyCode);

  writeToLocalStorige("select_currency_code", changeableCurrencyCode);

  dispatch(swapCarrencyCode());
};

export const request = () => (dispatch) => {
  dispatch(startLoading());

  api
    .headingForDate()
    .then((list) => {
      dispatch(update(list));
    })
    .catch((err) => {
      console.log("err", err);
    });
};

// Normilizers

const normlizeList = (list) => list.map(({ cc, rate }) => ({ code: cc, rate }));

const updateListByUah = (list) => [{ code: "UAH", rate: 1 }, ...list];

// State

const initialState = {
  list: [],
  isLoading: false,
  changeableCurrencyCode:
    readFromLocalStorige("changeable_currency_code") ||
    DEFAULT_CHANGEABLE_CURRENCY_CODE,
  selectCurrencyCode:
    readFromLocalStorige("select_currency_code") ||
    DEFAULT_SELECT_CURRENCY_CODE,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case START_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case UPDATE: {
      const { currencyList } = payload;

      return {
        ...state,
        isLoading: false,
        list: updateListByUah(normlizeList(currencyList)),
      };
    }

    case SET_CHANGEABLE_CURRENCY_CODE: {
      const { changeableCurrencyCode } = payload;

      return {
        ...state,
        changeableCurrencyCode,
      };
    }

    case SET_SELECT_CURRENCY_CODE: {
      const { selectCurrencyCode } = payload;

      return {
        ...state,
        selectCurrencyCode,
      };
    }

    case SWAP_CURRENCY_CODE: {
      const _changeableCurrencyCode = state.changeableCurrencyCode;
      const _selectCurrencyCode = state.selectCurrencyCode;

      return {
        ...state,
        changeableCurrencyCode: _selectCurrencyCode,
        selectCurrencyCode: _changeableCurrencyCode,
      };
    }

    default:
      return state;
  }
};

// SELECTORS

export const getList = (state) => state.converter.list;

export const getIsLoading = (state) => state.converter.isLoading;

export const getChangeableCurrencyCode = (state) =>
  state.converter.changeableCurrencyCode;

export const getSelectCurrencyCode = (state) =>
  state.converter.selectCurrencyCode;

export const getItemByChangeableCurrencyCode = (state) => {
  const list = getList(state);
  const code = getChangeableCurrencyCode(state);

  if (list.length < 2) {
    return null;
  }

  const searchItem = list.find((item) => item.code === code);

  if (!searchItem) {
    return list[0];
  }

  return searchItem;
};

export const getItemBySelectCurrencyCode = (state) => {
  const list = getList(state);
  const code = getSelectCurrencyCode(state);

  if (list.length < 2) {
    return null;
  }

  const searchItem = list.find((item) => item.code === code);

  if (!searchItem) {
    return list[1];
  }

  return searchItem;
};

export default reducer;
