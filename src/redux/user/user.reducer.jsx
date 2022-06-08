import React from 'react';

const INITIAL_STATE = {
    currentUser:null
}

const userReducer = (state=INITIAL_STATE, action) => {
   switch (action.type){
       case 'SET_CURRENT_USER':
       default:
           return state
   }
};

export default userReducer;