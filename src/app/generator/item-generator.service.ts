import { Injectable } from '@angular/core';
import { Item } from '../data/item';
import { ReferenceDataService } from './reference-data.service';
import { ItemDescriptor } from '../data/ItemDescriptor';
import { Subject, Observable, from } from 'rxjs';
import { ItemSlot } from '../data/itemSlot';
import { sample } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ItemGeneratorService {

  constructor(private referenceDataService: ReferenceDataService) { }

  public generate(itemDescriptor:ItemDescriptor, nbToGenerate: number = 10)
  {
    console.log(itemDescriptor);
    let items: Item[] = [];
    for(let i:number = 0; i < nbToGenerate; i++){
      let descriptor: ItemDescriptor = new ItemDescriptor();
      descriptor.level = itemDescriptor.level ?? this.generateRandomLevel();
      descriptor.rarityIndex = itemDescriptor.rarityIndex ?? this.generateRandomRarityIndex();
      descriptor.slot = Object.assign({}, itemDescriptor.slot ?? this.generateRandomSlot());

      items.push(new Item(descriptor, "fluff", "main bonus", []));
    }

    this.generatedItemsSource.next(items);
  }


  private generateRandomLevel(): number {
    return Math.floor(1 + Math.random() *10);
  }

  private generateRandomSlot(): ItemSlot {
    return sample(this.referenceDataService.slotsTable);
  }

  private generateRandomRarityIndex(): number {
    return sample(this.referenceDataService.rarityTable).rarityIndex;    
  }

  private generatedItemsSource: Subject<Item[]> = new Subject();
  public generatedItems$: Observable<Item[]> = this.generatedItemsSource.asObservable();

}
