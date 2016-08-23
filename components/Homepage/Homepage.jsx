import React from 'react';
import Router from 'react-router';
import PageLayout from '../PageLayout';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'HomePage';
    }
    render() {
        return (

        	<PageLayout>
        	<div ref="blue">
        	{this.props.children}
        	</div>
        	</PageLayout>


        	);
    }
}

export default HomePage;