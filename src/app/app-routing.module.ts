import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComponent } from './pages/lista/lista.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { EditarComponent } from './pages/editar/editar.component';


const routes: Routes = [
  {path: 'lista', component: ListaComponent},
  {path: 'agregar', component: AgregarComponent},
  {path: 'editar/:id', component: EditarComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'lista'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
