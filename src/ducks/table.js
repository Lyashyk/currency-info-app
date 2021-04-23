import { createAction, dateToRequestString, readFromLocalStorige, getСurrentDate } from "../utils";
import api from '../api';


// Actions
const UPDATE_TABLE = "TABLE/UPDATE_TABLE";
const START_LOADING = "TABLE/START_LOADING";
const SET_CURRENT_DATE = 'TABLE/SET_CURRENT_DATE';

export const startLoading = () => createAction(START_LOADING);

export const updateTable = (date, currencyList) => createAction(UPDATE_TABLE, { date, currencyList });

export const setCurrentDate = date => createAction(SET_CURRENT_DATE, { date });

export const requestTable = date => dispatch => {
    dispatch(startLoading());

    api
        .headingForDate(dateToRequestString(date))
        .then(data => {
            dispatch(setCurrentDate(date));

            dispatch(updateTable(date, data));

        })
        .catch(err => {
            console.log('err', err);
        });

};


// Normilizers

const normilizeList = list => list.map(({ cc, txt, rate }) => ({ code: cc, title: txt, rate }));




// State

const initialState = {
    currencyRate: {},
    isTableLoading: false,
    currentDate: readFromLocalStorige('selected_date') || getСurrentDate()
};

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case SET_CURRENT_DATE: {
            const { date } = payload;

            return {
                ...state,
                currentDate: date
            }
        }

        case START_LOADING: {
            return {
                ...state,
                isTableLoading: true
            }
        }

        case UPDATE_TABLE: {
            const { date, currencyList } = payload;

            return {
                ...state,
                currencyRate: {
                    ...state.currencyRate,
                    [date]: normilizeList(currencyList)
                },
                isTableLoading: false
            };
        }

        default:
            return state;
    }
};

// SELECTORS

export const getIsTableLoading = state => {
    if (!(state?.table?.isTableLoading)) {
        return null;
    }

    return state.table.isTableLoading;
};

export const getTableCurrentDate = state => {
    if (!(state?.table?.currentDate)) {
        return null;
    }

    return state.table.currentDate;
};

export const getDataByCarrentDate = state => {
    if (!(state?.table?.currentDate) || !(state?.table?.currencyRate)) {
        return null;
    }

    return state.table.currencyRate[state.table.currentDate];
};



export default reducer;