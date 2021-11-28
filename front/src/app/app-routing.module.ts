import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import { HomeComponent } from './home/home.component';

const routes = [
  {path: '', redirectTo: 'media-organizer', pathMatch: 'full'},
  {path: 'media-organizer', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
