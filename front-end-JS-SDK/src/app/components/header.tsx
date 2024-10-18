import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="p-4 mt-10 ">
      
      <nav className="flex fixed top-0  justify-end items-center">
      
      <div className='flex  justify-start'>
      <h1 className="text-white ml-2 flex justify-start text-2xl">MoveMe</h1>
      </div>
      <div className='flex justify-end ml-20'>
      <ul className="flex justify-end space-x-5 ml-auto">
          <li><a className="text-white flex justify-end hover:text-gray-300" href="#home">Home</a></li>
          <li><a className="text-white flex justify-end hover:text-gray-300" href="#about">About</a></li>
          <li><a className="text-white flex justify-end hover:text-gray-300" href="#services">Services</a></li>
          <li><a className="text-white flex justify-end hover:text-gray-300" href="#contact">Contact</a></li>
        </ul>

      </div>
       
      </nav>
    </header>
  );
};

export default Header;
