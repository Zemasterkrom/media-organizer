import { NgModule } from '@angular/core';
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
import { NoteFormComponent } from './shared/note-form/note-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { OnlineVideoFormComponent } from './shared/online-video/online-video-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryCardComponent,
    AddResourceComponent,
    NoteFormComponent,
    OnlineVideoFormComponent
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
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
