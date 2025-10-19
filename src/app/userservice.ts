import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Userservice {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/users';

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, userData);
  }

  updateUser(userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, userData);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${userId}`);
  }

  /*getUserById(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get/${userId}`);
  }*/

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAll`);
  }
}
  
