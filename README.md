# Juego de Memoria

This project is a memory game built with JavaScript, React, Tailwind, and Webpack. Below are the steps to set up and run the project.

## Prerequisites

Make sure you have the following installed on your system:

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository or download the project files.
2. Open a terminal and navigate to the project directory.
3. Run the following command to install all dependencies:

   ```bash
   npm install
   ```

## Running the Development Server

To start the development server, run:

```bash
npm start
```

This will start the Webpack development server and open the application in your default browser.

## Building for Production

To create a production build, run:

```bash
npm run build
```

The optimized build will be available in the `dist` directory.

## Dependencies

Here is a list of the main npm packages used in this project:

### Development Dependencies

- **webpack**: Module bundler
- **webpack-cli**: Command-line interface for Webpack
- **webpack-dev-server**: Development server for Webpack
- **babel-loader**: Transpiles JavaScript files using Babel
- **@babel/core**: Babel core library
- **@babel/preset-env**: Babel preset for compiling ES6+ syntax
- **@babel/preset-react**: Babel preset for React
- **html-webpack-plugin**: Simplifies the creation of HTML files to serve Webpack bundles
- **style-loader**: Injects CSS into the DOM
- **css-loader**: Resolves CSS imports
- **file-loader**: Handles image and file imports

### Production Dependencies

- **react**: JavaScript library for building user interfaces
- **react-dom**: React package for working with the DOM

## File Structure

```
Juego de Memoria/
├── package.json
├── tailwind.config.js
├── webpack.config.js
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── game.js
│   ├── index.css
│   ├── index.js
│   ├── assets/
│   │   └── rengoku.jpg
│   └── components/
│       └── Rcard.js
```

## License

This project is licensed under the MIT License.
