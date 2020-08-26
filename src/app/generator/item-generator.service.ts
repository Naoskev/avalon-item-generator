
import { Injectable } from '@angular/core';
import { Item } from '../data/item';
import { ReferenceDataService } from './reference-data.service';
import { ItemDescriptor } from '../data/ItemDescriptor';
import { Subject, Observable, from } from 'rxjs';
import { ItemSlot } from '../data/itemSlot';
import { sample, orderBy } from 'lodash';
import { MainBonusRef } from '../data/referenceTables/mainBonusRef';
import { rarity } from 'json-reference-tables/rarity';
import { SecondaryBonusCombinationRef } from '../data/referenceTables/secondaryBonusCombinationRef';
import { ItemSecondaryBonus } from '../data/itemSecondaryBonus';
import { BonusKind, ElementKind } from '../data/secondaryBonusDescriptor';

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
      descriptor.rarityIndex = itemDescriptor.rarityIndex ?? this.generateRandomRarityIndex(itemDescriptor.level);
      descriptor.rarityName = this.referenceDataService.rarityTable.find(r => r.rarityIndex == descriptor.rarityIndex).rarityName;
      descriptor.level = itemDescriptor.level ?? this.generateRandomLevel(descriptor.rarityIndex);
      descriptor.slot = this.getTerminalSlot(Object.assign({}, itemDescriptor.slot ?? this.generateRandomSlot()));

      let combination: SecondaryBonusCombinationRef = orderBy(this.referenceDataService.secondaryBonusCombinationRef
        .filter(sbc => this.isCurrentOrParentSlot(descriptor.slot, sbc.slotKey) && descriptor.level >= sbc.minLevel && descriptor.rarityIndex >= sbc.minRarityIndex),
        ["minLevel", "minRarityIndex"], ["desc", "desc"])[0];

      let secondaryVals = this.referenceDataService.secondaryBonusRef.find(sbr => sbr.level == descriptor.level && sbr.rarityIndex == descriptor.rarityIndex);
      let secondaryBonus: ItemSecondaryBonus[] = [];
      for (let i:number =0; i < combination.elementsDefenseNumber; i++){
        let type = sample([BonusKind.HP, ElementKind.AIR, ElementKind.EARTH, ElementKind.FIRE, ElementKind.WATER]);
        let bn: ItemSecondaryBonus = null;
        if(type === BonusKind.HP){
          bn = new ItemSecondaryBonus(secondaryVals.HP, type, "");
        }
        else {
          bn = new ItemSecondaryBonus(secondaryVals.elementsDefense, BonusKind.ElementDefense, type as string);
        }
        secondaryBonus.push(bn);
      }
      for (let i:number =0; i < combination.elementsMasteryNumber; i++){
        let nature = sample(this.referenceDataService.elementsMasteries);
        secondaryBonus.push(new ItemSecondaryBonus(secondaryVals.elementsMastery, BonusKind.ElementMastery, nature));
      }
      for (let i:number =0; i < combination.lookNumber; i++){
        let nature = sample(this.referenceDataService.lookBonusRef);
        if(nature != null){
          secondaryBonus.push(new ItemSecondaryBonus(secondaryVals.look, BonusKind.Look, nature));
        }
      }

      items.push( 
        new Item(descriptor, this.selectMainBonus(descriptor), secondaryBonus)
              .buildName(this.referenceDataService.namesBySlot, this.referenceDataService.namesByLook, this.referenceDataService.namesByElements));
    }

    this.generatedItemsSource.next(items);
  }


  private generateRandomLevel(rarityIndex:number): number {
    let offset:number = 1;
    if (rarityIndex != null){
      let rarity = this.referenceDataService.rarityTable.find(r => r.rarityIndex == rarityIndex);
      offset = rarity.rarityMinLevel;
    }
    return Math.floor(offset + Math.random() * (11-offset));
  }

  private generateRandomSlot(): ItemSlot {
    return sample(this.referenceDataService.slotsTable.filter(st => st.terminal));
  }

  private generateRandomRarityIndex(level:number): number {
    let rarityRefs = this.referenceDataService.rarityTable;
    if (level != null){
      rarityRefs = rarityRefs.filter(rr => rr.rarityMinLevel <= level);
    }
    return sample(rarityRefs).rarityIndex;    
  }

  private getTerminalSlot(originSlot:ItemSlot): ItemSlot {
    if (originSlot.terminal) return originSlot;
    return sample(this.referenceDataService.slotsTable.filter(s => s.terminal && this.isCurrentOrParentSlot(s, originSlot.key)));
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
