import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { Createtask } from "./createtask/createtask";
import { Dashboard } from './dashboard/dashboard';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Createtask, Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App {
  protected readonly title = signal('taskmanagerapplication');
}
