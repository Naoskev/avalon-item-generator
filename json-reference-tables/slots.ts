import { ItemSlot } from 'src/app/data/itemSlot';

export const slots: ItemSlot[] =[
    {
      "key": "item",
      "name": "Objet",
      "parentSlotKey": null
    },
    {
      "key": "equipment",
      "name": "Equipement",
      "parentSlotKey": "item"
    },
    {
      "key": "body",
      "name": "Corps",
      "parentSlotKey": "equipment"
    },
    {
      "key": "arms",
      "name": "Bras",
      "parentSlotKey": "body"
    },
    {
      "key": "legs",
      "name": "Jambes",
      "parentSlotKey": "body"
    },
    {
      "key": "head",
      "name": "Tête",
      "parentSlotKey": "body"
    },
    {
      "key": "torso",
      "name": "Torse",
      "parentSlotKey": "body"
    },
    {
      "key": "weapon",
      "name": "Arme",
      "parentSlotKey": "equipment"
    },
    {
      "key": "two-handed",
      "name": "Arme à deux mains",
      "parentSlotKey": "weapon"
    },
    {
      "key": "single-handed",
      "name": "Arme à une main",
      "parentSlotKey": "weapon"
    },
    {
      "key": "main-weapon",
      "name": "Arme principale",
      "parentSlotKey": "single-handed"
    },
    {
      "key": "secondary-weapon",
      "name": "Arme secondaire",
      "parentSlotKey": "single-handed"
    }
   ];