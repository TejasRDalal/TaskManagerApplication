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
  selectedRoleId: number | null = null;


  constructor(private roleservice: Roleservice, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      id: [null],
      roleName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log('History state:', history.state);
    const state = history.state;
    if (state.taskToUpdate) {
      this.isUpdateMode = true;
      this.selectedRoleId = state.taskToUpdate.id;
      console.log('Updating role with ID:', this.selectedRoleId);
      this.taskForm.patchValue(state.taskToUpdate); // Patch using the exact object
    }
  }

  onAddRole(): void {
  if (this.taskForm.valid) {
    const roleData = this.taskForm.value;
    if (this.isUpdateMode) {
      const updatedRole = { ...roleData, id: this.selectedRoleId };
      console.log('Update data ', updatedRole);
      this.roleservice.updateRole(updatedRole).subscribe({
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
