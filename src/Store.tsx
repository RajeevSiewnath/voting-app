import React, { PropsWithChildren, useEffect } from "react";
import PollReducer from './reducers/PollReducer';
import StoreContext from './contexts/StoreContext';

export default function Store(props: PropsWithChildren) {
    const persistentJson = localStorage.getItem('persistent')
    const [state, dispatch] = React.useReducer(PollReducer, persistentJson ? JSON.parse(persistentJson) : {
        question: '',
        answers: [],
        votes: {}
    });

    useEffect(() => {
        localStorage.setItem('persistent', JSON.stringify(state))
    }, [state])

    const providerState = {
        state,
        dispatch,
    };

    return (
        <StoreContext.Provider value={providerState}>
            {props.children}
        </StoreContext.Provider>
    );
};
