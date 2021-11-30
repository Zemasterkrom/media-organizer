import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import { HomeComponent } from './home/home.component';
import {AddResourceComponent} from "./add-resource/add-resource.component";
import {NoteListComponent} from "./items-list/note-list/note-list.component";
import {OnlineVideoListComponent} from "./items-list/online-video-list/online-video-list.component";

const routes = [
  {path: '', redirectTo: 'media-organizer', pathMatch: 'full'},
  {path: 'media-organizer', component: HomeComponent},
  {path: 'media-organizer/add', component: AddResourceComponent},
  {path: 'media-organizer/notes', component: NoteListComponent},
  {path: 'media-organizer/links', component: OnlineVideoListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
