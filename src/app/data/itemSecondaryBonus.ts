export class ItemSecondaryBonus {    

    public readableName: string;

    public constructor(public bonusValue: number,
        public bonusName: string,
        public bonusLabel: string)
    {
        this.readableName = "+ "+ bonusValue + " " + bonusLabel + " "+bonusName; 
    }
}
