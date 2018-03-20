import { Observable } from 'rxjs';

export default function addObservablesToReduxStore(store) {

    let rootObserver;
    let rootObservable;
    let childObservers = {};
    let childObservables = {};
    let previousStates = {};

    store.subscribe(function () {
        let state = store.getState();
        if (rootObserver) {
            rootObserver.next(state);
        }
        for (let childKey in state) {
            if (state.hasOwnProperty(childKey) && childObservers[childKey]) {
                if (!previousStates.hasOwnProperty(childKey) || previousStates[childKey] !== state[childKey]) {
                    childObservers[childKey].next(state[childKey]);
                    previousStates[childKey] = state[childKey];
                }
            }
        }
    });

    store.getObservable = function (childKey = null) {
        if (childKey) {
            if (!childObservables[childKey]) {
                childObservables[childKey] = new Observable(observer => childObservers[childKey] = observer);
            }

            return childObservables[childKey];
        } else {
            if (!rootObservable) {
                rootObservable = new Observable(observer => rootObserver = observer);
            }
            return rootObservable;
        }
    };
}
