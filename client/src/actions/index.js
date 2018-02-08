import axios from 'axios';

export const fetchUser = () => {
   return async (dispatch) => {
     const user = await  axios.get('/api/current_user');
     dispatch({type:'FETCH_USER', payload:user.data})
    }
}