import { Injectable } from '@angular/core';

import {rarity} from '../../../json-reference-tables/rarity';
import {secondaryBonus} from '../../../json-reference-tables/secondaryBonus';
import {secondaryBonusCombination} from '../../../json-reference-tables/secondaryBonusCombination';
import {mainBonus} from '../../../json-reference-tables/mainBonus';
import { RarityRef } from '../data/referenceTables/rarityRef';
import { SecondaryBonusRef } from '../data/referenceTables/secondaryBonusRef';
import {slots} from '../../../json-reference-tables/slots';
import { ItemSlot } from '../data/itemSlot';
import { SecondaryBonusCombinationRef } from '../data/referenceTables/secondaryBonusCombinationRef';
import { MainBonusRef } from '../data/referenceTables/mainBonusRef';

@Injectable({
  providedIn: 'root'
})
export class ReferenceDataService {

  constructor() { 

    console.log("deserialize !");
    this.rarityTable = rarity; //deserializeArray(RarityRef, rarityData);
    this.secondaryBonusRef = secondaryBonus;// deserializeArray(SecondaryBonusRef, secondaryBonusData);
    this.slotsTable = slots;
    this.secondaryBonusCombinationRef = secondaryBonusCombination;
    this.mainBonusRef = mainBonus;
  }

  public rarityTable: RarityRef[];

  public secondaryBonusRef: SecondaryBonusRef[];

  public secondaryBonusCombinationRef: SecondaryBonusCombinationRef[];

  public mainBonusRef: MainBonusRef[];

  public slotsTable: ItemSlot[];

}
