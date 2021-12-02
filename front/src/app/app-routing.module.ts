import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import { HomeComponent } from './home/home.component';
import {AddResourceComponent} from "./add-resource/add-resource.component";
import {NoteListComponent} from "./items-list/note-list/note-list.component";
import {OnlineVideoListComponent} from "./items-list/online-video-list/online-video-list.component";
import {UpdateNoteFormComponent} from "./shared/form/note-form/update-note-form.component";
import {UpdateOnlineVideoFormComponent} from "./shared/form/online-video/update-online-video-form.component";
import {UpdateDocumentFormComponent} from "./shared/form/file-form/update-document-form.component";
import {DocumentListComponent} from "./items-list/document-list/document-list.component";

const routes = [
  {path: '', redirectTo: 'media-organizer', pathMatch: 'full'},
  {path: 'media-organizer', component: HomeComponent},
  {path: 'media-organizer/add', component: AddResourceComponent},
  {path: 'media-organizer/notes', component: NoteListComponent},
  {path: 'media-organizer/notes/update/:id', component: UpdateNoteFormComponent},
  {path: 'media-organizer/links', component: OnlineVideoListComponent},
  {path: 'media-organizer/links/update/:id', component: UpdateOnlineVideoFormComponent},
  {path: 'media-organizer/documents', component: DocumentListComponent},
  {path: 'media-organizer/documents/update/:id', component: UpdateDocumentFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
