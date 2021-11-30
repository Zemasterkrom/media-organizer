import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {HttpClientModule} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import { HomeComponent } from './home/home.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import {MatCardModule} from "@angular/material/card";
import {AppRoutingModule} from "./app-routing.module";
import {MatButtonModule} from "@angular/material/button";
import { AddResourceComponent } from './add-resource/add-resource.component';
import {MatTabsModule} from "@angular/material/tabs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NoteFormComponent } from './shared/form/note-form/note-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { OnlineVideoFormComponent } from './shared/form/online-video/online-video-form.component';
import { ResourceListComponent } from './shared/resource-list/resource-list.component';
import {MatTableModule} from "@angular/material/table";
import { NoteListComponent } from './items-list/note-list/note-list.component';
import {NumkeysPipe} from "./shared/pipes/numkeys.pipe";
import {KeysPipe} from "./shared/pipes/keys.pipe";
import {FormatPipe} from "./shared/pipes/format.pipe";
import {registerLocaleData} from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import {OnlineVideoListComponent} from "./items-list/online-video-list/online-video-list.component";
registerLocaleData(localeFr)

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryCardComponent,
    AddResourceComponent,
    NoteFormComponent,
    OnlineVideoFormComponent,
    ResourceListComponent,
    OnlineVideoListComponent,
    NoteListComponent,
    NoteListComponent,
    NumkeysPipe,
    KeysPipe,
    FormatPipe
  ],
  imports: [
    BrowserModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    HttpClientModule,
    MatIconModule,
    RouterModule,
    MatCardModule,
    AppRoutingModule,
    MatButtonModule,
    MatTabsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
