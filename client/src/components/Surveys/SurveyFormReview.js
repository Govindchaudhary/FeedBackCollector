import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import _ from 'lodash';
import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = (props) => {
    const reviewFields = _.map(formFields,(field)=>{
        return (
            <div key={field.name}  >
                <spam style={{color:"#212121"}}><label>{field.label}</label></spam>
                <div style={{marginBottom:"10px"}}>
                    {props.formValues[field.name]}
                </div>
            </div>
        )
    })
    return(
        <div class="container" style={{marginTop:"40px"}}>
           <spam style={{color:"#006064",textAlign:"center"}}><h5> please confirm your entries</h5></spam>
           <div style={{marginTop:"25px",backgroundColor:"#f5f5f5",height:"215px"}}>
           <div style={{margin:"10px"}}>
            {reviewFields}
           </div>
           </div>
           <div style={{marginTop:"30px"}}>
           <button
            className="yellow darken-3 btn-flat white-text"
            onClick= {props.onCancel} >
            Back
           </button>
           <button
            className="green btn-flat right white-text"
            onClick= {()=> props.submitSurvey(props.formValues,props.history)}>
            Send Survey
            
            <i className="material-icons right ">email</i>
           </button>
           </div>
        </div>

    )
}
const mapStateToProps = (store)=> {
    console.log(store)
    return ({
        formValues:store.form.surveyForm.values
    });
}
export default connect(mapStateToProps,actions)(withRouter(SurveyFormReview));