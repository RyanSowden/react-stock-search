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
			console.log(current_result['data'].regularMarketPrice)
			console.log(history_result['data'])
		} catch(err) {
			console.log(err)

		};
	}
	
	handleChange(event) { 
		this.setState({value: event.target.value}); 
	}
	
	handleSubmit(event){
		event.preventDefault();
		this.getData()

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
			<p>{this.state.messsage}</p>
			</div>


		);

	}

}

export default SearchComponent


