// Redux
// import {legacy_createStore as createStore} from 'redux';
// import rooReducer from './rooReducer';

// const store = createStore(rooReducer);
// export default store;                   

// Redux Toolkit
import {configureStore} from '@reduxjs/toolkit';
import reducerSlice from './rooReducer';

const store = configureStore({
    reducer: {
        todo: reducerSlice
    }
})

export default store;