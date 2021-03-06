module.exports = {
  "transform": {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':'jest-transform-stub',
    '^.+\\.(js|jsx)?$': 'babel-jest',
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

  // Module file extensions for importing
  "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"],
  "transformIgnorePatterns": [
    '<rootDir>/node_modules/'
  ]
};
