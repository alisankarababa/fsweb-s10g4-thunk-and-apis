import { nanoid } from 'nanoid'

import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:

        for (const iterator of state.favs) {
            if (iterator.fact === action.payload)
                return state;
        }

        return {...state, favs: [...state.favs, {id:nanoid(), fact: action.payload}]};

    case FAV_REMOVE:
      return {...state, favs: state.favs.filter(fav => fav.id !== action.payload)};

    case FETCH_SUCCESS:
      return {...state, current: action.payload};

    case FETCH_LOADING:
      return {...state, loading: true, error: ""};

    case FETCH_ERROR:
      return {...state, loading: false, error: action.payload};

    case GET_FAVS_FROM_LS:
      return state;

    default:
      return state;
  }
}
