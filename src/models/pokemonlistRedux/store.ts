import { createStore } from '@nxweb/core';

import dialogReducer from './reducer/dialogReducer';

const store = createStore(dialogReducer, { open: false });

export default store;
