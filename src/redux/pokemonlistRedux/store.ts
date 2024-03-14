import { createStore } from '@nxweb/core';

import dialogReducer from './reducer/dialogReducer';

const store = createStore(dialogReducer);

export default store;
