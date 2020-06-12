import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/models/tarea.model';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  tareas: Observable<Tarea[]>;
  constructor(private appService: AppService) {
    this.tareas = this.appService.obtenerTareas();
  }

  ngOnInit(): void {
    Swal.fire({
      icon: 'info',
      title: 'Obteniendo las tareas'
    });
    Swal.showLoading();
    this.tareas.subscribe(()=> Swal.close());
  }

}
