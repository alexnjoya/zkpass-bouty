'use client'
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import TransgateConnect from "@zkpass/transgate-js-sdk";
import AttestationABI from "../AttestationABI.json";
import { Res } from "../lib/types";
import verifyEvmBasedResult from "../verifyEvmBasedResult";
import Header from '../components/header';
import Footer from '../components/footer';

// ... existing imports ...

const TransactionsPage: React.FC = () => {
  const [attestAtationTx, setAttestAtationTx] = useState<string | undefined>(undefined);
  const [attestations, setAttestations] = useState<any[]>([]);

  // Removed fetchAttestations function and API call
  // Added logic to handle attestations directly

  const startAttestation = async (schemaId: string, appid: string) => {
    try {
      const connector = new TransgateConnect(appid);
      const isAvailable = await connector.isTransgateAvailable();
      if (!isAvailable) {
        return alert("Please install zkPass TransGate");
      }
      if (window.ethereum == null) {
        return alert("MetaMask not installed");
      }
      if (Number(window.ethereum.chainId) !== 2810) {
        return alert("Please switch to Morph network");
      }

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const account = await signer.getAddress();

      const contractAddress = "0x79208010a972D0C0a978a9073bd0dcb659152072";
      const contract = new ethers.Contract(
        contractAddress,
        AttestationABI,
        signer
      );

      const res = await connector.launch(schemaId, account) as Res;
      const isVerified = verifyEvmBasedResult(res, schemaId);

      if (!isVerified) {
        return alert("Invalid result");
      }

      const taskId = ethers.hexlify(ethers.toUtf8Bytes(res.taskId));
      schemaId = ethers.hexlify(ethers.toUtf8Bytes(schemaId));

      const chainParams = {
        taskId,
        schemaId,
        uHash: res.uHash,
        recipient: account,
        publicFieldsHash: res.publicFieldsHash,
        validator: res.validatorAddress,
        allocatorSignature: res.allocatorSignature,
        validatorSignature: res.validatorSignature,
      };

      const t = await contract.attest(chainParams);
      setAttestAtationTx(t.hash);
      alert("Transaction sent successfully!");
    } catch (err) {
      alert(JSON.stringify(err));
      console.log("error", err);
    }
  };

  useEffect(() => {
    if (attestAtationTx) {
      // Logic to handle attestations can be added here if needed
    }
  }, [attestAtationTx]);

  return (
    <div className="container mb-20 mx-auto p-2 text-center">
      <Header />
      <h1 className="text-4xl font-bold mt-10 mb-6">Transactions</h1>
      
      {attestAtationTx && (
        <div className="flex justify-center mt-4"> 
          <label>AttestationTx:</label>
          <a href={"https://explorer-holesky.morphl2.io/tx/" + attestAtationTx} target="_blank" rel="noopener noreferrer" className="ml-2">
            {attestAtationTx}
          </a>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default TransactionsPage;