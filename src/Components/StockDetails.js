import React, { useState, useEffect } from 'react'
import './StockDetails.css';
import { getApiCoins, getCoins, addCoin } from '../Service/api';

import { Link } from 'react-router-dom';

function StockDetails() {

    const [coins, setCoins] = useState([]);
    const [savedCoins, setSavedCoins] = useState([]);
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(5);
    const [currPage, setCurrPage] = useState(1);

    useEffect(async () => {
        getAllCoins();
    },[]);

    const getAllCoins = async() => {
        const response = await getApiCoins();
        // console.log(response.data);
        setCoins(response.data);
    }

    useEffect(async () => {
        getSavedCoins();
    },[savedCoins]);

    const getSavedCoins = async() => {
        let  response = await getCoins();
        console.log(response.data);
        let data = response.data;
        let saveCoinId = [];
        for(let i = 0; i < data.length; i++){
            saveCoinId.push(data[i].id)
        }
        console.log(saveCoinId);
        setSavedCoins(saveCoinId);
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    let handleRight = () => {
        console.log('handleRight Called')
        setCurrPage(currPage + 1)
    }

    let handleLeft = () => {
        if (currPage != 1) {
            console.log('handleLeft Called')
            setCurrPage(currPage - 1)
        }
    }

    let handleSave = async(coin) => {
        await addCoin(coin);
    }

    const totalPage = coins.length
    let filteredCoins = [];
    // Serach Functionality
    if (search === "") {
        filteredCoins = coins
    } else {
        filteredCoins = coins.filter(coin =>
            coin.name.toLowerCase().includes(search.toLowerCase())
        )
    }

    let si = (currPage - 1) * limit;
    let ei = si + limit;
    filteredCoins = filteredCoins.slice(si, ei);

    return (

        <div className="container border border-2 stockTable rounded mt-3 mb-5">
            <div className="row tableMainHead table-bordered">
                <p className='fs-5 pt-3 ps-4'>Stock Details Table</p>
                <div className="col-6 mt-3">
                    <div className="input-group mb-3">
                        <span className="input-group-text  span-div"><i className="fas fa-search"></i></span>
                        <input type="text" className="form-control" placeholder="Search by Company Name" aria-label="Search by Company Name" onChange={handleChange} />
                    </div>
                </div>
            </div>
            <div className="row table-div">
                <table className="table table-hover">
                    <thead className='table-light'>
                        <tr>
                            <th scope="col">Company Name</th>
                            <th scope="col">SYMBOL</th>
                            <th scope="col">MARKET CAP</th>
                            <th scope="col">Button</th>
                            <th scope="col">Current price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredCoins.map((coin, i) => (
                                <tr key={coin.id}>
                                    <td>{coin.name}</td>
                                    <td><img style={{ width: '2.5rem' }} src={coin.image} alt={coin.symbol} /></td>
                                    <td><p>{`$${coin.market_cap.toLocaleString()}`}</p></td>
                                    {
                                        savedCoins.includes(coin.id) ?
                                            <td>
                                                <Link to={{
                                                    pathname:'/saved-data',
                                                }}>
                                                    <button type="button" className="viewBtn">VIEW</button>
                                                </Link>
                                            </td> :
                                        
                                            <td><button type="button" className="saveBtn" onClick={() => handleSave(coin)}>Save Data</button></td>
                                        

                                    }
                                    <td>{`$${coin.current_price}`}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="row footerDiv">
                <table className="table">
                    <thead>
                        <tr className='tableFooter py-2'>
                            <caption>{si + 1}-{ei} of {totalPage}</caption>
                            <caption><img src="./Images/VectorLeft.svg" alt="left/prev" onClick={handleLeft} /></caption>
                            <caption><img src="./Images/VectorRight.svg" alt="right/next" onClick={handleRight} /></caption>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}

export default StockDetails
