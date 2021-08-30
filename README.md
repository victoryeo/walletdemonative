This is a demo project. It access the Ethereum blockchain using web3.

The project is developed using react native. The state is managed in redux store. 

It uses eth-lightwallet (2021 update,  eth-lightwallet has not been updated for two years.)

You may need to run the command of rn-nodeify to setup crypto dependency in react native. If you do not do so, you may encounter the error of: Secure random number generation is not supported by this browser. See https://github.com/tradle/rn-nodeify#readme for more information.

Specifically, in the project root folder, run:
./node_modules/.bin/rn-nodeify  --install