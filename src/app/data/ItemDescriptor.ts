import { ItemSlot } from './itemSlot';

export class ItemDescriptor {
    public rarityIndex:number;
    public level: number;
    public slot: ItemSlot;
    public rarityName: string;

    public constructor(){
        this.rarityIndex = null;
        this.level = null;
        this.slot = null;
    }
}
