"use client"
import { useState } from "react";
import TransgateConnect from "@zkpass/transgate-js-sdk";
import { ethers } from "ethers";
import AttestationABI from "./AttestationABI.json";
import { Res } from "./lib/types";
import verifyEvmBasedResult from "./verifyEvmBasedResult";
import Image from 'next/image'
import banner0 from './assets/banner0.jpg'
import banner1 from './assets/banner1.jpg'
import banner2 from './assets/banner2.jpg'
import { StaticImageData } from 'next/image'
import Header from './components/header';
import Footer from './components/footer';


//  Movie interface
interface Movie {
  title: string;
  year: number;
  director: string;
  videoUrl: string; 
  banner: StaticImageData; 
}

//  movie data
const movies: Movie[] = [
  { title: "Inception", year: 2010, director: "Christopher Nolan", videoUrl: "https://www.youtube.com/watch?v=TXfltmzRG-g&t=9s&pp=ygUcaHR0cHM6Ly95b3V0dS5iZS9UWGZsdG16UkctZw%3D%3D", banner: banner0  },
  { title: "The Matrix", year: 1999, director: "The Wachowskis", videoUrl: "https://www.youtube.com/watch?v=uY5oF0tZiWI&pp=ygUWYmVzdCBtb3ZpZXMgb2YgYWxsdGltZQ%3D%3D", banner: banner1  },
  { title: "Interstellar", year: 2014, director: "Christopher Nolan", videoUrl: "https://www.youtube.com/watch?v=bCE_OXANUG0&pp=ygUZdG9wIDEwIGFjdGlvbiBtb3ZpZXMgMjAyMw%3D%3D", banner: banner2  }, // Added new movie
];

declare global {
  interface Window {
    ethereum: any;
  }
}

const page = () => {
  const [appid1, setAppid1] = useState<string>("ead2584c-2c16-4fdd-8057-ce12dff5f7ac");
  const [value1, setValue1] = useState<string>("3b59f26ac65949759cc48973fd6b6ef4");
  const [result, setResult] = useState<any>();
  const [attestAtationTx, setAttestAtationTx] = useState<string>();
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);

  const start = async (schemaId: string, appid: string, videoUrl: string) => {
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
      // Set the current video URL to play
      setCurrentVideoUrl(videoUrl); 
    } catch (err) {
      alert(JSON.stringify(err));
      console.log("error", err);
    }
  };
  return (
    <div className="container mb-20 mx-auto p-2">
      <Header  />
      <h2 className="text-4xl font-bold ml-7 mt-10 mb-6 text-left">Trending Movies</h2>

      <div className='flex justify-center items-center pl-5 mx-auto'>
        <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
          {movies.map((movie, index) => (
            <li key={index} className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Image
                src={movie.banner} 
                alt={`${movie.title} banner`}
                className="w-full h-48 object-cover rounded-t-lg" 
              />
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p className="text-gray-600">({movie.year})</p>
              <p className="text-gray-500 italic">Directed by {movie.director}</p>
              <div className="mt-2">
                <button
                  onClick={() => start(value1, appid1, movie.videoUrl)} 
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Watch Video
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {currentVideoUrl && (
        <div className="mt-4 flex justify-center relative"> 
          <iframe
            width="900"
            height="500"
            src={`https://www.youtube.com/embed/${new URL(currentVideoUrl).searchParams.get("v")}?autoplay=1`} // Updated to extract video ID for embedding
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {attestAtationTx && (
        <div className="flex justify-center mt-4"> 
          <label>AttestationTx:</label>
          <a href={"https://explorer-holesky.morphl2.io/tx/" + attestAtationTx} target="_blank" rel="noopener noreferrer" className="ml-2"> {/* Added margin for spacing */}
            {attestAtationTx}
          </a>
        </div>
      )}
      <Footer />
    </div>
    
  )
}

export default page
