import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Web3  from 'web3';
import { ethers } from "ethers";

import '../App.css';
import { BarLoader } from "react-spinners";

import { withNamespaces } from 'react-i18next';


/**
 * Queries and displays the user's latest transactions on the blockchain.
 */


function UserTransaction({ t }) { 

    // Get the account

    const [ userAccount, setUserAccount ] = useState(); 

    // eslint-disable-next-line
    var Web3 = require('web3'); 
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545' );

    useEffect(() => {

        async function loadAccounts() {
            const accounts = await web3.eth.requestAccounts();
            setUserAccount(accounts[0]);
        }

        loadAccounts();

        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    // Get last transactions by loading account history (ethers.js)

    const [history, setHistory] = useState();
    
    useEffect(() => {

        async function loadHistory() {
            let provider = new ethers.providers.EtherscanProvider('goerli');
            let history = await provider.getHistory(userAccount);
    
            setHistory(history);
        } 

        loadHistory();

    }, [userAccount])

    // Warn for a slow time response with a loader

    const [loading, setLoading] = useState(false)

    useEffect(() => {

        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 7000)

    }, [])

    return (  
        <div className="App" id='black'>
            <div className="transaction-container">
                    <div className='title-container'>
                        <p><strong><span className='transact-icon'>↓ </span>{t('LAST TRANSACTIONS')} <span className='transact-icon'>↓</span></strong><br /></p>
                    </div> 
                    <br /><br /> 

                    {
                        loading ?
                        <div className="loader">
                            <BarLoader color="#36d7b7" />
                            <p>{t('This may take a few seconds')}</p>
                        </div>
                        :
                        <div>
                            <div className="history-section">

                                {/* display the 3 last transactions (should find a faster solution to query transactions) */}
                                {/* history?.slice(0, 10).map() to get last 10 transactions */}
                                
                                {history?.slice(0, 3).map((transaction) => {
                                    const list = (
                                    <>
                                        <div className='info-container-transaction'>
                                            <p>{transaction['hash']}</p>
                                            <h4>from:</h4> 
                                            <p>{transaction['from']}</p>
                                            <h4>to:</h4>
                                            <p>{transaction['to']}</p>
                                        </div>
                                        <br />
                                    </>
                                    );
                                    return list;
                                })}

                            </div>
                            {
                                document.getElementsByClassName('history-section').length > 1 ?
                                <p></p>
                                :
                                <p id='case0transaction'>{t('No transaction recorded on the blockchain')}</p>
                            }
                        </div>
                    }

                <Link to="/">
                    <button className='diagonal' id='home-link'>{t('return home')}</button>
                </Link>
            </div>
        </div>
    );
}



export default withNamespaces()(UserTransaction);
