import { ADDITION,SUBTRACTION ,TODOLIST,SHEDULEVISIBLE} from './actiontype';

export const addition =()=>({
  type:ADDITION
})

export const subtraction =()=>({
  type:SUBTRACTION
})

export const todolist =(task)=>({
  type:TODOLIST
})

export const setSheduleVisible =(value)=>({
  type:SHEDULEVISIBLE,
  payload: value
})