import React from 'react';
import { Provider } from 'react-redux';
import { createStore as reduxCreateStore } from 'redux';
import rootReducer from '.';
import RootWrapper from '../../src/components/RootWrapper'

const createStore = () => reduxCreateStore(rootReducer);

export default ({ element }) => (
    <Provider store={createStore()}>
        <RootWrapper>
            {element}
        </RootWrapper>
    </Provider>
);