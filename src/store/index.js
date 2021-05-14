import {configureStore} from '@reduxjs/toolkit';

// import counter_reducer from './counter';

 import day_slice from './calendar.js';

const store = configureStore({
    reducer:{day:day_slice}
});



export default store;