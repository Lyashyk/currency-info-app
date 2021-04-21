import { createAction } from "./utils";

// Actions
const IS_TABLE_UPDATE = "TABLE/IS_TABLE_LOADED";

export const actions = {
    updateTable: () => createAction(IS_TABLE_UPDATE),
};

// State
const initialState = {
    table: {}
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case IS_TABLE_UPDATE: {

            return state;
        }

        default:
            return state;
    }
};

// SELECTORS

export const getTable = state => {
    return state.numbers
};

export default reducer;