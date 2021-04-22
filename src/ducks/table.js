import { createAction, dateToRequestString, readFromLocalStorige, getСurrentDate } from "../utils";
import api from '../api';


// Actions
const UPDATE_TABLE = "TABLE/UPDATE_TABLE";
const START_LOADING = "TABLE/START_LOADING";
const SET_CURRENT_DATE = 'TABLE/SET_CURRENT_DATE'

export const startLoading = () => createAction(START_LOADING)

export const updateTable = (date, arrOfСurrency) => createAction(UPDATE_TABLE, { date, arrOfСurrency });

export const setCurrentDate = date => createAction(SET_CURRENT_DATE, { date });

export const requestTable = (date) => {
    return dispatch => {
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

    }
}



// State
const initialState = {
    table: {},
    isTableLoading: false,
    currentDate: readFromLocalStorige('selected_date') || getСurrentDate()
}

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

        default:
            return state;

        case UPDATE_TABLE: {
            const { date, arrOfСurrency } = payload;

            return {
                ...state,
                table: {
                    ...state.table,
                    [date]: arrOfСurrency
                },
                isTableLoading: false
            };
        }
    }
};

// SELECTORS

export const getTable = state => {
    if (!(state?.table?.table)) {
        return null;
    }

    return state.table.table;
}

export const getIsTableLoading = state => {
    if (!(state?.table?.isTableLoading)) {
        return null;
    }

    return state.table.isTableLoading;
}

export const getTableCurrentDate = state => {
    if (!(state?.table?.currentDate)) {
        return null;
    }

    return state.table.currentDate;
}

export const getDataByCurrentDate = currentDate => state => {
    if (!(state?.table?.table?.[currentDate])) {
        return null;
    }

    return state.table.table[currentDate];
}


export default reducer;