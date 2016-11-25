import React from 'react';

export default class Alert extends React.Component {
	constructor() {
		super();
		this.state = { alertVisible: true };
	}
	
	handleAlertHide() {
		this.setState({ alertVisible: false });
	}
	
	render() {
		if(this.state.alertVisible) {
			const className = "alert alert-dismissible alert-"+this.props.type;
			
			return (
				<div className={className}>
					<button type="button" onClick={this.handleAlertHide.bind(this)} className="close" data-dismiss="alert">&times;</button>
					{this.props.text}
				</div>

			);
		} else {
			return(<div></div>);
		}
	}
}