import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import appReducer from "./slices/app";
import authReducer from "./slices/auth";

// slices

const rootPersistConfig={
    key:'root',
    storage,
    keyPrefix:'redux-',
    // whitelist:[] >> it is used to allow reducers to persist in local storage.
    // blacklist:[] >> it is used to disallow reducers to persist in local storage.
}

const rootReducer= combineReducers({
    app:appReducer,
    auth:authReducer,
})

export {
    rootPersistConfig,
    rootReducer,
}