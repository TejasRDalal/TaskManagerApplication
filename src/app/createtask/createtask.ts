import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Createtaskservice } from '../createtaskservice';

@Component({
  selector: 'app-createtask',
  imports: [FormsModule],
  templateUrl: './createtask.html',
  styleUrl: './createtask.css'
})
export class Createtask {

  private nextId: number = 1; 
  id: number | undefined;
  taskName: string | undefined;
description: string | undefined;
dueDate: string | undefined;
status: string | undefined;
  isUpdateMode: boolean | undefined;
  taskForm: any;

  constructor(private createtaskservice: Createtaskservice) {
  }

  onCreateTask() {
    const newTask = {
      id: this.nextId++,
      name: this.taskName,
      description: this.description,
      dueDate: this.dueDate,
      status: this.status
    };
    console.log('Creating task:', newTask);
    this.createtaskservice.addData(newTask);
  }

  ngOnInit(): void {
    const state = history.state; // Retrieve state object
    
    // Check if the state contains task data for an update
    if (state.taskToUpdate) {
      this.isUpdateMode = true;
      // Use patchValue() to set the form controls with the task's data
      this.taskForm.patchValue(state.taskToUpdate);
    }
  }

}
