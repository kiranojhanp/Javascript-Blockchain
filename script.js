const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, payload, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.payload = payload;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.timestamp +
        this.previousHash +
        JSON.stringify(this.payload)
    ).toString();
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "24/11/2021", "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}

let dannyCoin = new BlockChain();
dannyCoin.addBlock(new Block(1, "25/11/2021", { amount: 4 }));
dannyCoin.addBlock(new Block(2, "25/11/2021", { amount: 10 }));

console.log(JSON.stringify(dannyCoin, null, 4));

