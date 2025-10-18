import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Roleservice {
  http = inject(HttpClient);
  private roles: any[] = [];
   private apiUrl = 'http://localhost:8080/roles';

  getNextId(): number {
    return this.roles.length > 0
      ? Math.max(...this.roles.map(role => role.id)) + 1
    : 1;
}

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAll`);
  }

  addRole(roleData: { roleName: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, roleData);
  }


  updateRole(updatedRole: any): Observable<any> {
    console.log('Updated Role:', updatedRole);
      return this.http.put(`${this.apiUrl}/update`, updatedRole);
  }

  deleteRole(roleId: number): Observable<any> {
    console.log('Roleservice deleteRole called with ID:', roleId);
  const url = `${this.apiUrl}/delete/${roleId}`;
  console.log('Deleting role with ID:', roleId);
  return this.http.delete(url);
}
  
}
