import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { History } from 'history';

import { AppThunk } from '../../app/store';
import { Credentials, LoggedUser } from '../../model/auth';
import { IUser } from '../../model/user.model';
import AuthService from '../../service/auth-service';
import { getErrorMessage } from '../../service/service-utils';

interface AuthState {
  loggedUser: IUser | undefined;
  token: string | undefined;
  loading: boolean;
  error: string | undefined;
  requestedUrl: string | undefined;
}

const loggedUserStr = localStorage.getItem('loggedUser');
let loggedUser: LoggedUser | null = null;
if (loggedUserStr) {
  loggedUser = JSON.parse(loggedUserStr) as LoggedUser;
}
console.log(`Restoring logged user: ${loggedUser}`);

const initialState: AuthState = {
  loggedUser: loggedUser?.user,
  token: loggedUser?.token,
  loading: false,
  error: undefined,
  requestedUrl: undefined,
}


const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    requestedProtectedResource(state, action: PayloadAction<string>) {
      state.requestedUrl = action.payload;
    },
    loginStart(state) {
      state.loading = true;
      state.error = undefined;
    },
    loginSuccess(state, action: PayloadAction<LoggedUser>) {
      state.loggedUser = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = undefined;
      localStorage.setItem('loggedUser',  JSON.stringify({"user": action.payload.user, "token": action.payload.token}));
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  }
})

export const {
  requestedProtectedResource,
  loginStart,
  loginSuccess,
  loginFailure,
} = auth.actions
export default auth.reducer


export const submitLogin = (credentials: Credentials, history: History<History.PoorMansUnknown>): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(loginStart())
    const loggedUser = await AuthService.login(credentials);
    dispatch(loginSuccess(loggedUser));
    const requestedUrl = getState().auth.requestedUrl;
    // replace in history the Login with requested protected page ang go to it OR go to / if no requested page
    history.replace(requestedUrl? requestedUrl: '/'); 
  } catch (err) {
    dispatch(loginFailure(getErrorMessage(err)))
  }
}



