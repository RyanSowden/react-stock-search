import React, {useState, useEffect} from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import {Line, Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const SearchComponent = () =>  {

	const [ticker,setTicker] = useState('')
	const [currentStock,setCurrentStock] = useState('')
	const [adjustedStock,setAdjustedStock] = useState('')
	
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
			const current_result = await current_response
			//const history_result = await history_response
			let current_price = (current_result['data'].regularMarketPrice)
			//let adjust_price = (current_result['data'].postMarketPrice)
			//let history_price = (history_result['data'][0].close)
			setCurrentStock(current_price)

		} catch(err) {
			console.log(err)
		};
	}


	const getAjustedPrice = async ()  =>  {
		const stock = ticker 
		try {
			const adjusted_response = await axios.post('http://localhost:2000/current',{ticker});
			const adjusted_result = await adjusted_response
			//const history_result = await history_response
			let adjusted_price = (adjusted_result['data'].postMarketPrice)
			//let history_price = (history_result['data'][0].close)
			setAdjustedStock(adjusted_price)

		} catch(err) {
			console.log(err)
		};
	}




	const handleSubmit = (e) => {
		e.preventDefault();
		getCurrentPrice();
		getAjustedPrice();
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
		</form>
			<p>{currentStock}</p>
			<p>{adjustedStock}</p>

		</div>
	);

}



export default SearchComponent


