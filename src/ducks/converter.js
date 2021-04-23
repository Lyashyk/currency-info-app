import { createAction } from "../utils";
import api from '../api';

// Actions

const UPDATE = "CONVERTER/UPDATE";
const START_LOADING = "CONVERTER/START_LOADING";


export const startLoading = () => createAction(START_LOADING);

export const update = (currencyList) => createAction(UPDATE, { currencyList });

export const request = () => dispatch => {
    dispatch(startLoading());

    api
        .headingForDate()
        .then(list => {
            dispatch(update(list));
        })
        .catch(err => {
            console.log('err', err);
        });
}

// Normilizers

const normlizeList = list => list.map(({ cc, rate }) => ({ code: cc, rate }));

const updateListByUah = list => [{ code: 'UAH', rate: 1 }, ...list]

// State

const initialState = {
    list: [],
    isLoading: false,
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case START_LOADING: {
            return {
                ...state,
                isLoading: true
            }
        }

        case UPDATE: {
            const { currencyList } = payload;

            return {
                isLoading: false,
                list: updateListByUah(normlizeList(currencyList))
            };
        }

        default:
            return state;
    }
};

// SELECTORS

export const getList = state => {
    if (!(state?.converter?.list)) {
        return null;
    }

    return state.converter.list;
}

export const getIsLoading = state => {
    if (!(state?.converter?.isLoading)) {
        return null;
    }

    return state.converter.isLoading;
}

export default reducer;