import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions'

class SurveyList extends Component {
    
    componentDidMount() {
        this.props.fetchSurveys();
    }
    

    renderSurveys() {
        return this.props.surveys.reverse().map(survey => {
          return (
           
            <div className="row" >
            <div className="col s12 m6">
            <div className="card blue-grey darken-2" key={survey._id}>
              <div className="card-content white-text">
                <span className="card-title">{survey.title}</span>
                <p>
                  {survey.body}
                </p>
                <p className="right">
                  Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                </p>
              </div>
              <div className="card-action">
                <a>Yes: {survey.yes}</a>
                <a>No: {survey.no}</a>
              </div>
            </div>
            </div>
            </div>
            
          );
        });
      }
      render() {
        const str =this.props.profile ;
        const myStr = str.replace(str.slice(-2),"150")
        return (
          <div className="row">

      <div className="col s3" style={{background:"#f5f5f5"}} >
         
         <div style={{marginTop:"40px",marginLeft:"70px"}}>
            <img src={myStr}  style={{borderRadius:"8px"}} />
            <spam ><p><strong>{this.props.userName}</strong></p></spam>
            <div className="divider"></div>
            <div >
             <p style={{fontSize:"12px"}}>credits:{this.props.Credits}</p>
            </div>
            <div className="divider"></div>

          <div >
             <p style={{fontSize:"12px"}}>Settings</p>
         </div>
         <div></div>
         </div>
      </div>

      <div class="col s9">
        {this.renderSurveys()}
      </div>

    </div>
        );
      }
    }

const mapStateToProps = (store) => {
    return({
            surveys:store.surveys,
           userName:store.auth.userName,
           profile:store.auth.profile,
           Credits:store.auth.credits
            
        });
};
export default connect(mapStateToProps,actions)(SurveyList);