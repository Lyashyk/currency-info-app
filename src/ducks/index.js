import { combineReducers } from 'redux';

import table from './table';

const reducers = {
    table
};

const reducer = combineReducers(reducers);

export default reducer;