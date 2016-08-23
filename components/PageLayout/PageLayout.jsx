import * as GlobalActions from 'actions/global_actions.jsx';
import Header from '../header/WebHeader'

import {Link} from 'react-router/es6';

import {FormattedMessage} from 'react-intl';

import React from 'react';


class PageLayout extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'HomePage';
    }
    render() {
        return (


        	<div ref="red">
        	<Header/>
        	{this.props.children}
        	</div>


        	);
    }
}

export default PageLayout;



