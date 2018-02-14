import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = (props) => {
    const reviewFields = _.map(formFields,(field)=>{
        return (
            <div key={field.name}>
                <label>{field.label}</label>
                <div>
                    {props.formValues[field.name]}
                </div>
            </div>
        )
    })
    return(
        <div>
           <h5> please confirm your entries</h5>
           {reviewFields}
           <button
            className="yellow darken-3 btn-flat white-text"
            onClick= {props.onCancel} >
            Back
           </button>
           <button
            className="green btn-flat right white-text"
            onClick= {()=> props.submitSurvey(props.formValues)}>
            Send Survey
            
            <i className="material-icons right ">email</i>
           </button>
        </div>

    )
}
const mapStateToProps = (store)=> {
    console.log(store)
    return ({
        formValues:store.form.surveyForm.values
    });
}
export default connect(mapStateToProps,actions)(SurveyFormReview);