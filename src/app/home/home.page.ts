import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  username = "Ramu Vishwanatham";
  public items: any = [];

  constructor() {
    this.items = [
      {
        expanded: true, childrens: [
          { name: 'ramu' },
          { name: 'Parvathi' }
        ]
      }
    ];
  }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }
}
