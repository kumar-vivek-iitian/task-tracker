#!/usr/bin/env node
import { listTasks, deleteTask, addTask, updateTask, markDone, markProgress } from "./util.js";

const args = process.argv.slice(2);
let command = args[0];
let input = args[1];
let updatedInfo = args[2];

switch (command) {
    case "list" :
        if (input) {
            listTasks(input);
        } else {
            listTasks(0);
        }
        break;
    case "add" :
        addTask(input);
        break;
    case "update" :
        updateTask(input, updatedInfo);
        break;
    case "mark-done" :
        markDone(input);
        break;
    case "mark-in-progress" :
        markProgress(input);
        break;
    case "delete" :
        deleteTask(input);
        break;
        
    default:
        console.log("command not found");
}