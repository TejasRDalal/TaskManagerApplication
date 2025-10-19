import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { Userservice } from '../../userservice';

@Component({
  selector: 'app-view-user',
  imports: [],
  templateUrl: './view-user.html',
  styleUrl: './view-user.css'
})
export class ViewUser implements OnInit {

  users: any[] = [];

  constructor(private userservice: Userservice, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers() {
    this.userservice.getAllUsers().subscribe((data) => {
      console.log('Users loaded:', data);
      this.users = data;
    });
  }

  userUpdate(user: any) {
    console.log('Navigating to edit user:', user);
  this.router.navigate(['/user/add'],{
      state: { 
        taskToUpdate: user
       }
    });
}

  userDelete(user: any) {
    if (confirm('Are you sure you want to delete this role?')) {
    this.userservice.deleteUser(user.userId).subscribe({
      next: () => {
        console.log('User deleted');
        this.loadUsers();
      },
      error: err => console.error('Error deleting user', err)
    });
  }
}

}
