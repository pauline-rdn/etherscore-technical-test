#### -- Install dependencies

npm install or yarn

#### -- Start development server and run the frontend

npm start

#### -- Install web3.js and start using web3.eth

[npm install web3](https://web3js.readthedocs.io/en/v1.8.0/getting-started.html#adding-web3-js)

#### -- Get starting with useDApp

[npm i @usedapp/core ethers](https://usedapp-docs.netlify.app/docs/)

#### -- Get starting with ethers.js

[npm install --save ethers](https://docs.ethers.io/v5/single-page/)

#### -- Translate web content with i18next

[step by step guide](https://react.i18next.com/legacy-v9/step-by-step-guide)

#### -- Ensure https connexion
##### install mkcert
brew install mkcert

##### create a certificat authority
mkcert -install

##### generate the certificat for localhost
mkcert -cert-file ~/cert.pem -key-file ~/key.pem localhost


##### configure create-react-app to use the certificat
in .env file at the root project :<br /><br />
HTTPS=true<br />
SSL_CRT_FILE=/path<br />
SSL_KEY_FILE=/path<br />

#### -- Build and deploy app on the web

npm run build<br /><br />
on netlify : drag & drog the build folder in the right section

#### -- UX/UI
##### Free fonts

[Millimètre](https://velvetyne.fr/), 
[Inter](https://fonts.google.com/specimen/Inter)