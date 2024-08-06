import React, { createContext, useEffect, useState } from "react";

export const CoinContext = createContext(); //hook to create global variable

const CoinContextProvider = (props) =>{

  const gecko_api_key = import.meta.env.VITE_GECKO_API_KEY + ' ';


  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$", 
  })

  const fetchAllCoin = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': gecko_api_key

      }
    };

    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
      .then(response => response.json())
      .then(response => setAllCoin(response))
      .catch(err => console.error(err));

  }

  // the useEffect will call the fetchAllCoin to add the fetched object into allCoin
  useEffect(() => {
    fetchAllCoin();
  }, [currency]) //useEffect is called when the content in the array is changed; if the array is empty then useEffect updates on every render

/* 
Effect Function: The first argument to useEffect is a function that contains the code for your side effect.
Cleanup Function: The function returned by the effect function (optional) is used for cleanup purposes. It’s called before the component unmounts or before the effect runs again.
Dependencies Array: The second argument is an array of dependencies. The effect runs only if the values in this array change.
*/

  const contextValue = { //We want to access these in any components
    allCoin,
    currency,
    setCurrency
    }
    

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  )
}

export default CoinContextProvider
