require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const EquipmentModel = require("./db/equipment.model")
const ToolsModel = require("./db/tools.model")

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}else console.log('connected')

const app = express();

app.use(express.json());

app.use("/api/employees/:id", async (req, res, next) => {
  let employee = null;

  try {
    employee = await EmployeeModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }

  if (!employee) {
    return res.status(404).end("Employee not found");
  }

  req.employee = employee;
  next();
});

app.get("/api/employees/", async (req, res) => {
  const employees = await EmployeeModel.find().sort({ created: "desc" });
 
  return res.json(employees);
 
});

app.get("/api/employees/:id", (req, res) => {
  return res.json(req.employee);
});

app.get("/years-of-experience/:experience",async (req, res) => {
  const exp = req.params.experience;
  try {
    const employees = await EmployeeModel.find({experience: exp})
    res.json(employees)
  } catch (error) {
    res.status(404)
  }
})

app.get("/missing", async (req, res) => {
  const employees = await EmployeeModel.find({present: false})
  res.json(employees)
})

app.get("/top-paid", async (req, res) => {
  const employees = await EmployeeModel
  .find()
  .sort({current_salary: "desc"})
  .limit(3)
  res.json(employees)
})

app.get("/tools", async (req, res) => {
 
  const tools = await ToolsModel.find().sort({name: "desc"})
  res.json(tools)
})

app.post("/tools", async (req, res, next) => {
  await ToolsModel.deleteMany()
  const tool = req.body;
  try {
    const created = await ToolsModel.insertMany(tool);
   
    res.json(created)
    
  } catch (error) {
    next(error)
  }
})

app.delete("/tools/:name", async (req, res, next) => {
  const name = req.params.name;
  try {
    const deleted = await ToolsModel.findOne({name: name}).deleteOne()
    
    res.json(deleted)
  } catch (error) {
    next(error)
  }
})
app.use("/kittens/:id", async (req, res, next) => {
  let kitten = null;

  try {
    kitten = await EmployeeModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }

  if (!kitten) {
    return res.status(404).end("Kitten not found");
  }

  req.kitten = kitten;
  next();
});
app.get("/kittens/:id", async (req, res) => {
  const id = req.params.id;
  const kitten = await EmployeeModel.findById(id)
  
  res.json(kitten)
})

app.post("/api/employees/:id", async (req, res, next) => {
  
  const kitten = req.body
  console.log(kitten)
  const id = req.params.id
  try {
    const newKitten = await EmployeeModel.findOneAndUpdate(
      {_id: id},
      {
        $push: {
          kittens: kitten
        }
      })
      res.json(req.body)
  } catch (error) {
    next(error)
  }
})


app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  const employee = req.body;

  try {
    const updated = await req.employee.set(employee).save();
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const deleted = await req.employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

//routes for equipments
app.use("/api/equipment/:id", async (req, res, next) => {
  let equipment = null;

  try {
    equipment = await EquipmentModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }

  if (!equipment) {
    return res.status(404).end("Equipment not found");
  }

  req.equipment = equipment;
  next();
});

app.get("/api/equipment/", async (req, res) => {
  const equipment = await EquipmentModel.find().sort({ created: "desc" });
  return res.json(equipment);
});

app.get("/api/equipment/:id", (req, res) => {
  return res.json(req.equipment);
});

app.post("/api/equipment/", async (req, res, next) => {
  const equipment = req.body;

  try {
    const saved = await EquipmentModel.create(equipment);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/equipment/:id", async (req, res, next) => {
  const equipment = req.body;

  try {
    const updated = await req.equipment.set(equipment).save();
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/equipment/:id", async (req, res, next) => {
  try {
    const deleted = await req.equipment.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

//route for Robert
app.get("/robert", async (req, res) => {
  const employees = await EmployeeModel.find({name: {$regex: "^" + "robert", $options : "i"}})
   return res.json(employees)
})



const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
