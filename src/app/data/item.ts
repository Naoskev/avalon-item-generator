import { ItemSecondaryBonus } from './itemSecondaryBonus';
import { ItemDescriptor } from './ItemDescriptor';

export class Item {

    public statsName: string;

    public constructor(
        public descriptor: ItemDescriptor, 
        public fluffName: string,
        public mainBonus: string,
        public secondaryBonus: ItemSecondaryBonus[]){
        this.statsName = fluffName + " " + (mainBonus != null ? mainBonus +" " :"");
    }
}
