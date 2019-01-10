BitGo :: Playground
===

> Playground for BitGo techniques and examples

Available Commands
---

For a list of available commands run:
```bash
npm run help
```

CLI Setup
---

1. Install dependencies:
    ```bash
    npm i
    ```

2. Init project (will just copy ``.env.local`` to ``.env`` and ``.env.test.local`` to ``.env.test``):
    ```bash
    npm run init
    ```

3. Create a [free BitGo test account](https://test.bitgo.com)

   3.1. Create a [BitGo test organization](https://test.bitgo.com/enterprise/create/tbtc)
   and use it's ``Enterprise ID`` populate ``BITGO_ENTERPRISE`` in ``.env`` and ``.env.test``.

   3.2. Create an [BitGo access token](https://test.bitgo.com/user/settings/options)
   and use it to populate ``BITGO_ACCESS_TOKEN`` in ``.env`` and ``.env.test``.<br>
   **IMPORTANT**: you must set a spending limit for ``TETH`` when creating an access token.

   3.4. Find out what the ``Ethereum Fee Address`` for your account is.<br>
   One way to do this is:
    - Click Wallets > Create Wallet > Choose Ethereum > and follow the steps.
    - You will get an error that looks something like:
      ```
      insufficient funds in fee address:
      0xabc123def456ghi789abc123def456ghi789abc1
      ```
    - Copy that address

4. Then on the Kovan network, transfer some Ether to your ``fee address`` (eg. 0.5 Ether will be enough for a day of regular playing around with this CLI)

5. Next create a wallet for testing and local tranaactions using the following command:
    ```bash
    node src/index.js wallet create -l '<WHATEVER NAME YOU LIKE>'
    ```

6. Then using the output under **Wallet**: 
   - ``id`` : use this to populate ``BITGO_WALLET_ID`` in ``.env`` and ``.env.test``

7. And lastly using the output under **MERGED User Keychain Data**:
   - ``private key`` : use this to populate ``BITGO_WALLET_PRV`` in ``.env`` and ``.env.test``
   - ``address`` : transfer some Ether to this address

    You can use the following command to check that the wallet balance after your transfer:
    ```bash
    node src/index.js wallet view '<WALLET ID>'
    ```

### Where to get Ether?

On the Kovan network you can get ether from the [Kovan Faucet](https://faucet.kovan.network)

### How to send Ether?

Install the [Metamask chrome extension](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) and [create an Ethereum account](https://medium.com/publicaio/a-complete-guide-to-using-metamask-updated-version-cd0d6f8c338f).
 
CLI Usage
---

### seed

Commands for generating/regenerating seed for use with BitGo keychain create:
[BitGo docs](https://www.bitgo.com/api/v2/?javascript#create-keychain)

For all available ``seed`` commands run:
```bash
node src/index.js seed gen --help
```

### keychains

Commands for creating/recreating, storing and listing keychains, which are required when creating BitGo wallets:
[BitGo docs](https://www.bitgo.com/api/v2/?javascript#add-wallet)

For all available ``keychain`` commands run:
```bash
node src/index.js keychain create --help
node src/index.js keychain list --help
```

### wallet

Commands for creating/recovering and listing BitGo wallets:

For all available ``wallet`` commands run:
```bash
node src/index.js wallet create --help
node src/index.js wallet list --help
node src/index.js wallet view --help
node src/index.js wallet transact --help
```

Testing
---

You can run unit tests with the following command:
```bash
npm run test
``` 
Or in watch mode:
```bash
npm run test:watch
``` 

End to End Testing
---

1. First you have followed the steps in **End to End Testing Setup**.

2. Then run the following command:

  ```bash
  npm run test:e2e
  ```

**NOTE**: This with consume Ether from your BitGo test fee address.
