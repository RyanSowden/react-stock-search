import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';


class SearchComponent extends React.Component {


	constructor(props) {
		super(props)
		this.state = {value: ""};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	async  getData() {
		const ticker =  this.state.value
		try {
			const current_response = await axios.post('http://localhost:2000/current',{ticker});
			const history_response = await axios.post('http://localhost:2000/history',{ticker});
			const current_result = await current_response
			const history_result = await history_response
			let current_price = (current_result['data'].regularMarketPrice)
			let adjust_price = (current_result['data'].postMarketPrice)
			this.setState({current_price: current_price})
			this.setState({adjust_price: adjust_price})
			//return(history_response['data'][0].close)
			//return(history_response['data'][1].close)
			//return(history_response['data'][2].close)
			//return(history_response['data'][3].close)
			//return(history_response['data'][4].close)
    	 	
		} catch(err) {
			console.log(err)

		};
	}
	
	handleChange(event) { 
		this.setState({value: event.target.value}); 
	}
	
	handleSubmit(event){
		event.preventDefault();
		<p>{this.getData()}</p>

	}

	render(){
		return (
			<div>
			<form onSubmit={this.handleSubmit} id="form">
			<input 
			type="text"
			value={this.state.value}
			onChange={this.handleChange}
			id="search"
			placeholder="Stock Ticker"
			name="s"
			/>
			<button id="searchBtn" type="submit">Search</button>
			</form>
			<p>{this.state.current_price}</p>
			<p>{this.state.adjust_price}</p>
			</div>


		);

	}

}

export default SearchComponent


