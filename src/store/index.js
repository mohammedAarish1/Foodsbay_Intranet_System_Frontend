import {configureStore} from '@reduxjs/toolkit'; 
import authReducer from '../auth/authSlice';
import itemReducer from '../features/ims/itemSlice.js';
import hrmsReducer from '../features/hrms/hrmsSlice.js';
import userReducer from '../features/user/userSlice.js'

import { setStore } from '../helper/storeUtils.js';

const store=configureStore({
    reducer:{
        auth:authReducer,
        item:itemReducer,
        hrms:hrmsReducer,
        user:userReducer,
    }
});


setStore(store);  // this makes a copy of the store which i had mported in axiosCongig.js file

export default store;