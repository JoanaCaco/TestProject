//per cdo route do kemi nga 1 funksion
const getTasks = (req, res) => {
		res.status(200).json({ message: 'Get All Tasks' });
	}

    const createTasks = (req, res) => {
        if (!req.body || !req.body.text){
           res.status(400)
        	throw new Error('Please enter a task');
        }
		res.status(200).json({ message: 'Create Task' });
	}

    const updateTasks = (req, res) => {
		res.status(200).json({ message: `Task ${req.params.id} updated.` });

	}

    const deleteTasks = (req, res) => {
		res.status(200).json({ message: `Task ${req.params.id} deleted.` });

	}


	module.exports = { getTasks, 
                       createTasks, 
                       updateTasks, 
                       deleteTasks} //exp qe ta therrasim tek taskRoutes

	

