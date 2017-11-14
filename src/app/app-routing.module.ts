import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main-component/main-component.component';


const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
  }

];



@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})


export class AppRoutingModule { }
