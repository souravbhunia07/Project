import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { eventsReducer, newEventReducer, eventReducer } from "./reducers/eventReducer";

const reducer = combineReducers({
    events: eventsReducer,
    newEvent: newEventReducer,
    event: eventReducer,
})

const middleWare = [thunk];

const store = createStore (
    reducer,
    composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;