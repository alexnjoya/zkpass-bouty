'use client'
import React, { useState } from 'react'; 
import { ethers } from 'ethers'; 
import Link from 'next/link'; 

const Header: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null); 

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum); 
        const accounts = await provider.send("eth_requestAccounts", []); 
        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]); 
        } else {
          console.error("No accounts found. Please ensure your wallet is unlocked.");
        }
      } catch (error) {
        console.error("Error connecting to wallet:", error);
        alert("Failed to connect wallet. Please check the console for more details.");
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <header className="p-4 mt-10 ">
      <nav className="flex fixed top-0 mt-5 justify-end items-center">
        <div className='flex justify-start'>
          <h1 
            className="text-white hover:text-gray-300 ml-2 flex justify-start text-2xl cursor-pointer" 
            onClick={() => window.location.href = '/'} 
          >
            MoveMe
          </h1>
        </div>
        <div className='flex justify-end ml-20'>
          <ul className="flex justify-end space-x-6 ml-auto">
            <li>
              <Link href="/" className="text-white flex justify-end hover:text-gray-300">All-time-top</Link>
            </li>
            <li>
              <Link href="./Transactions" className="text-white flex justify-end hover:text-gray-300">Transactions</Link>
            </li>
            <li>
              <Link href="./upcoming" className="text-white bg-red-500 p-1 rounded-md flex justify-end hover:text-gray-300">Upcoming</Link>
            </li>
          </ul>
        </div>
        <div className="ml-[550px]">
          <button 
            onClick={connectWallet} 
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {walletAddress ? `Connected` : 'Connect Wallet'}
          </button> 
        </div>
      </nav>
    </header>
  );
};

export default Header;
