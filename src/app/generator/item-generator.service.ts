import { Injectable } from '@angular/core';
import { Item } from '../data/item';
import { ReferenceDataService } from './reference-data.service';
import { ItemDescriptor } from '../data/ItemDescriptor';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ItemGeneratorService {

  constructor(private referenceDataService: ReferenceDataService) { }

  public generate(itemDescriptor:ItemDescriptor, nbToGenerate: number = 10)
  {

    let items: Item[] = [];
    for(let i:number = 0; i < nbToGenerate; i++){
      items.push(new Item(itemDescriptor, "fluff", "main bonus", []));
    }

    this.generatedItemsSource.next(items);
  }

  private generatedItemsSource: Subject<Item[]> = new Subject();
  public generatedItems$: Observable<Item[]> = this.generatedItemsSource.asObservable();

}
