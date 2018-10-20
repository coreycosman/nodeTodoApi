import axios from 'axios'
import { FETCH_USER } from "./types";

export const fetchUser = () => async dispatch =>
({ type: FETCH_USER, payload: await axios.get('/users/me').data });
