import { BonusKind } from './secondaryBonusDescriptor';

export class ItemSecondaryBonus {    

    public constructor(public bonusValue: number,
        public kind: BonusKind,
        public nature: string)
    {
    }
}
