import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Roleservice } from '../../roleservice';
import { Userservice } from '../../userservice';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.css'
})
export class AddUser {

  userTaskForm: FormGroup;
  isUpdateMode: boolean | undefined;
  roles: any[] = [];
  taskToUpdate: any = null;


  onCreateUser(): void {
  if (this.userTaskForm.valid) {
    const formValue = this.userTaskForm.value;
    const payload = this.getPayload(formValue);
    if (this.isUpdateMode) {
      console.log('Updating user with payload:', payload);
      this.userservice.updateUser(payload).subscribe({
        next: () => console.log('User updated'),
        error: err => console.error('Error updating user', err)
      });
      this.isUpdateMode = false;
    this.userTaskForm.reset();
    } else {
      console.log('Creating user with payload:', payload);
    this.userservice.createUser(payload).subscribe({
      next: () => console.log('User created'),
      error: err => console.error('Error creating user', err)
    });
    this.userTaskForm.reset();
  }
  }
}

  


constructor(private fb: FormBuilder, private roleservice: Roleservice, private userservice: Userservice) {
  
  this.userTaskForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
  middleName: ['', [Validators.required, Validators.minLength(3)]],
  lastName: ['', [Validators.required, Validators.minLength(3)]],
    role: this.fb.group({
    id: [null, Validators.required]
  })

  });
}

  private getPayload(formValue: any) {
    return {
      firstName: formValue.firstName,
      middleName: formValue.middleName,
      lastName: formValue.lastName,
      role: {
        id: Number(formValue.role.id)
      },
      userId: this.isUpdateMode ? this.taskToUpdate?.userId : undefined
    };
  }

ngOnInit(): void {
  const state = history.state;
  this.taskToUpdate = state.taskToUpdate || null;


  this.roleservice.getRoles().subscribe((data) => {
    this.roles = data;
    console.log('Roles loaded:', data);

    // Now that roles are loaded, patch the form
    if (this.taskToUpdate) {
      this.isUpdateMode = true;

      this.userTaskForm.patchValue({
        ...this.taskToUpdate,
        role: {
          id: this.taskToUpdate.role?.id || ''
        }
      });
    } else {
      this.isUpdateMode = false;
    }
  });
}

}
