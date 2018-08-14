import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  name = "Microsoft";
  menu = [
    {
      path: '/',
      label: 'Home'
    },
    {
      path: '/one',
      label: 'One'
    },
    {
      path: '/two',
      label: 'Two'
    }
  ]
}
