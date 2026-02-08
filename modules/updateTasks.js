import taskCLI from "../index.js";
import fs from 'fs/promises';

export default async function deleteTasks(command) {
    try {
        const data = await fs.readFile('tasks.json', 'utf-8');
        let tasks = JSON.parse(data);
        const taskId = command[0]; // Needs error handling
        const newTask = command.slice(1).trim().toString(); // Needs error handling
        const tasksPresent = tasks.map(t => t.id);
        if(tasksPresent.indexOf(parseInt(taskId)) === -1) {
            throw new Error(`Task with Id ${taskId} is not present`)
        }
        const index = tasks.indexOf(tasks.filter(t => parseInt(t.id) === parseInt(taskId))[0]);
        const updatedTask = {
            id: parseInt(taskId),
            description: newTask,
            status: tasks[index].status,
            createdAt: tasks[index].createdAt,
            updatedAt: new Date().toISOString()
        }
        tasks.fill(updatedTask, index, index+1);
        await fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2), 'utf-8');
        console.log(`Updated task (ID: ${taskId})`);
        taskCLI.prompt();
    } catch(error) {
        if(error.code !== 'ENOENT') {
            console.error(error.message);
            taskCLI.prompt();
        } else {
            console.error('A To-do list is not yet created.');
            taskCLI.prompt();
        }
    }
}