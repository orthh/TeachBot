import { createStore } from "redux";
import questionsReducer from "./reducer";

const store = createStore(questionsReducer);

export default store;
