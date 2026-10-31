const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Resource = require("./models/Resource");
const Task = require("./models/Task");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/StudySyncDB")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));


// ======================
// STUDY RESOURCE APIs
// ======================

// View all resources
app.get("/resources", async (req, res) => {
    const resources = await Resource.find();
    res.json(resources);
});

// Add resource
app.post("/resources", async (req, res) => {
    const resource = new Resource(req.body);
    await resource.save();

    res.json({
        message: "Resource added successfully"
    });
});

// Update resource
app.put("/resources/:id", async (req, res) => {
    await Resource.findByIdAndUpdate(
        req.params.id,
        req.body
    );

    res.json({
        message: "Resource updated successfully"
    });
});

// Delete resource
app.delete("/resources/:id", async (req, res) => {
    await Resource.findByIdAndDelete(req.params.id);

    res.json({
        message: "Resource deleted successfully"
    });
});


// ======================
// ACADEMIC TASK APIs
// ======================

// View all tasks
app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Add task
app.post("/tasks", async (req, res) => {
    const task = new Task(req.body);
    await task.save();

    res.json({
        message: "Task added successfully"
    });
});

// Update task
app.put("/tasks/:id", async (req, res) => {
    await Task.findByIdAndUpdate(
        req.params.id,
        req.body
    );

    res.json({
        message: "Task updated successfully"
    });
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);

    res.json({
        message: "Task deleted successfully"
    });
});


// Start Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
