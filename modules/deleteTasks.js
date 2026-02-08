import fs from 'fs/promises';
import taskCLI from '../index.js';

export default async function deleteTasks(command) {
    try {
        const data = await fs.readFile('tasks.json', 'utf-8');
        let tasks = JSON.parse(data);
        if(command[0] === '.' && command.length === 1) {
            await fs.writeFile('tasks.json', JSON.stringify([], null, 2), 'utf-8');
            console.log('Deleted all tasks');
            taskCLI.prompt();
        } else {
            const tasksToDelete = command.split(',');
            const tasksPresent = tasks.map(t => t.id);
            tasksToDelete.map(td => {
                if(tasksPresent.indexOf(td) === -1) {
                    throw new Error(`Task with Id ${td} is not present`);
                }
            })
            tasksToDelete.map(td => tasks = tasks.filter(t => parseInt(t.id) !== parseInt(td)));
            await fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2), 'utf-8');
            if(tasksToDelete.length > 1) {
                console.log(`Deleted tasks with IDs ${tasksToDelete.map(t => t)}`)
                taskCLI.prompt();
            } else {
                console.log(`Deleted task with ID ${tasksToDelete[0]}`)
                taskCLI.prompt();
            }
        }     
    } catch(error) {
        if(error.code !== 'ENOENT') {
            console.error(error.message);
            taskCLI.prompt();
        } else {
            console.error('No tasks to delete');
            taskCLI.prompt();
        }
    }
}