import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Roleservice } from '../../roleservice';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add.html',
  styleUrl: './add.css'
})
export class Add implements OnInit {


  http = inject(HttpClient);
  taskForm: FormGroup;
  isUpdateMode = false;

   id: number | undefined;
  roleName: string | undefined;

  constructor(private roleservice: Roleservice, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      id: [null],
      roleName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const state = history.state;
    if (state.taskToUpdate) {
      this.isUpdateMode = true;
      this.taskForm.patchValue(state.taskToUpdate); // Patch using the exact object
    }
  }

  onAddRole(): void {
  if (this.taskForm.valid) {
    const roleData = this.taskForm.value;
    if (this.isUpdateMode) {
      console.log('Update data ', roleData);
      this.roleservice.updateRole(roleData).subscribe({
        next: (res) => console.log('Role updated:', res),
        error: (err) => console.error('Update failed:', err)
      });
      console.log('Updating role:', roleData);
    } else {
      console.log('Adding role:', roleData);
      this.roleservice.addRole(roleData).subscribe({
        next: (res) => console.log('Role added:', res),
        error: (err) => console.error('Add failed:', err)
      });
    }

    this.taskForm.reset();
    this.isUpdateMode = false;
  } else {
    console.log('Form is invalid.');
  }
}


  /*onAddRole(): void {
    if (this.taskForm.valid) {
      const roleData = this.taskForm.value;


      if (this.isUpdateMode) {
        this.roleservice.updateRole(roleData);
        console.log('Updating role:', roleData);
      } else {
        roleData.id = this.roleservice.getNextId(); // Auto-increment ID
        console.log('Adding role:', roleData);
        this.roleservice.addRole(roleData);
      }
      this.taskForm.reset();
      this.isUpdateMode = false;
    }
    else {
      console.log('Form is invalid.');
    }
  }*/
}
