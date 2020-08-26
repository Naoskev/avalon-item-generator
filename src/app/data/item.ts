import { ItemSecondaryBonus } from './itemSecondaryBonus';
import { ItemDescriptor } from './ItemDescriptor';
import { sumBy, groupBy, keys, sortBy } from 'lodash';
import { BonusKind } from './secondaryBonusDescriptor';
import { NameListBySlot } from './referenceTables/nameListBySlot';
import * as _ from 'lodash';
import { NameListByLook } from './referenceTables/nameListByLook';

export class Item {

    public statsName: string;
    public	fluffName:string;

    public constructor(
        public descriptor: ItemDescriptor,
        public mainBonus: string,
        public secondaryBonus: ItemSecondaryBonus[]){
        //this.statsName = fluffName + " " + (mainBonus != null ? mainBonus +" " :"");
    }

    public getItemMasteries(): string{
        return this.computeElements(BonusKind.ElementMastery);
    }
  
    public getItemElementDefenses(): string{
        return this.computeElements(BonusKind.ElementDefense);
    }
  
    public getHP(): string{
      let sum = sumBy(this.secondaryBonus.filter(s => s.kind === BonusKind.HP), i => i.bonusValue);
      if(sum > 0) return "+"+sum+ " PV";
      return "";
    }

    private getLookBonus(): ItemSecondaryBonus {
      return this.secondaryBonus.find(i => i.kind === BonusKind.Look);
    }
  
    public getLook(): string {
      let look = this.getLookBonus();
      return look != null ? "+"+look.bonusValue + " " + look.nature : "";
    }

    public buildName(namesBySlot:NameListBySlot[], namesByLook: NameListByLook[]): Item {

      this.fluffName = _.sample(namesBySlot.find(s => s.slotKey == this.descriptor.slot.key).names);

      let lookBonus = this.getLookBonus();
      if(lookBonus != null) {
        this.fluffName += " " + _.sample(namesByLook.find(s => s.lookNature == lookBonus.nature).names);
      }

      return this;
    }

    private computeElements(kind: BonusKind){        
        let masteries = this.secondaryBonus.filter(m => m.kind == kind);
        
      let tt = groupBy(masteries, 'nature');
      return sortBy(keys(tt)).map(s => "+"+sumBy(tt[s], bn => bn.bonusValue)+ " " + s).join();
    }
}
