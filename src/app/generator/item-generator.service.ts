import { Injectable } from '@angular/core';
import { Item } from '../data/item';
import { ReferenceDataService } from './reference-data.service';
import { ItemDescriptor } from '../data/ItemDescriptor';
import { Subject, Observable, from } from 'rxjs';
import { ItemSlot } from '../data/itemSlot';
import { sample } from 'lodash';
import { MainBonusRef } from '../data/referenceTables/mainBonusRef';

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
      descriptor.slot = this.getTerminalSlot(Object.assign({}, itemDescriptor.slot ?? this.generateRandomSlot()));

      items.push(new Item(descriptor, "fluff", this.selectMainBonus(descriptor), []));
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

  private getTerminalSlot(originSlot:ItemSlot): ItemSlot {
    if (originSlot.terminal) return originSlot;
    return this.getTerminalSlot(this.referenceDataService.slotsTable.find(s => s.parentSlotKey == originSlot.key));
  }

  private isCurrentOrParentSlot(originSlot:ItemSlot, searchedKey:string): boolean {
    if(originSlot.key == searchedKey) return true;
    else if(!originSlot.parentSlotKey) return false;
    return this.isCurrentOrParentSlot(this.referenceDataService.slotsTable.find(s => s.key == originSlot.parentSlotKey), searchedKey);
  }

  private selectMainBonus(descriptor:ItemDescriptor): string {
    let bonus: MainBonusRef[] = this.referenceDataService.mainBonusRef.filter(b => 
      descriptor.level >= b.minLevel 
      && descriptor.rarityIndex >= b.minRarityIndex 
      && this.isCurrentOrParentSlot(descriptor.slot, b.slotKey));
      
    if(bonus.length > 0){
      let sum: number = 0;
      let weightedBonus: WeightedBonus[] = [];
      for(let i:number = 0; i < bonus.length; i++){
        let curr = bonus[i];
        weightedBonus.push(new WeightedBonus(curr.weight + sum, curr));
        sum += curr.weight;
      }
      let rnd = Math.random() * sum;
      for(let i:number =0; i < weightedBonus.length; i++){
        let curr = weightedBonus[i];
        if(rnd <= curr.weight) return curr.bonus.bonus;
      }
    }
    return null;
  }


  private generatedItemsSource: Subject<Item[]> = new Subject();
  public generatedItems$: Observable<Item[]> = this.generatedItemsSource.asObservable();

}

class  WeightedBonus {
  constructor(public weight:number, public bonus:MainBonusRef) {    
  }
}
