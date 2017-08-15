import { Action, ActionReducer } from '@ngrx/store';

export const INCREMENT_COUNTER = '[cart counter] INCREMENT_COUNTER';
export const DECREMENT_COUNTER = '[cart counter] DECREMENT_COUNTER';

const INITIAL_STATE = 0;

export function CartCountReducer(state: number = INITIAL_STATE, action: Action) {
//export const CartCountReducer: ActionReducer<number> = (state: number = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return state + 1;
        case DECREMENT_COUNTER:
            return state - 1;
        default:
            return state;
    }
}
