# Blockchain EPR Scenarios

This project is a **blockchain prototype** designed to support Extended Producer Responsibility (EPR) use cases in reverse logistics. It focuses on three main scenarios:

- ♻️ **Refurbishment** – Repairing and reusing returned products
- 🏭 **Remanufacturing** – Dismantling components and producing new items
- 🔄 **Recycling** – Processing waste materials and issuing green certificates

The system is implemented in **Node.js** with a simple blockchain and REST API.

---

## 📂 Project Structure
- `blockchain.js` → Blockchain core logic, block/transaction structure
- `networkNode.js` → Express.js REST API for node operations
- `test.js` → Example transactions for the three scenarios
- `Blockchain_Scenarios_Transactions.postman_collection.json` → Postman requests for a single node
- `Blockchain_Scenarios_Transactions_MultiNode.postman_collection.json` → Postman requests for multiple nodes (3001, 3002, 3003)

---

## 🚀 How to Run

### 1. Install dependencies
```bash
npm install express body-parser request-promise sha256 uuid
```

### 2. Start blockchain nodes
Run three separate terminals:
```bash
node networkNode.js 3001 http://localhost:3001
node networkNode.js 3002 http://localhost:3002
node networkNode.js 3003 http://localhost:3003
```

### 3. Import Postman collection
- Open **Postman**
- Import the collection JSON file
- Test transactions for **Refurbishment, Remanufacturing, Recycling** on different nodes

### 4. Mine blocks
Mine new blocks to confirm and record transactions:
```bash
curl http://localhost:3001/mine
```

### 5. View blockchain
Check the chain state:
```bash
curl http://localhost:3001/blockchain
```

---

## 📌 Example Transactions
### Refurbishment
```json
{
  "scenarioType": "Refurbishment",
  "details": {
    "productId": "P-1001",
    "repairCenter": "RepairCenter-01",
    "cost": 150,
    "destination": "SecondaryMarket"
  }
}
```

### Remanufacturing
```json
{
  "scenarioType": "Remanufacturing",
  "details": {
    "productId": "P-2001",
    "factory": "Factory-09",
    "dismantlingCost": 300,
    "transportCost": 50,
    "output": "RemanufacturedProduct"
  }
}
```

### Recycling
```json
{
  "scenarioType": "Recycling",
  "details": {
    "productId": "P-3001",
    "recyclingCompany": "RecycleCo",
    "materialValue": 80,
    "transportCost": 20,
    "certificate": "GreenCert-2025"
  }
}
```

---

## ✅ Features
- Custom transaction types for three EPR scenarios
- REST API to broadcast transactions and mine blocks
- Postman collections for quick testing
- Support for multi-node network simulation

---

## 🔮 Future Improvements
- Add node registration & consensus algorithm
- Integrate with IoT devices for automated tracking
- Smart contracts for cost/value allocation

---

Developed for **research and prototype purposes**. 🚀
