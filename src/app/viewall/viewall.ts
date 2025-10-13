import { Component, OnInit } from '@angular/core';
import { Createtaskservice } from '../createtaskservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewall',
  imports: [],
  templateUrl: './viewall.html',
  styleUrl: './viewall.css'
})
export class Viewall implements OnInit {
  tasks: any[] = [];

  constructor(private createtaskservice: Createtaskservice,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.tasks = this.createtaskservice.getData();
    console.log('Loaded tasks:', this.tasks);
  }

  onUpdate(task: any) {
    // Implement update logic or navigation here
    this.router.navigate(['/create'],{
      state: { 
        taskToUpdate: task
       }
    });
  }

  onDelete(task: any) {
    // Implement delete logic here
    const index = this.tasks.findIndex(t => t.id === task.id);

  if (index !== -1) {
    this.tasks.splice(index, 1);
  }
    this.tasks = this.createtaskservice.getData(); // Refresh the local tasks array
  }

}
