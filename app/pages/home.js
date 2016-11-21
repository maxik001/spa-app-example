import React from 'react';

import Footer from '../components/footer';
import TopMenu from '../components/top_menu';

export default class Home extends React.Component {
	constructor() {
		super()
	}
	
	render() {
		return (
			<div>
				<TopMenu />
				Главная страница
				<Footer />
			</div>
		);
	}
}