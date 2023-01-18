import { ADDITION, SUBTRACTION, SHEDULEVISIBLE } from './actiontype';

const initialState = {
  counter: 0,
  booleanValue: false
};

export const mainReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADDITION:
      return { ...state, counter: state.counter + 1 };

    case SUBTRACTION:
      return { ...state, counter: state.counter - 1 };

    case SHEDULEVISIBLE:
      return {
        ...state,
        booleanValue: action.payload
      };

    default:
      return state;
  }

}

