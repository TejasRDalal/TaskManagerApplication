import { Component, OnInit } from '@angular/core';
import { Roleservice } from '../../roleservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  imports: [],
  templateUrl: './view.html',
  styleUrl: './view.css'
})
export class View implements OnInit {
  roles: any[] = [];

  constructor(private roleservice: Roleservice, private router: Router) {}

  ngOnInit(): void {
  this.roleservice.getRoles().subscribe({
    next: (data: any[]) => {
      this.roles = data; // Now it's a real array
      console.log('Roles loaded:', this.roles);
    },
    error: (err) => {
      console.error('Failed to load roles:', err);
    }
  });
}

  roleUpdate(role: any) {
    // Implement update logic or navigation here
    this.router.navigate(['/role/add'],{
      state: { 
        taskToUpdate: role
       }
    });
  }

  roleDelete(role: any) {
    // Implement delete logic here
    const index = this.roles.findIndex(r => r.id === role.id);
    if (index !== -1) {
      this.roles.splice(index, 1);
      console.log('Deleted role:', role);
    }
    this.roleservice.getRoles().subscribe({
    next: (data: any[]) => {
      this.roles = data; // Now it's a real array
      console.log('Roles loaded:', this.roles);
    },
    error: (err) => {
      console.error('Failed to load roles:', err);
    }
  });
  }
}
