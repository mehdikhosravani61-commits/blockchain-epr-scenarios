const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const rp = require('request-promise');

const port = process.argv[2];
const nodeAddress = require('uuid').v1().split('-').join('');

const bitcoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// گرفتن کل بلاکچین
app.get('/blockchain', function (req, res) {
  res.send(bitcoin);
});

// تغییر اصلی: API برای ایجاد ترنزکشن با متادیتا
app.post('/transaction/broadcast', function (req, res) {
  const newTransaction = bitcoin.createNewTransaction(
    req.body.scenarioType,
    req.body.region,
    req.body.sorting,
    req.body.itemId,
    req.body.details
  );

  res.json({ note: 'Transaction created and broadcast successfully.' });
});

// ماین کردن بلاک جدید
app.get('/mine', function (req, res) {
  const lastBlock = bitcoin.getLastBlock();
  const previousBlockHash = lastBlock['hash'];

  const currentBlockData = {
    transactions: bitcoin.pendingTransactions,
    index: lastBlock['index'] + 1
  };

  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
  const blockHash = bitcoin.hashBlock(
    previousBlockHash,
    currentBlockData,
    nonce
  );

  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

  res.json({
    note: 'New block mined & broadcast successfully',
    block: newBlock
  });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}...`);
});
