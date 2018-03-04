export const surveyReducer = (state = [],action) => {
    switch (action.type) {
        case 'FETCH_SURVEYS':
           return action.payload;
        default:
          return state;

    }
}