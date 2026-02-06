import fs from 'fs/promises';

const tasks = [];
export default async function addTask(task) {
    try {
        const taskObject = {
            id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
            description: task,
            status: 'todo',
            createdAt: new Date(),
            updatedAt: new Date()
        }
        tasks.push(taskObject)
        await fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2), 'utf-8');
    } 
    catch(error) {
        console.error(error.message);
    }
}