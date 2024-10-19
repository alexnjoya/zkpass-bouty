'use client'
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Res } from "../lib/types";
import Header from '../components/header';
import Footer from '../components/footer';

import Image, { StaticImageData } from 'next/image';
import banner0 from '../assets/banner0.jpg';

import banner1 from '../assets/banner1.jpg';

import banner2 from '../assets/banner2.jpg';
import banner4 from '../assets/banner4.jpg';
import banner5 from '../assets/banner5.jpg';
import banner6 from '../assets/banner6.jpg';



// Movie interface

interface Movie {

  title: string;

  year: number;

  director: string;

  videoUrl: string; 
  banner: StaticImageData; 
}

// Movie data
const movies: Movie[] = [
  { title: "Inception", year: 2010, director: "Christopher Nolan", videoUrl: "https://www.youtube.com/watch?v=TXfltmzRG-g&t=9s&pp=ygUcaHR0cHM6Ly95b3V0dS5iZS9UWGZsdG16UkctZw%3D%3D", banner: banner0 },
  { title: "The Matrix", year: 1999, director: "The Wachowskis", videoUrl: "https://www.youtube.com/watch?v=uY5oF0tZiWI&pp=ygUWYmVzdCBtb3ZpZXMgb2YgYWxsdGltZQ%3D%3D", banner: banner5 },
  { title: "Interstellar", year: 2014, director: "Christopher Nolan", videoUrl: "https://www.youtube.com/watch?v=bCE_OXANUG0&pp=ygUZdG9wIDEwIGFjdGlvbiBtb3ZpZXMgMjAyMw%3D%3D", banner: banner2 },
  // New movies added
  { title: "The Dark Knight", year: 2008, director: "Christopher Nolan", videoUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY", banner: banner4 }, // Replace with actual banner
  { title: "Fight Club", year: 1999, director: "David Fincher", videoUrl: "https://www.youtube.com/watch?v=SUXWA_9Ip6g", banner: banner1 }, // Replace with actual banner
  { title: "Pulp Fiction", year: 1994, director: "Quentin Tarantino", videoUrl: "https://www.youtube.com/watch?v=s7EdQ4FqbhY", banner: banner6 }, // Replace with actual banner
];


const upcoming: React.FC = () => {
  return (

    <div className="container mb-20 mx-auto p-2 text-center">
      <Header />
      <h1 className="text-4xl font-bold mt-10 mb-6">Upcoming Movies</h1> 
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
                  onClick={() => window.open(movie.videoUrl, "_blank")} 
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Watch Video
                </button>

              </div>
            </li>

          ))}

        </ul>
      </div>
      {/* End of Movies Section */}
      <Footer />
    </div>

  );
};

export default upcoming;
