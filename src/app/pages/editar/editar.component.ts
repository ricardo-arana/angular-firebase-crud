import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';
import { Tarea } from 'src/app/models/tarea.model';
@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  id: string;
  forma: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,
              private appService: AppService,
              private router: Router) {
    Swal.fire(
      {
        icon: 'info',
        title: 'Cargando Tarea'
      }
    );
    Swal.showLoading();
    this.activatedRoute.params.subscribe(params =>{
      this.id = params['id'].toString();
      this.appService.obtenerTarea(this.id).subscribe(
        ({nombre, estado}) => {
          this.forma.get('nombre').setValue(nombre);
          this.forma.get('estado').setValue(estado);
          Swal.close();
        }
      );
    });
    this.forma = new FormGroup({
      nombre: new FormControl(),
      estado: new FormControl()
    });
   }

  ngOnInit(): void {
  }

  editar() {
    const tarea: Tarea = {
      id: this.id,
      nombre: this.forma.value.nombre,
      estado: this.forma.value.estado
    };
    this.appService.editarTarea(tarea)
    .then(()=> {
      this.router.navigate(['/lista']);
    })
    .catch( err=> {
      console.error(err);
    });
  }

}
