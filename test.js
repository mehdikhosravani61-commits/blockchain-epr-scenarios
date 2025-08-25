const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

// اضافه کردن چند تراکنش تستی
bitcoin.createNewTransaction(
  "Recycling",                   // scenarioType
  "DE-BE",                       // region
  "Electronics-Screen",          // sorting
  "ITEM12345",                   // itemId
  { brand: "Samsung", condition: "Broken screen" } // details
);

bitcoin.createNewTransaction(
  "Refurbishment",
  "US-NY",
  "Furniture-Chair",
  "ITEM54321",
  { material: "Wood", status: "Needs repaint" }
);

bitcoin.createNewTransaction(
  "Remanufacturing",
  "FR-PAR",
  "Automotive-Engine",
  "ITEM77777",
  { manufacturer: "Renault", issue: "Cylinder damage" }
);

// ماین کردن یک بلاک جدید
console.log("Mining a new block...");
const lastBlock = bitcoin.getLastBlock();
const previousBlockHash = lastBlock['hash'];

const currentBlockData = {
  transactions: bitcoin.pendingTransactions,
  index: lastBlock['index'] + 1
};

const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

console.log("New block mined:", newBlock);

// نمایش کل بلاکچین
console.log("\nFull Blockchain:");
console.log(JSON.stringify(bitcoin, null, 2));
