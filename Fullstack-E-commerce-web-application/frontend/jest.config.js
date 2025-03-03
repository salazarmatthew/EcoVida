module.exports = {
  testEnvironment: "jsdom", // Necesario para React
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Archivo de configuración después del entorno
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest" // Transforma archivos JS/JSX con Babel
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Corrige y amplía el patrón
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
  }
};