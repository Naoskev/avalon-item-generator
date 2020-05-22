export class ItemSecondaryBonus {    

    public readableName: string;

    public constructor(public bonusValue: number,
        public bonusName: string,
        public bonusKey: string)
    {
        this.readableName = "+ "+ bonusValue + " "+bonusName; 

    }
}
