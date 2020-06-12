import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  id: string;
  forma: FormGroup;
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params =>{
      this.id = params['id'].toString();
    });
    this.forma = new FormGroup({
      nombre: new FormControl(),
      estado: new FormControl()
    });
   }

  ngOnInit(): void {
  }

  editar() {
    
  }

}
