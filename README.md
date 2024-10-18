# Front-End JS SDK Project

This project is a front-end application built with React that integrates with the zkPass TransGate SDK to manage movie data and video playback.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: You need to have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: npm is included with Node.js. You can check if you have it installed by running `npm -v` in your terminal.
- **MetaMask**: Install the MetaMask browser extension to interact with Ethereum-based applications.

## Getting Started

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/alexnjoya/zkpass-bouty.git
   cd zkpass-bouty
   cd front-end-JS-SDK
   ```

2. **Install dependencies**:
   Run the following command to install the required packages:
   ```bash
   yarn install
   ```

3. **Run the application**:
   Start the development server with:
   ```bash
   yarn run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000` (or the port specified in your configuration) to view the application.

## Usage

- Once the application is running, you can interact with the movie list and watch videos by clicking the "Watch Video" button for each movie.
- Ensure that your MetaMask wallet is connected to the correct Ethereum network (Morph network) to interact with the zkPass TransGate SDK.