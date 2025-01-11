import {compareAsc, format} from "date-fns";

class Todo{

    constructor(task, deadline, priority){
        this.task = task;
        this.deadline = deadline;
        this.priority = priority;
        this.checked = false;
    }

    changeCheckStatus(){
        this.checked = !this.checked;
    }

    changePriority(newPrio){
        this.priority = newPrio;
    }

}