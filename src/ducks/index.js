import { combineReducers } from 'redux';

import table from './table';
import converter from './converter'

const reducers = {
    table,
    converter
};

const reducer = combineReducers(reducers);

export default reducer;