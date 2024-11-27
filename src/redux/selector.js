import {createSelector} from 'reselect';

export const selectListTodo = (state) => state.todo.listTodo;
export const selectSearchTodo = (state) => state.todo.searchTodo;

export const getListContent = createSelector([
    selectListTodo, selectSearchTodo
], (listTodo, searchTodo) => {
    return listTodo.filter((it) => {
        const searchNameTodo =  it.nameTodo.toLowerCase().includes(searchTodo.search.toLowerCase());
        
        const searchStatus = searchTodo.status === "All" || (searchTodo.status === "Completed" && it.completed) || (searchTodo.status === "To do" && !it.completed);
        
        const searchPriotity = searchTodo.priotity === "All" || searchTodo.priotity ===  it.priotity;

        return searchNameTodo && searchStatus && searchPriotity;  
    })
})

