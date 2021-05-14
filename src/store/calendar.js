import {createSlice} from '@reduxjs/toolkit';


const initial_day = {
    start_date:new Date().toISOString()
}


const day_slice = createSlice({
    name:'day',
    initialState:initial_day,
    reducers:{
        prev_week(state){
            const today = new Date(state.start_date);
            state.start_date=new Date(today.getFullYear(), today.getMonth(), today.getDate()-6).toISOString().slice(0,10);
            console.log('inside reducer',state.start_date , 'today' , today);
        },
        next_week(state){
            const today =new Date(state.start_date);
            state.start_date=new Date(today.getFullYear(), today.getMonth(), today.getDate()+8).toISOString().slice(0,10);
            console.log('inside reducer',state.start_date , 'today' , today);
        }
    }
});

export default day_slice.reducer;
export const day_actions = day_slice.actions;
