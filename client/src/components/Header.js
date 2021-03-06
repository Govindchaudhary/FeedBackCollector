import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    renderContent() {
       

        switch(this.props.user) {
            case null:
              return ;
            case false:
             return <li><a href="/auth/google"> Login With Google</a></li>;
            default:
            return [
             <li key="1"> <Payments/></li>,
             <li key="3" style= {{margin:'0 10px'}}> Credits:{this.props.user.credits}</li>,
            <li key="2"><a className="orange btn-flat white-text" href="/api/logout" > Logout</a></li>,
            
            ];
        }
}
    render() {
        
        
       return(
           <nav className="blue-grey " style={{height:'80px'}}>
             
               <div className="nav-wrapper">
                   <Link  to ={this.props.user?"/surveys":"/"} className="left brand-logo" style= {{margin:'0 10px'}} >
                     
                     <spam style={{color:'#ffb74d'}}>Emaily</spam>
                    </Link>
                    <ul className = "right">
                        {this.renderContent()}
                    </ul>
                </div>
           </nav>
       )
    }
}

const mapStateToProps =(store)=> {
    return({
        user:store.auth,
        

    });
}
export default connect(mapStateToProps) (Header);