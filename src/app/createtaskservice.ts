import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Createtaskservice {
  private data:any[] =[];




  getNextId(): number {
  return this.data.length > 0
    ? Math.max(...this.data.map(task => task.id)) + 1
    : 1;
}
  getData(){
    return this.data;
  }

  addData(newItem: any):any {
    this.data.push(newItem);
    return newItem;
  }

  updateData(updatedTask: any): void {
  const index = this.data.findIndex(task => task.id === updatedTask.id);
  if (index !== -1) {
    this.data[index] = updatedTask;
  }
}
}
