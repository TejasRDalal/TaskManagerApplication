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
    console.log('Updated Role:', updatedRole);
      return this.http.put('http://localhost:8080/roles/update', updatedRole);
  }

  deleteRole(roleId: number): Observable<any> {
    console.log('Roleservice deleteRole called with ID:', roleId);
  const url = `http://localhost:8080/roles/delete/${roleId}`;
  console.log('Deleting role with ID:', roleId);
  return this.http.delete(url);
}
  
}
