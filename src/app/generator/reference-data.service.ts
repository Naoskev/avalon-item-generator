import { Injectable } from '@angular/core';

import {rarity} from '../../../json-reference-tables/rarity';
import {secondaryBonus} from '../../../json-reference-tables/secondaryBonus';
import {secondaryBonusCombination} from '../../../json-reference-tables/secondaryBonusCombination';
import {mainBonus} from '../../../json-reference-tables/mainBonus';
import {namesListBySlot} from '../../../json-reference-tables/nameListBySlot';
import {namesListByLook} from '../../../json-reference-tables/nameListByLook';
import {listByElements} from '../../../json-reference-tables/namesListByElements';
import { RarityRef } from '../data/referenceTables/rarityRef';
import { SecondaryBonusRef } from '../data/referenceTables/secondaryBonusRef';
import {slots} from '../../../json-reference-tables/slots';
import { ItemSlot } from '../data/itemSlot';
import { SecondaryBonusCombinationRef } from '../data/referenceTables/secondaryBonusCombinationRef';
import { MainBonusRef } from '../data/referenceTables/mainBonusRef';
import { NameListBySlot } from '../data/referenceTables/nameListBySlot';
import { NameListByLook } from '../data/referenceTables/nameListByLook';
import { NameListByElements } from '../data/referenceTables/nameListByElements';
import { ElementKind } from '../data/secondaryBonusDescriptor';

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
    this.namesBySlot = namesListBySlot;
    this.namesByLook = namesListByLook;
    this.namesByElements = listByElements;
  }

  public rarityTable: RarityRef[];

  public secondaryBonusRef: SecondaryBonusRef[];

  public secondaryBonusCombinationRef: SecondaryBonusCombinationRef[];

  public mainBonusRef: MainBonusRef[];

  public slotsTable: ItemSlot[];

  public namesBySlot: NameListBySlot[];

  public namesByLook: NameListByLook[];

  public namesByElements: NameListByElements[];

  public readonly lookBonusRef: string[] = [null, "Edgy", "Kawaii", "xD"];

  public readonly elementsMasteries: string[] = [ElementKind.AIR, ElementKind.EARTH, ElementKind.FIRE, ElementKind.WATER];

  public readonly elementsDefenses: string[] = [ElementKind.AIR, ElementKind.EARTH, ElementKind.FIRE, ElementKind.WATER];

  public readonly defLabel: string = "Def.";

  public readonly masteryLabel: string = "M.";

  public readonly defBonus: string[] = ["PV"];
}
