const Blockchain = require('./blockchain');

const blockchain = new Blockchain();

// Example transactions for 3 scenarios
const tx1 = blockchain.createNewTransaction("Refurbishment", {
  productId: "P-1001",
  repairCenter: "RepairCenter-01",
  cost: 150,
  destination: "SecondaryMarket"
});

const tx2 = blockchain.createNewTransaction("Remanufacturing", {
  productId: "P-2001",
  factory: "Factory-09",
  dismantlingCost: 300,
  transportCost: 50,
  output: "RemanufacturedProduct"
});

const tx3 = blockchain.createNewTransaction("Recycling", {
  productId: "P-3001",
  recyclingCompany: "RecycleCo",
  materialValue: 80,
  transportCost: 20,
  certificate: "GreenCert-2025"
});

blockchain.addTransactionToPendingTransactions(tx1);
blockchain.addTransactionToPendingTransactions(tx2);
blockchain.addTransactionToPendingTransactions(tx3);

console.log("Pending Transactions:", blockchain.pendingTransactions);
