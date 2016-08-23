// Copyright (c) 2015 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import AppDispatcher from 'dispatcher/app_dispatcher.jsx';


import Constants from 'utils/constants.jsx';
const ActionTypes = Constants.ActionTypes;

import Client from 'client/web_client.jsx';

import en from 'i18n/en.json';
import * as I18n from 'i18n/i18n.jsx';



export function emitInitialLoad(callback) {
    Client.getInitialLoad(
            (data) => {
                global.window.mm_config = data.client_cfg;
                global.window.mm_license = data.license_cfg;


                if (callback) {
                    callback();
                }
            },
            (err) => {
               

                if (callback) {
                    callback();
                }
            }
        );
}


export function newLocalizationSelected(locale) {
    if (locale === 'en') {
        AppDispatcher.handleServerAction({
            type: ActionTypes.RECEIVED_LOCALE,
            locale,
            translations: en
        });
    } else {
        const localeInfo = I18n.getLanguageInfo(locale) || I18n.getLanguageInfo(global.window.mm_config.DefaultClientLocale);

    }
}

export function loadDefaultLocale() {
    const defaultLocale = "en";
    let locale = global.window.mm_user ? global.window.mm_user.locale || defaultLocale : defaultLocale;

    if (!I18n.getLanguageInfo(locale)) {
        locale = 'en';
    }
    return newLocalizationSelected(locale);
}
