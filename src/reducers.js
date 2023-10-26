import { nanoid } from 'nanoid'

import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";

import { toast } from 'react-toastify';

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

        toast.info("Favorilere eklendi");
        const stateAfterAdd = {...state, favs: [...state.favs, {id:nanoid(), fact: action.payload}]};
        writeFavsToLocalStorage(stateAfterAdd);
        return stateAfterAdd;

    case FAV_REMOVE:
        
        toast.info("Favorilerden çıkartıldı");
        const stateAfterRemove = {...state, favs: state.favs.filter(fav => fav.id !== action.payload)};
        writeFavsToLocalStorage(stateAfterRemove);
        return stateAfterRemove;

    case FETCH_SUCCESS:
        toast.success("Kedi Fact'iniz hazır🐈");
      return {...state, loading: false, current: action.payload};

    case FETCH_LOADING:
      return {...state, loading: true, error: ""};

    case FETCH_ERROR:
        toast.error("Kedi Fact'inizi getiremedik😿");
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
