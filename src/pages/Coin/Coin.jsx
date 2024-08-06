import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';


const Coin = () => {


  const gecko_api_key = import.meta.env.VITE_GECKO_API_KEY ;

  const {coinId} = useParams(); //useParam let us take the "coinId" on the web path

  const [coinData, setCoinData] = useState();
  const [historicalData, setHistorialData] = useState();

  const {currency} = useContext(CoinContext);

  const fetchCoinData = async () => {
    console.log(JSON.stringify(gecko_api_key))

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': gecko_api_key

      }
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(response => response.json())
      .then(response => setCoinData(response))
      .catch(err => console.error(err));
  }


  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': gecko_api_key

      }
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(response => response.json())
      .then(response => setHistorialData(response))
      .catch(err => console.error(err));
  }


  useEffect(()=> {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency])

  if (coinData && historicalData){
  return (
    /* <h2>Coin : {coinId}</h2> */

    <div className='coin'>
      <div className="coin-name">
        <img src={coinData.image.large} alt="" />
        <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
        
      </div>

      <div className="coin-chart">
        <LineChart historicalData={historicalData}></LineChart>
      </div>

      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
          <ul>
          <li>Price</li>
          <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
        </ul>

        <ul>
          <li>Market Cap</li>
          <li>{coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
        </ul>

        <ul>
          <li>24 Hour High</li>
          <li>{currency.symbol}{coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour Low</li>
          <li>{currency.symbol}{coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
        </ul>

      </div>
    </div>
  )

  } else {
      return (
    /* <h2>Coin : {coinId}</h2> */

    <div className='spinner'>
      <div className="spin">
      
      </div>
    </div>
  )
  }
}

export default Coin
