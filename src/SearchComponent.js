import React, {useState, useEffect} from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import {Line, Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import "./App.css"

const SearchComponent = () =>  {

	const [ticker,setTicker] = useState('')
	const [currentStock,setCurrentStock] = useState('')
	const [adjustedStock,setAdjustedStock] = useState('')
	const [historyStock,setHistoryStock] = useState('')
	const [historyDate, setHistoryDate] = useState('')
	const [companyName, setCompanyName] = useState('')
	
	const handleChange = (e) => { 
		setTicker(e.target.value); 
	}

	const getCurrentPrice = async ()  =>  {
		const stock = ticker 
		try {
			const current_response = await axios.post('http://localhost:2000/current',{ticker});
			const current_result = await current_response
			let current_price = (current_result['data'].regularMarketPrice)
			let company_name = (current_result['data'].longName)
			setCurrentStock(current_price)
			setCompanyName(company_name)

		} catch(err) {
			console.log(err)
		};
	}


	const getAjustedPrice = async ()  =>  {
		const stock = ticker 
		try {
			const adjusted_response = await axios.post('http://localhost:2000/current',{ticker});
			const adjusted_result = await adjusted_response
			let adjusted_price = (adjusted_result['data'].postMarketPrice)
			setAdjustedStock(adjusted_price)

		} catch(err) {
			console.log(err)
		};
	}


	const gethistory = async ()  =>  {
		const stock = ticker 
		try {
			const history_response = await axios.post('http://localhost:2000/history',{ticker});
			const history_result = await history_response
			let day1 = (history_result['data'][4].close)
			let day2 = (history_result['data'][3].close)
			let day3 = (history_result['data'][2].close)
			let day4 = (history_result['data'][1].close)
			let day5 = (history_result['data'][0].close)
			let history_price = [day1,day2,day3,day4,day5]
			let date1 = (history_result['data'][4].date)
			let date2 = (history_result['data'][3].date)
			let date3 = (history_result['data'][2].date)
			let date4 = (history_result['data'][1].date)
			let date5 = (history_result['data'][0].date)
			let new_date1 = date1.slice(0,10)
			let new_date2 = date2.slice(0,10)
			let new_date3 = date3.slice(0,10)
			let new_date4 = date4.slice(0,10)
			let new_date5 = date5.slice(0,10)
			let history_date = [new_date1,new_date2,new_date3,new_date4,new_date5]
			setHistoryStock(history_price)
			setHistoryDate(history_date)
		} catch(err) {
			console.log(err)
		};
	}

	const state = {
		  labels: historyDate,
		  datasets: [
		    {
			          label: 'Price',
			          fill: true,
			          lineTension: 0.5,
			          backgroundColor: 'LightGray',
			          borderColor: 'rgba(0,0,0,1)',
			          borderWidth: 1,
			          data: historyStock
			        }
			    ]
	}




	const handleSubmit = (e) => {
		e.preventDefault();
		getCurrentPrice();
		getAjustedPrice();
		gethistory();
	};


	return (
		<div>
			<form onSubmit={handleSubmit} id="form" className='searchBar'>
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
		<h2 className='h2'>{companyName}</h2>
		<div className='parent'>
			<p className='currentStock'>Current Price:</p>
			<p className='currentStock'>{currentStock} </p>
			<p className='adjustedStock'>After Hours:</p>
			<p className='adjustedStock'>{adjustedStock}</p>
		</div>
			<Line className='graph'
				type='line'
				options={{
					plugins: {
						title: {
							display: true,
							text: 'Stock Price Over Last 5 Days',
							fontSize: 25,
						},
						legend:{
							display:true,
							position:'right'
						}
					}
				}}

				data={state}
		/>

		</div>
	);

}



export default SearchComponent


