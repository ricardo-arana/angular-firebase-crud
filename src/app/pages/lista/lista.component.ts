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

  completar(tarea: Tarea) {
    if( tarea.estado === 'COMPLETADO') {
      return;
    }
    const tareaNueva = {...tarea, estado: 'COMPLETADO'};
    this.appService.editarTarea(tareaNueva);
  }

  borrar(tarea: Tarea) {
    Swal.fire({
      title: '¿Estas segudo?',
      text: `Vas a eliminar la tarea ${tarea.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!'
    }).then((result) => {
      if (result.value) {
        this.appService.borrarTarea(tarea.id).then(() => {
          Swal.fire(
            'Borrado!',
            'La tarea fue eliminada.',
            'success'
          );
        }).catch(() => {
          Swal.fire(
            'Ups!',
            'ocurrio un error al intentar borrar la tarea.',
            'error'
          );
        });
        

      }
    })
    

  }

}
