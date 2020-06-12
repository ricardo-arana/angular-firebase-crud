import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tarea } from './models/tarea.model';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  private tareaCollection = 'tareas';
  constructor(private firestore: AngularFirestore) { }

  obtenerTareas(): Observable<Tarea[]> {
    return this.firestore.collection(this.tareaCollection)
    .valueChanges({ idField: 'id' })
    .pipe(map( obj => {
      let tarea: Tarea[] = obj.map(
        (x:any) => ({id: x.id, nombre: x.nombre, estado: x.estado})
      )
      tarea = _.orderBy(tarea, ['estado'], ['desc'])
      return tarea;
    }));
  }

  agregarTarea(tarea: Tarea) {
    return this.firestore.collection(this.tareaCollection)
    .add(tarea);
  }

  obtenerTarea(id: string): Observable<Tarea> {
    return this.firestore.collection(this.tareaCollection)
            .doc(id).valueChanges()
            .pipe(map(({nombre, estado}: any) => ({nombre, estado}) as Tarea) );
  }

  editarTarea(tarea: Tarea) {
    return this.firestore.collection(this.tareaCollection)
      .doc(tarea.id).set(tarea);
  }

  borrarTarea(id: string) {
    return this.firestore.collection(this.tareaCollection)
      .doc(id).delete();
  }

}
