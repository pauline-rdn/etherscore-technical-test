import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../App.css';

import { withNamespaces } from 'react-i18next';

import Web3  from 'web3';
import { ethers } from "ethers";

function UserTransaction({ t }) { {

    const [ userAccount, setUserAccount ] = useState(); 
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545' );

    useEffect(() => {
        loadAccounts();
      }, []);

    async function loadAccounts() {
    const accounts = await web3.eth.requestAccounts();
    setUserAccount(accounts[0]);
    }

    const [history, setHistory] = useState();
    
    useEffect(() => {
        loadHistory();
    }, [userAccount])

    // Get last 10 transactions

    async function loadHistory() {
        let provider = new ethers.providers.EtherscanProvider('goerli');
        let history = await provider.getHistory(userAccount);

        setHistory(history);
    } 

    return (
        <div className="App" id='black'>
            <div className="transaction-container">
                <div className="main">
                    <div className='title-container'>
                        <p><strong><span class='transact-icon'>↓ </span>{t('LAST TRANSACTIONS')} <span class='transact-icon'>↓</span></strong><br /></p>
                    </div>
                    <br /><br /> 
                    <div className="history-section">
                        {history?.map((transaction) => {
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
                </div>
                <Link to="/">
                    <button class='diagonal' id='home-link'>{t('return home')}</button>
                </Link>
            </div>
        </div>
    );
  }
}


export default withNamespaces()(UserTransaction);
