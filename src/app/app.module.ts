import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemFormComponent } from './item-form/item-form.component';
import { GeneratedItemsListComponent } from './generated-items-list/generated-items-list.component';
import { GeneratedItemComponent } from './generated-item/generated-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemFormComponent,
    GeneratedItemsListComponent,
    GeneratedItemComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
