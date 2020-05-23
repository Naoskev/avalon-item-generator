import { ItemSlot } from 'src/app/data/itemSlot';

export const slots: ItemSlot[] =[
    {
      "key": "item",
      "name": "Objet",
      "parentSlotKey": "",
      "display": false,
      "terminal": false
    },
    {
      "key": "equipment",
      "name": "Equipement",
      "parentSlotKey": "item",
      "display": false,
      "terminal": false
    },
    {
      "key": "body",
      "name": "Corps",
      "parentSlotKey": "equipment",
      "display": true,
      "terminal": false
    },
    {
      "key": "arms",
      "name": "Bras",
      "parentSlotKey": "body",
      "display": true,
      "terminal": true
    },
    {
      "key": "legs",
      "name": "Jambes",
      "parentSlotKey": "body",
      "display": true,
      "terminal": true
    },
    {
      "key": "head",
      "name": "Tête",
      "parentSlotKey": "body",
      "display": true,
      "terminal": true
    },
    {
      "key": "torso",
      "name": "Torse",
      "parentSlotKey": "body",
      "display": true,
      "terminal": true
    },
    {
      "key": "weapon",
      "name": "Arme",
      "parentSlotKey": "equipment",
      "display": true,
      "terminal": false
    },
    {
      "key": "two-handed",
      "name": "Arme à deux mains",
      "parentSlotKey": "weapon",
      "display": true,
      "terminal": true
    },
    {
      "key": "single-handed",
      "name": "Arme à une main",
      "parentSlotKey": "weapon",
      "display": true,
      "terminal": false
    },
    {
      "key": "main-weapon",
      "name": "Arme principale",
      "parentSlotKey": "single-handed",
      "display": true,
      "terminal": true
    },
    {
      "key": "secondary-weapon",
      "name": "Arme secondaire",
      "parentSlotKey": "single-handed",
      "display": true,
      "terminal": true
    }
   ];