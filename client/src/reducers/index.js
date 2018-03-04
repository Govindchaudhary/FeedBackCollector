import {combineReducers} from 'redux';
import {reducer as reduxForm} from 'redux-form';
import {authReducer} from './authReducer';
import {surveyReducer} from './surveyReducer';

export const allReducers= combineReducers({
    auth:authReducer,
    form:reduxForm,
    surveys:surveyReducer
    
});