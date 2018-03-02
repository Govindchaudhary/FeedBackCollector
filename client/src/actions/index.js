import axios from 'axios';

export const fetchUser = () => {
   return async (dispatch) => {
     const user = await  axios.get('/api/current_user');
     dispatch({type:'FETCH_USER', payload:user.data})
    }
};

export const  handleToken = (token)=>{
  return async (dispatch)=> {
    //backend server sends back user with updated nuber of credits
    const res = await axios.post('/api/stripe',token);
    dispatch({type:'FETCH_USER',payload:res.data});
  }

};

export const submitSurvey = (values,history) => {
  return async (dispatch)=> {
    //backend server sends back user with updated nuber of credits
    const res = await axios.post('/api/surveys',values);
    history.push('/surveys');
    dispatch({type:'FETCH_USER',payload:res.data});
  }

};
export const fetchSurveys = ()=> async dispatch => {
  const res = await axios.get('/api/surveys');
  dispatch({type:'FETCH_SURVEYS',payload:res.data});



}