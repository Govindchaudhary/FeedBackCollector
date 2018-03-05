import React ,{Component} from 'react';
import _ from 'lodash';
import {reduxForm,Field} from 'redux-form';
import {Link} from 'react-router-dom';

import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

//reduxForm(nearly identical to connect) allows communicate our component to the redux store


class SurveyForm extends Component{
    renderFields() {
        return _.map(formFields, ({ label, name }) => {
            return (
              <Field
                key={name}
                component={SurveyField}
                type="text"
                label={label}
                name={name}
              />
            );
          });
    }
    render() { //handle submit calls onSurveySubmit whenevr we submit the form successfully
        return(
            <div class="container" style={{marginTop:"30px"}}>
            <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
               {this.renderFields()}
               <Link to="/surveys" className="red btn-flat white-text">
               Cancel
               </Link>
                <button type="submit" className="teal btn-flat right white-text">
               Next
                <i className="material-icons right">done</i></button>
                </form>
            </div>
        );
    }
}
const validate = (values) => {
    const errors ={};
    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({ name }) => {
      if (!values[name]) {
        errors[name] = 'You must provide a value';
      }
    });
    return errors;

}
export default reduxForm({
    validate:validate,  //run automaticaly  any time we submit the form with the values object
    form:'surveyForm',
    destroyOnUnmount:false 
})(SurveyForm);