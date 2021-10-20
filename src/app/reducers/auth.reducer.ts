import { createReducer, on } from '@ngrx/store';
import { setUser, unSetUser} from '../actions/auth.actions';
import { Usuario } from "../auth/interfaces/interfaces";
import {Area} from "../auth/interfaces/interfaces";

export interface State {
  auth: Usuario;
}

export const initialState: State = {
  auth: null!,
}

const _authReducer = createReducer(initialState,

  on( setUser, (state, { user }) => ({ ...state, auth: { uid:user.uid, name:user.name, email:user.email, token: user.token, areas: user.areas }  })),
  on( unSetUser, state => ({ ...state, auth: null! })),

);

export function authReducer(state:any, action:any) {
  return _authReducer(state, action);
}
