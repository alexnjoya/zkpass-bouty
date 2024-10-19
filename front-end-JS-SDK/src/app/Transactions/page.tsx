'use client'
import React, { useState, useEffect } from 'react'

interface TransactionsProps {
  attestAtationTx: string | undefined;
}

const Transactions: React.FC<TransactionsProps> = ({ attestAtationTx }) => {
  const [attestations, setAttestations] = useState<any[]>([]);
  

  useEffect(() => {
    const fetchAttestations = async () => {
      if (attestAtationTx) {
        // Replace with your logic to fetch attestations using attestAtationTx
        const fetchedAttestations = await fetchAttestationsByTx(attestAtationTx);
        setAttestations(fetchedAttestations);
      }
    };
    fetchAttestations();
  }, [attestAtationTx]);

  return (
    <div className="container mb-20 mx-auto p-2">
      {attestations.length > 0 && (
        <div className="mt-4">
          <h3 className="text-2xl font-bold">Attestations</h3>
          <ul>
            {attestations.map((attestation, index) => (
              <li key={index} className="text-gray-600">
                {/* Customize how you want to display each attestation */}
                {JSON.stringify(attestation)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Transactions
