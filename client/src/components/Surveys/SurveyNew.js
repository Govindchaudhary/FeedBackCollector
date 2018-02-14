//SurveyNew shows SurveyForm and SurveyFornReview

import React ,{Component} from 'react';
import {reduxForm} from 'redux-form';
import SurveyForm from './SurveyForm';

import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component{
    state = {showFormReview:false};
    renderContent() {
        if(this.state.showFormReview) {
            return <SurveyFormReview onCancel={()=>this.setState({showFormReview:false})}/> ;
        }
        return <SurveyForm onSurveySubmit={()=>this.setState({showFormReview:true})}/>;
    }
    render() {
        return(
            <div>
                {this.renderContent()}
            </div>
        );
    }
}
export default reduxForm({
    form:'surveyForm'  //specifies where redux-form store all the values out of form inside redux-store
})(SurveyNew);   //if SurveyNew is unmounted destroy formvalues which is the default behaviour