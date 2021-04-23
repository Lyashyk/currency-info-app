import { combineReducers } from 'redux';

import table from './table';
import converter from './converter';
import shedule from './shedule';

const reducers = {
    table,
    converter,
    shedule
};

const reducer = combineReducers(reducers);

export default reducer;