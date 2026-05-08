//per cdo route do kemi nga 1 funksion
const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');

const getTasks = asyncHandler(async (req, res) => {
        const tasks = await Task.find(); //na kthen gjithe tasket
		res.status(200).json(tasks);
})

    const createTasks = asyncHandler(async(req, res) => {
        if (!req.body || !req.body.text){
           res.status(400)
        	throw new Error('Please enter a task');
        }
        const task = await Task.create({text: req.body.text}) //insert ne db
		res.status(200).json(task);
	})

    const updateTasks = asyncHandler(async(req, res) => {
        const task = await Task.findById(req.params.id);
        //bejme checkun a ekziton ne db, na kthen vetem nje task dhe i cojme si parameter vetem 1 id
        //do si parameter dhe bodyn pra ndryshimet
        if (!task){
            res.status(400);
            throw new Error('Task not found');
        }

        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body,{new: true});
        res.status(200).json(updatedTask);

	})

    const deleteTasks = asyncHandler(async(req, res) => {
                const task = await Task.findById(req.params.id);

         if (!task){
            res.status(400);
            throw new Error('Task not found');
        }
        await Task.findByIdAndDelete(req.params.id);
		res.status(200).json({id: req.params.id });

	})


	module.exports = { getTasks, 
                       createTasks, 
                       updateTasks, 
                       deleteTasks} //exp qe ta therrasim tek taskRoutes

	

