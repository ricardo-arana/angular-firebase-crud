import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { Tarea } from 'src/app/models/tarea.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  forma: FormGroup;
  constructor(private appService: AppService, private router: Router) {
    this.forma = new FormGroup({
      nombre: new FormControl('', Validators.required),
      estado: new FormControl('PENDIENTE', Validators.required)
    });
   }

  ngOnInit(): void {
  
  }

  guardar() {
    console.log(this.forma.value);
    Swal.fire({
      title: 'Creando su tarea'
    });
    Swal.showLoading();
    const {nombre, estado} = this.forma.value;
    const tarea: Tarea = {nombre, estado};
    this.appService.agregarTarea(tarea)
    .then(() => {
      Swal.close();
      this.router.navigate(['/lista']);
    })
    .catch(err => {
      console.error(err);
    });
  }

}
