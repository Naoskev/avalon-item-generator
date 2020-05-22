import { Injectable } from '@angular/core';

import {deserializeArray} from "class-transformer";
import {rarity} from '../../../json-reference-tables/rarity';
import {secondaryBonus} from '../../../json-reference-tables/secondaryBonus';
import { RarityRef } from '../data/referenceTables/rarityRef';
import { SecondaryBonusRef } from '../data/referenceTables/secondaryBonusRef';
import {slots} from '../../../json-reference-tables/slots';
import { ItemSlot } from '../data/itemSlot';

@Injectable({
  providedIn: 'root'
})
export class ReferenceDataService {

  constructor() { 

    console.log("deserialize !");
    this.rarityTable = rarity; //deserializeArray(RarityRef, rarityData);
    this.secondaryBonusRef = secondaryBonus;// deserializeArray(SecondaryBonusRef, secondaryBonusData);
    this.slotsTable = slots;
  }

  public rarityTable: RarityRef[];

  public secondaryBonusRef: SecondaryBonusRef[];

  public slotsTable: ItemSlot[];

}
