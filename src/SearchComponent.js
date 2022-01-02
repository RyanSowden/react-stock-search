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
			const response = await axios.post('http://localhost:2000/history',{ticker});
			const result = await response
			console.log(result)
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
			<form onSubmit={this.handleSubmit}>
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
			<p>{this.state.message}</p>
			</div>


		);

	}

}

export default SearchComponent


