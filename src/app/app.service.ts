import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tarea } from './models/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private firestore: AngularFirestore) { }

  obtenerTareas(): Observable<Tarea[]> {
    return this.firestore.collection('tareas')
    .valueChanges({ idField: 'id' })
    .pipe(map( obj => {
      const tarea: Tarea[] = obj.map(
        (x:any) => ({id: x.id, nombre: x.nombre, estado: x.estado})
      );
      return tarea;
    }));
  }

}
