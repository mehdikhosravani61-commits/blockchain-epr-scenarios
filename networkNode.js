const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const { v1: uuidv1 } = require('uuid');
const port = process.argv[2];
const rp = require('request-promise');

const nodeAddress = uuidv1().split('-').join('');
const blockchain = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/blockchain', function (req, res) {
  res.send(blockchain);
});

// Create transaction for scenario
app.post('/transaction/broadcast', function(req, res) {
  const { scenarioType, details } = req.body;
  const newTransaction = blockchain.createNewTransaction(scenarioType, details);
  blockchain.addTransactionToPendingTransactions(newTransaction);

  const requestPromises = [];
  blockchain.networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
      url: networkNodeUrl + '/transaction',
      method: 'POST',
      body: newTransaction,
      json: true
    };
    requestPromises.push(rp(requestOptions));
  });

  Promise.all(requestPromises)
  .then(data => {
    res.json({ note: `Transaction of type ${scenarioType} created and broadcast successfully.`, transaction: newTransaction });
  });
});

app.post('/transaction', function(req, res) {
  const newTransaction = req.body;
  const blockIndex = blockchain.addTransactionToPendingTransactions(newTransaction);
  res.json({ note: `Transaction will be added in block ${blockIndex}.` });
});

app.get('/mine', function(req, res) {
  const lastBlock = blockchain.getLastBlock();
  const previousBlockHash = lastBlock['hash'];
  const currentBlockData = {
    transactions: blockchain.pendingTransactions,
    index: lastBlock['index'] + 1
  };
  const nonce = blockchain.proofOfWork(previousBlockHash, currentBlockData);
  const blockHash = blockchain.hashBlock(previousBlockHash, currentBlockData, nonce);

  const newBlock = blockchain.createNewBlock(nonce, previousBlockHash, blockHash);

  const requestPromises = [];
  blockchain.networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
      url: networkNodeUrl + '/receive-new-block',
      method: 'POST',
      body: { newBlock: newBlock },
      json: true
    };
    requestPromises.push(rp(requestOptions));
  });

  Promise.all(requestPromises)
  .then(data => {
    res.json({ note: "New block mined & broadcast successfully", block: newBlock });
  });
});

app.post('/receive-new-block', function(req, res) {
  const newBlock = req.body.newBlock;
  const lastBlock = blockchain.getLastBlock();
  const correctHash = lastBlock.hash === newBlock.previousBlockHash;
  const correctIndex = lastBlock['index'] + 1 === newBlock['index'];

  if (correctHash && correctIndex) {
    blockchain.chain.push(newBlock);
    blockchain.pendingTransactions = [];
    res.json({ note: 'New block received and accepted.', newBlock: newBlock });
  } else {
    res.json({ note: 'New block rejected.', newBlock: newBlock });
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}...`);
});
