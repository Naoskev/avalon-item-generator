import { Component, OnInit } from '@angular/core';
import { ReferenceDataService } from '../generator/reference-data.service';
import { ItemDescriptor } from '../data/ItemDescriptor';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  constructor(public referenceDataService:ReferenceDataService) {
    console.log(referenceDataService.rarityTable);
    console.log(this.referenceDataService.slotsTable.filter(is => is.display));
    
   }

  ngOnInit(): void {
  }

  onSubmit() { 
    
    console.log("Submit !");
  }

  public levelList = [...Array(11).keys()].splice(1);

  public displayedSlots = this.referenceDataService.slotsTable.filter(is => is.display);

  public itemWantedDescriptor: ItemDescriptor = new ItemDescriptor(); 

}
