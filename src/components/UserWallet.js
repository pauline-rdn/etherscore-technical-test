import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Web3  from 'web3';
import { useEthers } from "@usedapp/core";

import '../App.css';

import { withNamespaces } from 'react-i18next';


/**
 * Relates to actions in relation with a crypto wallet :
 * Connect app to the blockchain and MetaMask user's account.
 * Get and display the data from a particular account.
 */


const UserWallet = ({ t }) => {

    // get and display wallet address/current balance using web3.js

    /** 
     *  useState() allows to init variables, in order to fetch and display MetaMask data.
     *  @param {data}, accepts one parameter : the initial state (any sort of data).
     *  @returns {data, setData}, two values: the current state, and a function that can be used to update the state.
     */

    const [ userAccount, setUserAccount ] = useState(); 
    const [ network, setNetwork ] = useState();
    const [ balance, setBalance ] = useState();

    /**
     *  If this property is null you should connect to a remote/local node.
     *  using ganache (if givenProvider dosen't work then look at ganache port).
     *  https://web3js.readthedocs.io/en/v1.8.0/getting-started.html
     */
    
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545' );

    // get MetaMask account

    /** 
     *  useEffect() is used to perform an effect each time the state changes.
     *  loadAccounts() waits for the return of web3.eth.getAccounts();
     *  Which returns an array of MetaMask addresses.
     *  https://web3js.readthedocs.io/en/v1.2.6/web3-eth.html
     * 
     *  Then we can set userAccount's value : setUserAccount()
     *  to the wallet address we want to connect to our app : accounts[0]
     *  with useState(), userAccount takes accounts[0] as value.
     *  We can display this value in our html. 
     */
    
    useEffect(() => {

        async function loadAccounts() {
            const accounts = await web3.eth.requestAccounts();
            setUserAccount(accounts[0]);
        }
        
        loadAccounts();

        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
    // get balance

    useEffect(() => {

        async function loadBalance() {
            const network = await web3.eth.net.getNetworkType();
            const balance = await web3.eth.getBalance(userAccount, "latest");
        
            setNetwork(network);
            setBalance((balance/1e18).toFixed(4)); // fix big/real numbers issue
        }

        loadBalance();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userAccount]);


    // connect/disconnect using @usedapp/core

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
                        <button id='transaction-link'>{t('Check transactions')}  <span className='transact-icon'>↱</span></button>
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



