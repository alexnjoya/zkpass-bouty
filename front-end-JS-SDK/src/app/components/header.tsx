import React, { useState } from 'react'; // Added useState for managing wallet connection
import { ethers } from 'ethers'; 


const Header: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null); // State to store wallet address

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
      <nav className="flex fixed top-0 mt-5  justify-end items-center">
        <div className='flex  justify-start'>
          <h1 className="text-white hover:text-gray-300 ml-2 flex justify-start text-2xl">MoveMe</h1>
        </div>
        <div className='flex justify-end ml-20'>
          <ul className="flex justify-end space-x-6 ml-auto">
            <li><a className="text-white flex justify-end hover:text-gray-300" href="#">All-time-top</a></li>
            <li><a className="text-white flex justify-end hover:text-gray-300" href="#Transactions">Transactions</a></li>
            <li><a className="text-white bg-red-500 p-1 rounded-md flex justify-end hover:text-gray-300" href="#upcoming">Upcoming</a></li>
            
          </ul>
        </div>
        <div className="ml-[600px]">
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
