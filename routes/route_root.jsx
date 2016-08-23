// Copyright (c) 2016 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import Root from 'components/root.jsx';
import Homepage from '../components/Homepage'

function preLoggedIn(nextState, replace, callback) {
    ErrorStore.clearLastError();
    callback();
}

export default {
    path: '/',
    component: Root,
    indexRoute: { component: Homepage }
};
