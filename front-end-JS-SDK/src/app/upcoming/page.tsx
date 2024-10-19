'use client'
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import AttestationABI from "../components/AttestationABI.json"; // Adjust the path as necessary
import { Res } from "../lib/types"; // Adjust the path as necessary
import { fetchAttestationsByTx } from '../lib/api'; // Function to fetch attestations
import Header from '../components/header';
import Footer from '../components/footer';

const TransactionsPage: React.FC = () => {
  const [attestAtationTx, setAttestAtationTx] = useState<string | undefined>(undefined);
  const [attestations, setAttestations] = useState<any[]>([]);

  // Function to fetch attestations based on transaction hash
  const fetchAttestations = async (txHash: string) => {
    try {
      const response = await fetch(`https://your-api-endpoint.com/attestations/${txHash}`); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch attestations');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching attestations:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadAttestations = async () => {
      if (attestAtationTx) {
        const fetchedAttestations = await fetchAttestations(attestAtationTx);
        setAttestations(fetchedAttestations);
      }
    };
    loadAttestations();
  }, [attestAtationTx]);

  return (
    <div className="container mb-20 mx-auto p-2 text-center"> {/* Centered text */}
      <Header />
      <h1 className="text-4xl font-bold mt-10 mb-6">Transactions</h1> {/* Removed ml-7 and text-left */}
      
      {attestations.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold">Attestations</h2>
          <table className="min-w-full border-collapse border border-white mx-auto"> {/* Centered table */}
            <thead>
              <tr>
                <th className="border border-white p-2">Index</th>
                <th className="border border-white p-2">Attestation</th>
              </tr>
            </thead>
            <tbody>
              {attestations.map((attestation, index) => (
                <tr key={index}>
                  <td className="border border-white p-2">{index}</td>
                  <td className="border border-white p-2">{JSON.stringify(attestation)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No attestations found.</p>
      )}

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
