# addObservablesToReduxStore

```javascript
let store = createStore(combineReducers({
    todos: todoReducer,
    books: BookReducer
}));
addObservablesToReduxStore(store);

store.getObservable().subscribe(state => console.log("GLOBAL STATE", state));
store.getObservable('todos').subscribe(state => console.log("TODOS STATE", state));
store.getObservable('books').subscribe(state => console.log("BOOKS STATE", state));
