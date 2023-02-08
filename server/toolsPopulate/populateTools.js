require("dotenv").config();
const mongoose = require("mongoose");
const tools = require("./tools.json");

const ToolsModel = require("../db/tools.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const populateTools = async() => {
    await ToolsModel.deleteMany()
    await ToolsModel.create(tools.map(t => t))
console.log("Tools created")
}

const main = async () => {
    await mongoose.connect(mongoUrl);
  
    await populateTools();
  
    await mongoose.disconnect();
  };
  
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });