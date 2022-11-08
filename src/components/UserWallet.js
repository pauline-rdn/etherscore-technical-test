import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Web3  from 'web3';
import { useEthers } from "@usedapp/core";

import '../App.css';

import { withNamespaces } from 'react-i18next';


const UserWallet = ({ t }) => {

    // fetch and display account & balance using web3.js

    const [ userAccount, setUserAccount ] = useState(); 
    const [ network, setNetwork ] = useState();
    const [ balance, setBalance ] = useState();

    // https://web3js.readthedocs.io/en/v1.8.0/getting-started.html#adding-web3-js
    // If this property is null you should connect to a remote/local node.
    //using ganache (if givenProvider dosen't work then look at ganache port)
    
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545' );

    useEffect(() => {
        loadAccounts();
      }, []);
    
    useEffect(() => {
        loadBalance();
    }, [userAccount]);


    // async / await the promise

    async function loadBalance() {
    const network = await web3.eth.net.getNetworkType();
    const balance = await web3.eth.getBalance(userAccount, "latest");

    setNetwork(network);
    setBalance((balance/1e18).toFixed(4));
    }

    async function loadAccounts() {
    const accounts = await web3.eth.requestAccounts();
    setUserAccount(accounts[0]);
    }

    // connect/disconnect functionalities using @usedapp/core

    const { activateBrowserWallet, account, deactivate } = useEthers();

    return (
        <div>
        <h3>{t('Eth. Decentralized Wallet')} <span>●</span></h3>
        {
            // if the account is connected, show me the address & the balance on the chosen network.
            account 
                ? 
                <div>
                    <div className='info-container'>
                        <p><strong>{t('YOUR ACCOUNT')}:</strong><br /><br />  { userAccount }</p>
                    </div>
                    <br /><br />
                    <div className='info-container'>
                        <p><strong>{t('YOUR BALANCE')}:</strong><br /><br />  { balance } eth. - {t('on')} { network } {t('network')}</p>
                    </div>
                    <br /><br />
                    <Link to="/transactions">
                        <button id='transaction-link'>{t('Check transactions')}  <span class='transact-icon'>↱</span></button>
                    </Link>
                    <br />
                    <button className='diagonal' onClick={() => deactivate()}>
                    {t('Disconnect')}
                    </button>
                </div>
                :  // else send a connect request
                <p>
                    {t('Connect wallet to start')}.<br />
                    <button className='diagonal' onClick={() => activateBrowserWallet()}>
                    {t('Connect Wallet')}
                    </button>
                </p>
        }
        </div>
    );
}
    
export default withNamespaces()(UserWallet);



