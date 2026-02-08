import fs from 'fs/promises';
import taskCLI from '../index.js';

export default async function addTask(task) {
    try {
        let tasks = [];
        try {
            const data = await fs.readFile('tasks.json', 'utf-8');
            tasks = JSON.parse(data);
        } catch(err) {
            if(err.code !== 'ENOENT') {
                throw err;
            } else {
                tasks = [];
            }
        }
        const taskObject = {
            id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
            description: task,
            status: 'todo',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        tasks.push(taskObject)
        await fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2), 'utf-8');
        console.log(`Task added successfully (ID: ${taskObject.id})`);
        taskCLI.prompt();
    } 
    catch(error) {
        console.error(error.message);
        taskCLI.prompt();
    }
}