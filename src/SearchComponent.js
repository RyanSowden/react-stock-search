import React, {useState, useEffect} from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import {Line, Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const SearchComponent = () =>  {

	const [ticker,setTicker] = useState('')
	const [result,setResult] = useState('')

	
	/*
	componentDidMount(){
		const [data,setData] = useState({});

		useEffect(() => {
			setData({
				labels: ['Jan','Feb','Mar'],
				datasets: [
					{
				label: 'Test',
					fill: false,
					lineTension: 0.5,
					backgroundColor: 'pink',
					borderColor: 'black',
					borderWidth: 2,
					data: [1,2,3]
			}
				]
		});
	},[])
	}
*/
	
	const handleChange = (e) => { 
		setTicker(e.target.value); 
	}

	const getCurrentPrice = async ()  =>  {
		const stock = ticker 
		try {
			const current_response = await axios.post('http://localhost:2000/current',{ticker});
			//const history_response = await axios.post('http://localhost:2000/history',{ticker});
			const current_result = await current_response
			//const history_result = await history_response
			let current_price = (current_result['data'].regularMarketPrice)
			//let adjust_price = (current_result['data'].postMarketPrice)
			//let history_price = (history_result['data'][0].close)
			setResult(current_price)

		} catch(err) {
			console.log(err)
		};
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		getCurrentPrice();
		test();
	};


	return (
		<div>
			<form onSubmit={handleSubmit} id="form">
			<input 
			type="text"
			value={ticker}
			onChange={handleChange}
			id="search"
			placeholder="Stock Ticker"
			name="search"
			/>
			<button id="searchBtn" type="submit">Search</button>
			<p>{result}</p>
			</form>

		</div>


);

}



export default SearchComponent


