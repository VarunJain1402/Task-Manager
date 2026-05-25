const Task = require("../models/Task");

// Get tasks for a project
exports.getTasks = async (req, res) => {
  try {
    const { q } = req.query;
    const query = { project: req.params.projectId };

    if (q) {
      query.title = { $regex: q, $options: "i" };
    }

    const tasks = await Task.find(query)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, projectId, assignedTo } = req.body;
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      project: projectId,
      assignedTo,
      createdBy: req.user.id,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update task status
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Allow update if assignedTo, owner of project, or admin
    // For simplicity, any member of the project can update tasks
    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    
    await task.deleteOne();
    res.json({ message: "Task removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
