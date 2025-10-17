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
  selectedRoleId: number | null = null;

  constructor(private roleservice: Roleservice, private router: Router) {}

  ngOnInit(): void {
    this.loadRoles();
}

onDeleteRole(): void {
  if (confirm('Are you sure you want to delete this role?')) {
    if (this.selectedRoleId != null) {
      this.roleservice.deleteRole(this.selectedRoleId).subscribe({
        next: (res) => console.log('Role deleted:', res),
        error: (err) => console.error('Delete failed:', err)
      });
    } else {
      console.warn('No role selected for deletion.');
    }
}
}

  roleUpdate(role: any) {
    // Implement update logic or navigation here
    console.log('Navigating to update role:', role);
    this.router.navigate(['/role/add'],{
      state: { 
        taskToUpdate: role
       }
    });
  }

  loadRoles(): void {
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

 roleDelete(role: any): void {
  const roleId = role.id; // extract the ID
  console.log('Attempting to delete role with ID:', roleId);
  if (confirm(`Are you sure you want to delete role "${role.roleName}"?`)) {
    this.roleservice.deleteRole(roleId).subscribe({
      next: (res) => {
        console.log('Role deleted:', res);
        this.loadRoles(); // reload the list after deletion
      },
      error: (err) => console.error('Delete failed:', err)
    });
  }
}
}
