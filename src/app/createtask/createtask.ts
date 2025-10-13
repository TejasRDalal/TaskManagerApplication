import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Createtaskservice } from '../createtaskservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createtask',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './createtask.html',
  styleUrl: './createtask.css',
  standalone: true
})
export class Createtask implements OnInit {

taskForm: FormGroup;
isUpdateMode: boolean = false;

  private nextId: number = 0; 
  id: number | undefined;
  taskName: string | undefined;
description: string | undefined;
dueDate: string | undefined;
status: string | undefined;

  constructor(private createtaskservice: Createtaskservice, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  


  /*onCreateTask() {
    const newTask = {
      id: this.nextId++,
      name: this.taskName,
      description: this.description,
      dueDate: this.dueDate,
      status: this.status
    };
    console.log('Creating task:', newTask);
    this.createtaskservice.addData(newTask);
  }*/

     onCreateTask(): void {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      
      if (this.isUpdateMode) {
        this.createtaskservice.updateData(taskData);

        console.log('Updating task:', taskData);
        // Call your service to update the task
      } else {
        // Assume you need an ID for new tasks. This is for demonstration.
        // The service should likely handle the ID.
        // taskData.id = this.createtaskservice.getNextId(); 
         taskData.id = this.createtaskservice.getNextId(); // Auto-increment ID

        console.log('Creating task:', taskData);
        this.createtaskservice.addData(taskData);
      }
      
      this.taskForm.reset();
      this.isUpdateMode = false;
      // this.router.navigate(['/task-list']); // Navigate back to list after action
    } else {
      console.log('Form is invalid.');
    }
  }

   ngOnInit(): void {
    const state = history.state;
    if (state.taskToUpdate) {
      this.isUpdateMode = true;
      this.taskForm.patchValue(state.taskToUpdate); // Patch using the exact object
    }
  }

}
