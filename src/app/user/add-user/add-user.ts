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

  onCreateUser(): void {
  if (this.userTaskForm.valid) {
    const formValue = this.userTaskForm.value;

    const payload = {
      firstName: formValue.firstName,
      middleName: formValue.middleName,
      lastName: formValue.lastName,
      role: {
        id: Number(formValue.role.id) // ensure it's a number
      }
    };

    console.log('Creating user with payload:', payload);

    this.userservice.createUser(payload).subscribe({
      next: () => console.log('User created'),
      error: err => console.error('Error creating user', err)
    });
    this.userTaskForm.reset();
  }
}

  


constructor(private fb: FormBuilder, private roleservice: Roleservice, private userservice: Userservice) {
  
  this.userTaskForm = this.fb.group({
    firstName: ['', Validators.required],
    middleName: ['', Validators.required],
    lastName: ['', Validators.required],
    role: this.fb.group({
    id: [null, Validators.required]
  })

  });
}

ngOnInit(): void {
  this.roleservice.getRoles().subscribe((data) => {
    this.roles = data;
  });
}

}
