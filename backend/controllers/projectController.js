import Project from '../models/Project.js';
import User from '../models/User.js';

export const getProjects = async (req, res) => {
  try {
    // In a real app we might filter by member, but for this assignment 
    // we want all users to be able to see the projects to find their tasks.
    const projects = await Project.find({}).populate('members', 'name email');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  const { name, description, memberIds } = req.body;
  try {
    const project = await Project.create({
      name,
      description,
      members: memberIds || [],
      createdBy: req.user._id
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    
    if (project.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
       return res.status(403).json({ message: 'Not authorized' });
    }

    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;
    if (req.body.memberIds) project.members = req.body.memberIds;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (project.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
       return res.status(403).json({ message: 'Not authorized' });
    }

    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
