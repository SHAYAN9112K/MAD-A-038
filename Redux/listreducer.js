import { TODOLIST} from './actiontype';
import React, { useState } from 'react';

const initialState ={
  tasklist:[]
};

export const mainReducer =(state=initialState,action)=>{

  switch(action.type){
    case TODOLIST:
      return{...state,counter:state.counter + 1};

    default:
      return state;
  }

}

