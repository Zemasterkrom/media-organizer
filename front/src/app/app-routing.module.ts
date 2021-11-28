import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import { HomeComponent } from './home/home.component';
import {AddResourceComponent} from "./add-resource/add-resource.component";

const routes = [
  {path: '', redirectTo: 'media-organizer', pathMatch: 'full'},
  {path: 'media-organizer', component: HomeComponent},
  {path: 'media-organizer/add', component: AddResourceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
