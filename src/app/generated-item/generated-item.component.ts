import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../data/item';
import { BonusKind } from '../data/secondaryBonusDescriptor';
import { ItemSecondaryBonus } from '../data/itemSecondaryBonus';
import { sumBy } from 'lodash';

@Component({
  selector: 'app-generated-item',
  templateUrl: './generated-item.component.html',
  styleUrls: ['./generated-item.component.css']
})
export class GeneratedItemComponent implements OnInit {

  @Input() item:Item;

  constructor() { }

  ngOnInit(): void {
  }


}
