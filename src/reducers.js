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
  current: "",
  error: "",
  loading: false,
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

        const stateAfterAdd = {...state, favs: [...state.favs, {id:nanoid(), fact: action.payload}]};
        writeFavsToLocalStorage(stateAfterAdd);
        return stateAfterAdd;

    case FAV_REMOVE:
        
        const stateAfterRemove = {...state, favs: state.favs.filter(fav => fav.id !== action.payload)};
        writeFavsToLocalStorage(stateAfterRemove);
        return stateAfterRemove;

    case FETCH_SUCCESS:
      return {...state, loading: false, current: action.payload};

    case FETCH_LOADING:
      return {...state, loading: true, error: ""};

    case FETCH_ERROR:
      return {...state, loading: false, error: action.payload};

    case GET_FAVS_FROM_LS:

        const lsFavs = readFavsFromLocalStorage();
        if(!lsFavs)
            return state;
        
        return {...state, favs: readFavsFromLocalStorage()};

    default:
      return state;
  }
}
