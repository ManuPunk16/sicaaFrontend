import { createAction, props } from '@ngrx/store';
import {Usuario} from "../auth/interfaces/interfaces";

export const setUser = createAction( '[Auth] setUser', props<{ user: Usuario }>() );
export const unSetUser = createAction('[Auth] unSetUser');
