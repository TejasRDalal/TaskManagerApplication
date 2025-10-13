import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Createtaskservice {
  private data:any[] =[];

  getData(){
    return this.data;
  }

  addData(newItem: any):any {
    this.data.push(newItem);
    return newItem;
  }
}
