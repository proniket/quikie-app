import axios from 'axios';

const api_url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false';

const json_url = 'http://localhost:3003/coins';

export const getApiCoins = async () => {
    return await axios.get(api_url);
}

export const getCoins = async () => {
    return await axios.get(json_url);
}

export const addCoin = async(coin) => {
    return await axios.post(json_url, coin);
    // return await axios.post(`${json_url}/add`, coin);
}

export const deleteCoin = async(id) => {
    return await axios.delete(`${json_url}/${id}`);
}