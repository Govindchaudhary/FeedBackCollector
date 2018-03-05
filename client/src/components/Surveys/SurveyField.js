import React from 'react';

const SurveyField = (props) => {
 // {...props.input} equivalent to onBlur={props.input.onBlur} onChange={this.input.onChange} and so on
   console.log(props.meta); //contains an error pty and also contains a touched pty
   //by default whenevr redux-form renders it is assumed to be invalid validate run and error apper on screen
    return(
        <div>
            <div class="form-group">
            <label>{props.label}</label>
            <input {...props.input}  style ={{marginBottom:'5px'}}/>
            </div>
            <div className="red-text" style ={{marginBottom:'20px'}}>
            {props.meta.touched && props.meta.error} 
            </div>   
        </div>

    )
};

export default SurveyField