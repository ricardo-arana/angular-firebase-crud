import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { Tarea } from './models/tarea.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firebase';
  
  constructor() {
    
  }
}
