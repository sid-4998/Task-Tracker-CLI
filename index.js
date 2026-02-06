import readline from 'readline';
import chalk from 'chalk';
import addTask from './modules/addTask.js';

console.log("=".repeat(20) + chalk.blue(' Welcome to Task Tracker CLI ') + "=".repeat(20));
console.log("*".repeat(3) + (' Instructions') + ":");
console.log("#" + ' Adding a task');
console.log("#" + chalk.yellow(' add ') + '"task"');
console.log("#" + ' Deleting tasks');
console.log("#" + chalk.red(' delete ') + chalk.blue('id1, id2, id3.....'));
console.log("#" + ' Deleting all tasks');
console.log("#" + chalk.red(' delete .'));
console.log("#" + ' Updating a task');
console.log("#" + chalk.yellowBright(' Update ') + chalk.blue('Id') + ' "new task"');
console.log("#" + ' Marking tasks done');
console.log("#" + chalk.green(' mark-done ') + chalk.blue('id1, id2, id3.....'));
console.log("#" + ' Marking tasks in progress');
console.log("#" + chalk.magenta(' mark-in-progress ') + chalk.blue('id1, id2, id3.....'));
console.log("#" + ' Marking all tasks done');
console.log("#" + chalk.green(' mark-done .'))
console.log("#" + ' Marking all tasks in progress');
console.log("#" + chalk.magenta(' mark-in-progress .'));
console.log("#" + ' Listing all tasks');
console.log("#" + chalk.gray(' list .'));
console.log("#" + ' Listing all pending tasks');
console.log("#" + chalk.gray(' list todo'));
console.log("#" + ' Listing all complete tasks');
console.log("#" + chalk.gray(' list done'));
console.log("#" + ' Listing all tasks in progress');
console.log("#" + chalk.gray(' list in-progress'));
 
const taskCLI = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'task> ',
});

taskCLI.prompt();

taskCLI.on('line', (line) => {
    let index = line.trim().indexOf(' ');
    const data = line.trim().slice(0,index);
    
    if(data === 'add') {
        addTask(line.trim().slice(index+1).trim());
    }
    taskCLI.prompt();
});

taskCLI.on('close', () => {
  console.log('Goodbye!');
  process.exit(0);
});
