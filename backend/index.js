import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config';
const app = express();
app.use(cors());
app.use(express.json());
const mongoURI = `mongodb+srv://gomisha552:${process.env.MONGO_PASSWORD}@cluster0.ndz3piv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`; // сюда подставь свой адрес
const taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    completed: {type: Boolean, default: false}
})

const PORT = process.env.PORT || 3005;

const Task = mongoose.model('Task', taskSchema);

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log('Server is running on port http://localhost:3005/');
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    }
    catch (err){
        console.log(err)
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
})

app.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (req.body.title !== undefined) {
            task.title = req.body.title;
        }
        if (req.body.completed !== undefined) {
            task.completed = req.body.completed;
        }

        await task.save();
        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
});


app.delete('/tasks/:id', async (req, res) => {
    try{
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: 'Task deleted successfully' });
    }
    catch(err) {
        res.status(500).json({ message: 'Something went wrong', err })
    }
})