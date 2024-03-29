import React , {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect (() => { 
  axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false').then(res => {
    setCoins(res.data);
  }).catch(error => console.log(error))
  }, []);

  const handleChange = e => {
    setSearch(e.target.value)
  } 

  const filteredCoins=coins.filter(coins =>
    coins.name.toLowerCase().includes(search.toLowerCase())
    )
  
  return (
    <div className="coin-app">
      <div className='coin-search'>
        <h1 className='coin-text'>Welcome to CryptoTracker</h1>
          <form>
            <input type='text' placeholder='Search for a coin' className='coin-input' onChange={handleChange}></input>
          </form>
      </div>
    {filteredCoins.map(coin => {
      return <Coin key={coin.id}
         name={coin.name} 
         image={coin.image}
         symbol={coin.symbol}
         volume={coin.market_cap}
         price={coin.current_price}
         priceChange={coin.price_change_percentage_24h}
         marketcap={coin.market_cap}
        />
    })}
    </div>
  );
}

export default App;
