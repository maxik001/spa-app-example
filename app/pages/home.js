import React from 'react';

import BarRandomNumbers from '../components/bar_random_numbers';
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
			</div>
		);
	}
}