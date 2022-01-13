import { combineReducers } from 'redux';
import {reducer as formReducer } from 'redux';

export default combineReducers({
    form: formReducer
})