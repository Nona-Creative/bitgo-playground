BitGo :: Playground
===

> Playground for BitGo techniques and examples

Available Commands
---

For a list of available commands run:
```bash
npm run help
```

Setup
---

install dependencies:
```bash
npm i
```

init project (will just copy ``.env.local`` to ``.env``):
```bash
npm run init
```

Usage
---

For the CLI help run:
```bash
node src/index.js --help
```

### generate seed

Generate seed for use with BitGo keychain create
[BitGo docs](https://www.bitgo.com/api/v2/?javascript#create-keychain)

```bash
node src/index.js seed gen
```

will output mnemonic phrase and the seed Buffer, which you can use to compare when using ``seed:regen``.


### regenerate seed from mnemonic phrase

Regenerate same seed from mnemonic phrase

```bash
node src/index.js seed regen --phrase '<MNEMONIC PHRASE>'
```

Compare the seed Buffer with that return from ``seed:gen``, it should be the same.
