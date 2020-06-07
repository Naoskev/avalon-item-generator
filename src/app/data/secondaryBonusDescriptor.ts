
// export abstract class AbstractSecondaryBonus {
    
//     constructor(public value: number, public bonusKind:BonusKind) {        
//     }

//     public abstract GetBonus(): string;
// }

// export abstract class OffensiveBonus extends AbstractSecondaryBonus {
//     constructor(value: number) {    
//         super(value, BonusKind.Offensive);    
//     }
// }

// export abstract class DefensiveBonus extends AbstractSecondaryBonus {
//     constructor(value: number) {
//         super(value, BonusKind.Defensive);    
//     }
// }

// export class ElementMastery extends OffensiveBonus {
//     constructor(value: number, public element: ElementKind) {
//         super(value);
//     }
//     public GetBonus(): string {
//         return "+ "+ this.value+" M. "+ element;
//     }
// }

// export class ElementDefense extends DefensiveBonus {
//     constructor(value: number, public element: ElementKind) {
//         super(value);
//     }
//     public GetBonus(): string {
//         return "+ "+ this.value+" Def. "+ element;
//     }
// }

// export class HPBonus extends DefensiveBonus {
//     constructor(value: number) {
//         super(value);
//     }
//     public GetBonus(): string {
//         return "+ "+ this.value+" PV";
//     }
// }

export enum BonusKind {
    ElementMastery, 
    ElementDefense,
    HP,
    Look,
}

export enum ElementKind {
    FIRE = "feu",
    WATER = "eau",
    EARTH = "terre",
    AIR = "air",
}