import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Roleservice {
  http = inject(HttpClient);
  private roles: any[] = [];


   getNextId(): number {
  return this.roles.length > 0
    ? Math.max(...this.roles.map(role => role.id)) + 1
    : 1;
}

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/roles/getAll');
  }

  addRole(roleData: { roleName: string }): Observable<any> {
    return this.http.post('http://localhost:8080/roles/add', roleData);
  }



  updateRole(updatedRole: any): Observable<any> {
    const index = this.roles.findIndex(role => role.id === updatedRole.id);
    updatedRole.id = index !== -1 ? updatedRole.id : this.getNextId();
    if (index !== -1) {
      this.roles[index] = updatedRole;
      return this.http.put('http://localhost:8080/roles/update', updatedRole);
    } else {
      return null as any; // or handle the error as needed
    }
  }
  
}
