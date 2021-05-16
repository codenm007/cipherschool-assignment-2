import {createSlice} from '@reduxjs/toolkit';

const initial_event = [{
    id:"asdadsdsa",
    created_at:new Date().toISOString(),
    description:'Demo_Task 1',
    is_completed:false
},
{
    id:"asdadsdsbjbjbja",
    created_at:"2021-05-16T10:30:00.000Z",
    description:'Demo_Task 1',
    is_completed:false
},
{
    id:"565656",
    created_at:"2021-05-14T10:30:00.000Z",
    description:'Demo_14',
    is_completed:true
},
{
    id:"565656dsd",
    created_at:"2021-05-18T10:30:00.000Z",
    description:'Demo_18h',
    is_completed:true
},
{
    id:"565656dsdvh",
    created_at:"2021-05-21T10:30:00.000Z",
    description:'Demo_21h',
    is_completed:true
}]


const events_slice = createSlice({
    name:'day',
    initialState:initial_event,
    reducers:{
        add_event(state,{payload}){
            state.push(payload);
        },
        mark_as_done(state,{payload:index}){
            state[index].is_completed = !state[index].is_completed;
        },
        remove_event(state,{payload:index}){
            state.splice(index, 1);
        }
    }
});

export default events_slice.reducer;
export const event_actions = events_slice.actions;
