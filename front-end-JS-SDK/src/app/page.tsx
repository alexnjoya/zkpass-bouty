"use client"
import { useState } from "react";
import styles from "./page.module.css";
import TransgateConnect from "@zkpass/transgate-js-sdk";
import JSONPretty from "react-json-pretty";
import { ethers } from "ethers";
import AttestationABI from "./AttestationABI.json";
import { Res } from "./lib/types";
import verifyEvmBasedResult from "./verifyEvmBasedResult";
import Image from 'next/image'
import banner from './assets/banner.jpg'

// Define a Movie interface
interface Movie {
  title: string;
  year: number;
  director: string;
  videoUrl: string; // Added videoUrl property
}

// Sample movie data
const movies: Movie[] = [
  { title: "Inception", year: 2010, director: "Christopher Nolan", videoUrl: "https://www.youtube.com/watch?v=TXfltmzRG-g&t=9s&pp=ygUcaHR0cHM6Ly95b3V0dS5iZS9UWGZsdG16UkctZw%3D%3D" },
  { title: "The Matrix", year: 1999, director: "The Wachowskis", videoUrl: "https://www.youtube.com/watch?v=TXfltmzRG-g&t=9s&pp=ygUcaHR0cHM6Ly95b3V0dS5iZS9UWGZsdG16UkctZw%3D%3D" },
  { title: "Interstellar", year: 2014, director: "Christopher Nolan", videoUrl: "https://www.youtube.com/watch?v=TXfltmzRG-g&t=9s&pp=ygUcaHR0cHM6Ly95b3V0dS5iZS9UWGZsdG16UkctZw%3D%3D" }, // Added new movie

];

declare global {
  interface Window {
    ethereum: any;
  }
}

const page = () => {
  const [appid1, setAppid1] = useState<string>("fc110457-b954-482a-b73d-710316120d2c");
  const [value1, setValue1] = useState<string>("ec0661b638474c16b59621a44951d14a");
  const [result, setResult] = useState<any>();
  const [attestAtationTx, setAttestAtationTx] = useState<string>();


  // Starting customization 


  const start = async (schemaId: string, appid: string) => {
    try {
      const appid = "8fb9d43c-2f24-424e-a98d-7ba34a5532f5"
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
      setResult(res);

      const isVerified = verifyEvmBasedResult(res, schemaId)

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

  //ending customization




  return (
    <div className="container mx-auto p-2">
      <h1 className="text-4xl font-bold mb-6 text-center">Trending Movies</h1>

      <div className='flex justify-center  items-center pl-5  mx-auto' >
        <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
          {movies.map((movie, index) => (
            <li key={index} className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src={banner} // Use the imported image here
                alt={`${movie.title} banner`}
                className="w-full h-48 object-cover rounded-t-lg" // Add styling as needed
              />
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p className="text-gray-600">({movie.year})</p>
              <p className="text-gray-500 italic">Directed by {movie.director}</p>
              <div className="mt-2">
                <button
                  onClick={() => window.open(movie.videoUrl, '_blank')}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Watch Video
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}

export default page
