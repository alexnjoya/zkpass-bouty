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
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:
   Run the following command to install the required packages:
   ```bash
   npm install
   ```

3. **Set up environment variables** (if necessary):
   If your project requires any environment variables, create a `.env` file in the root directory and add them there. Refer to the project documentation for specific variables.

4. **Run the application**:
   Start the development server with:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:3000` (or the port specified in your configuration) to view the application.

## Usage

- Once the application is running, you can interact with the movie list and watch videos by clicking the "Watch Video" button for each movie.
- Ensure that your MetaMask wallet is connected to the correct Ethereum network (Morph network) to interact with the zkPass TransGate SDK.

## Troubleshooting

- If you encounter issues, ensure that:
  - You have the correct version of Node.js installed.
  - All dependencies are installed correctly.
  - MetaMask is set up and connected to the right network.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.