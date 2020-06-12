import { ItemSecondaryBonus } from './itemSecondaryBonus';
import { ItemDescriptor } from './ItemDescriptor';
import { sumBy, groupBy, map, Dictionary, keys, sortBy } from 'lodash';
import { BonusKind } from './secondaryBonusDescriptor';

export class Item {

    public statsName: string;

    public constructor(
        public descriptor: ItemDescriptor, 
        public fluffName: string,
        public mainBonus: string,
        public secondaryBonus: ItemSecondaryBonus[]){
        this.statsName = fluffName + " " + (mainBonus != null ? mainBonus +" " :"");
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
  
    public getLook(): string {
      let look = this.secondaryBonus.find(i => i.kind === BonusKind.Look);
      return look != null ? "+"+look.bonusValue + " " + look.nature : "";
    }

    private computeElements(kind: BonusKind){        
        let masteries = this.secondaryBonus.filter(m => m.kind == kind);
        
      let tt = groupBy(masteries, 'nature');
      return sortBy(keys(tt)).map(s => "+"+sumBy(tt[s], bn => bn.bonusValue)+ " " + s).join();
    }
}
