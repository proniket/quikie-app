import React, { useState, useEffect } from 'react'
import './SavedData.css';
import { Link, useLocation } from 'react-router-dom';
import { getCoins, deleteCoin } from '../Service/api';

function SavedDataPage() {

    // const location = useLocation()
    // const { favouriteCoins } = location.state
    // console.log(favouriteCoins)
    // const [savedCoins, setSavedCoins] = useState(favouriteCoins[0])
    const [savedCoins, setSavedCoins] = useState([])

    // console.log(savedCoin[0])
    // console.log(savedCoins)
    useEffect(async () => {
        getSavedCoins();
    },[savedCoins]);

    const getSavedCoins = async() => {
        let  response = await getCoins();
        console.log(response.data);
        setSavedCoins(response.data);
    }


    let handleDelete = (id) => {
        deleteCoin(id);
    }

    return (
        <div>
            <div className="container border border-2 stockTable rounded mt-3 mb-5">
                <div className="row table-div">
                    <table className="table table-hover">
                        <thead  className='savedTableHead'>
                            <tr>
                                <td col-12>SAVED DATA TABLE</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                savedCoins.length === 0 ?
                                    <tr>
                                        <td>NO DATA TO SHOW...PLEASE ADD COIN TO SHOW!</td>
                                    </tr> :

                                    savedCoins.map((coin, i) => (
                                        <tr key={coin.id}>
                                            <td>{coin.name}</td>
                                            <td><img style={{ width: '2.5rem' }} src={coin.image} alt={coin.symbol} /></td>
                                            <td><p>{`$${coin.market_cap.toLocaleString()}`}</p></td>
                                            <td><button type="button" className="secondaryBtn" onClick={() => handleDelete(coin.id)}>DELETE</button></td>
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
                            <tr className='footer py-2'>
                                <Link to='/' style={{ textDecoration: 'none' }}>
                                    <button type="button" className="secondaryBtn">BACK</button>
                                </Link>       
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default SavedDataPage
