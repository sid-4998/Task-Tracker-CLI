import readline from 'readline';
import chalk from 'chalk';
import addTask from './modules/addTask.js';
import deleteTasks from './modules/deleteTasks.js';
import updateTasks from './modules/updateTasks.js';

console.log("=".repeat(20) + chalk.blue(' Welcome to Task Tracker CLI ') + "=".repeat(20));
console.log("*".repeat(3) + (' Instructions') + ":");
console.log("#" + ' Adding a task');
console.log("#" + chalk.yellow(' add ') + '"task"');
console.log("#" + ' Deleting tasks');
console.log("#" + chalk.red(' delete ') + 'id1, id2, id3.....');
console.log("#" + ' Deleting all tasks');
console.log("#" + chalk.red(' delete ') + '.');
console.log("#" + ' Updating a task');
console.log("#" + chalk.yellowBright(' Update ') + 'Id' + ' "new task"');
console.log("#" + ' Marking tasks done');
console.log("#" + chalk.green(' mark-done ') + 'id1, id2, id3.....');
console.log("#" + ' Marking tasks in progress');
console.log("#" + chalk.magenta(' mark-in-progress ') + 'id1, id2, id3.....');
console.log("#" + ' Marking all tasks done');
console.log("#" + chalk.green(' mark-done ') + '.')
console.log("#" + ' Marking all tasks in progress');
console.log("#" + chalk.magenta(' mark-in-progress ') + '.');
console.log("#" + ' Listing all tasks');
console.log("#" + chalk.gray(' list ') + '.');
console.log("#" + ' Listing all pending tasks');
console.log("#" + chalk.gray(' list ') + chalk.yellow('todo'));
console.log("#" + ' Listing all complete tasks');
console.log("#" + chalk.gray(' list ') + chalk.green('done'));
console.log("#" + ' Listing all tasks in progress');
console.log("#" + chalk.gray(' list ') + chalk.magenta('in-progress'));
 
const taskCLI = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'task> ',
});

const higlighting = {
    'add': chalk.yellow("add"),
    'todo': chalk.yellow("todo"),
    'delete': chalk.red("delete"),
    'update': chalk.yellowBright("update"),
    'done': chalk.green("done"),
    'mark-done': chalk.green("mark-done"),
    'in-progress': chalk.magenta("in-progress"),
    'mark-in-progress': chalk.magenta("mark-in-progress"),
    'list': chalk.gray("list")
}

process.stdin.on('keypress', () => {
    setTimeout(() => {
        taskCLI._refreshLine();
    }, 0);
});

const regex = new RegExp(Object.keys(higlighting).join('|'), 'g');
taskCLI._writeToOutput = (syntax) => {
    taskCLI.output.write(syntax.replace(regex, match => higlighting[match]));
}

taskCLI.prompt();

taskCLI.on('line', (line) => {
    let index = line.trim().indexOf(' ');
    const data = line.trim().slice(0,index);

    if(data === 'add') {
        addTask(line.trim().slice(index+1).trim());
    } else if(data === 'delete') {
        deleteTasks(line.trim().slice(index+1).trim());
    } else if(data === 'update') {
        updateTasks(line.trim().slice(index+1).trim());
    }
    taskCLI.prompt();
});

taskCLI.on('close', () => {
  console.log('Goodbye!');
  process.exit(0);
});

export default taskCLI;