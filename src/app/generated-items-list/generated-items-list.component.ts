import { Component, OnDestroy } from '@angular/core';
import { ItemGeneratorService } from '../generator/item-generator.service';
import { Subscription } from 'rxjs';
import { Item } from '../data/item';
import { sortBy } from 'lodash';

@Component({
  selector: 'app-generated-items-list',
  templateUrl: './generated-items-list.component.html',
  styleUrls: ['./generated-items-list.component.css']
})
export class GeneratedItemsListComponent implements OnDestroy {

  public itemsList:Item[] = [];
  private subscription: Subscription;

  constructor(public itemGeneratorService:ItemGeneratorService) {

    this.subscription = itemGeneratorService.generatedItems$.subscribe(list => {
      this.itemsList.length =0;
      if(list){
        this.itemsList = sortBy(list, ['fluffName', 'descriptor.level', 'descriptor.rarityIndex', 'descriptor.slot.name']);
      }      
    });
   }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
