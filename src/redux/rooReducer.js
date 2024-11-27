/* eslint-disable no-unused-vars */
// Redux
// const initState = {
//     searchTodo: {
//         search: "",
//         status: "All",
//         priotity: "All"
//     },
//     listTodo: [
//         {
//             id: 1,nameTodo: "Learn TypeScript", completed: false, priotity: "Medium"
//         }   
//     ]
// }   

// const rooReducer = (state = initState, action) => {
//     switch(action.type) {
//         case "ADDTODO":
//             return {
//                 ...state,
//                 listTodo: [
//                     ...state.listTodo,
//                     action.payload
//                 ]
//             }
//         case "SEARCHTODO":
//             return {
//                 ...state,
//                 searchTodo: {
//                     ...state.searchTodo,
//                     search: action.payload
//                 }
//             }
//         case "SEARCHSTATUS":
//             return {
//                 ...state,
//                 searchTodo: {
//                     ...state.searchTodo,
//                     status : action.payload
//                 }
//             }
//         case "SELECTCOMPLETED":
//             return {
//                 ...state,
//                 listTodo: state.listTodo.map((item) => {
//                     if(item.id === action.payload){
//                         return {
//                             ...item,
//                             completed: !item.completed,
//                         }
//                     }
//                     return item;
//                 })
//             }
//         case "SEARCHPRIOTITY":
//             return {
//                 ...state,
//                 searchTodo: {
//                     ...state.searchTodo,
//                     priotity: action.payload
//                 }
//             }
//         case "DELETETODO": 
//             return {
//                 ...state,
//                 listTodo: state.listTodo.filter((it) => {
//                     return it.id !== action.payload;
//                 })
//             }
//         default:
//             return state;
//     }
// }
// export default rooReducer;  

// Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
    name: "rooReducer",
    initialState: {
        searchTodo: {
            search: "",
            status: "All",
            priotity: "All"
        },
        listTodo: [
            {
                id: 1, nameTodo: "Learn Node.JS", completed:false, priotity: "Medium"
            }
        ]
    },
    reducers: {
        actionAddTodo: (state, action) => {
            state.listTodo.push(action.payload);
        },
        actionSearchTodo: (state, action) => {
            state.searchTodo.search = action.payload;
        },
        actionSearchStatus: (state, action) => {
            state.searchTodo.status = action.payload;
        },
        actionSelectCompleted: (state, action) => {
            state.listTodo = state.listTodo.map((it) => {
                if(it.id === action.payload) {
                    return {
                        ...it,
                        completed: !it.completed
                    }
                }
                return it;
            })
        },
        actionSearchPriotity: (state, action) => {
            state.searchTodo.priotity = action.payload;
        },
        actionDeleteTodo: (state, action) => {
            state.listTodo = state.listTodo.filter((it) => it.id !== action.payload);
        }
    }
})

export const {actions, reducer} = reducerSlice;
export const {actionAddTodo, actionSearchTodo, actionSearchStatus, actionSelectCompleted, actionSearchPriotity, actionDeleteTodo} = actions;
export default reducer;