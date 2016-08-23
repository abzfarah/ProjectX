// Copyright (c) 2016 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import $ from 'jquery';
require('perfect-scrollbar/jquery')($);

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router/es6';
import * as GlobalActions from 'actions/global_actions.jsx';
import * as I18n from 'i18n/i18n.jsx';

// Import our styles
import 'bootstrap-colorpicker/dist/css/bootstrap-colorpicker.css';
import 'google-fonts/google-fonts.css';
//import 'sasss/index.scss';
// Import the root of our routing tree
import rRoot from 'routes/route_root.jsx';

// This is for anything that needs to be done for ALL react components.
// This runs before we start to render anything.
function preRenderSetup(callwhendone) {

    var d1 = $.Deferred(); //eslint-disable-line new-cap


            d1.resolve();



    function afterIntl() {
        $.when(d1).done(() => {
            callwhendone();
        });
    }

    if (global.Intl) {
        afterIntl();
    } else {
        I18n.safariFix(afterIntl);
    }
}

function renderRootComponent() {
    ReactDOM.render((
        <Router
            history={browserHistory}
            routes={rRoot}
        />
    ),
    document.getElementById('root'));
}

global.window.setup_root = () => {
    // Do the pre-render setup and call renderRootComponent when done
    preRenderSetup(renderRootComponent);
};
