// Copyright (c) 2016 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import * as GlobalActions from 'actions/global_actions.jsx';
import LocalizationStore from 'stores/localization_store.jsx';
import Client from 'client/web_client.jsx';

import {IntlProvider} from 'react-intl';

import React from 'react';

import FastClick from 'fastclick';

export default class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locale: 'en',
            translations: null
        };

        this.localizationChanged = this.localizationChanged.bind(this);
        this.redirectIfNecessary = this.redirectIfNecessary.bind(this);


        // Fastclick
        FastClick.attach(document.body);
    }
    localizationChanged() {
        const locale = LocalizationStore.getLocale();

        Client.setAcceptLanguage(locale);
        this.setState({locale, translations: LocalizationStore.getTranslations()});
    }

    redirectIfNecessary(props) {
        if (props.location.pathname === '/') {
            
            
        }
    }
    componentWillReceiveProps(newProps) {
        this.redirectIfNecessary(newProps);
    }
    componentWillMount() {
        // Redirect if Necessary
        this.redirectIfNecessary(this.props);
    }
    componentDidMount() {
        // Setup localization listener
        LocalizationStore.addChangeListener(this.localizationChanged);

        // Get our localizaiton
        GlobalActions.loadDefaultLocale();
    }
    componentWillUnmount() {
        LocalizationStore.removeChangeListener(this.localizationChanged);
    }
    render() {
        if (this.state.translations == null || this.props.children == null) {
            return <div/>;
        }

        return (
            <IntlProvider
                locale={this.state.locale}
                messages={this.state.translations}
                key={this.state.locale}
            >
                {this.props.children}
            </IntlProvider>
        );
    }
}
Root.defaultProps = {
};

Root.propTypes = {
    children: React.PropTypes.object
};
