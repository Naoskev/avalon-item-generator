import { Component, OnInit } from '@angular/core';
import { ReferenceDataService } from '../generator/reference-data.service';
import { ItemDescriptor } from '../data/ItemDescriptor';
import { ItemGeneratorService } from '../generator/item-generator.service';
import { RarityRef } from '../data/referenceTables/rarityRef';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  constructor(public referenceDataService:ReferenceDataService, private itemGeneratorService:ItemGeneratorService) {    
   }

  ngOnInit(): void {
    this.filterRarity();
  }

  onSubmit() { 
    this.itemGeneratorService.generate(Object.assign({}, this.itemWantedDescriptor));
    console.log("Submit !");
  }

  public filterRarity():void {
    console.log("select level")
    console.log(this.itemWantedDescriptor.level);
    this.rarityList = this.referenceDataService.rarityTable.filter(r => this.itemWantedDescriptor.level == null || r.rarityMinLevel <= this.itemWantedDescriptor.level);
    console.log(this.rarityList);
    if(!this.rarityList.some(r => r.rarityIndex === this.itemWantedDescriptor.rarityIndex)){
      this.itemWantedDescriptor.rarityIndex = null;      
    }
    console.log(this.itemWantedDescriptor.rarityIndex);
  }

  public selectRarity(): void {
    console.log("select rarity")
    console.log(this.itemWantedDescriptor.level);
    console.log(this.itemWantedDescriptor.rarityIndex);

  }

  public levelList = [...Array(11).keys()].splice(1);

  public rarityList: RarityRef[];

  public displayedSlots = this.referenceDataService.slotsTable.filter(is => is.display);

  public itemWantedDescriptor: ItemDescriptor = new ItemDescriptor(); 

}
