// Copyright (c) 2016 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import Client from './client.jsx';
import * as GlobalActions from 'actions/global_actions.jsx';

import request from 'superagent';

const HTTP_UNAUTHORIZED = 401;

class WebClientClass extends Client {
    constructor() {
        super();
        this.enableLogErrorsToConsole(true);

    }

    onTeamStoreChanged = () => {
        
    }

    handleError = (err, res) => { // eslint-disable-line no-unused-vars
        if (err.status === HTTP_UNAUTHORIZED && res.req.url !== '/api/v3/users/login') {
          
        }
    }

    // not sure why but super.login doesn't work if using an () => arrow functions.
    // I think this might be a webpack issue.
    webLogin(loginId, password, token, success, error) {
        this.login(
            loginId,
            password,
            token,
            (data) => {
                this.track('api', 'api_users_login_success', '', 'login_id', loginId);

                if (success) {
                    success(data);
                }
            },
            (err) => {
                this.track('api', 'api_users_login_fail', '', 'login_id', loginId);
                if (error) {
                    error(err);
                }
            }
        );
    }
}

var WebClient = new WebClientClass();
export default WebClient;
