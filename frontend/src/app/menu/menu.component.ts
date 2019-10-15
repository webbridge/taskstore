import { Component } from "@angular/core";
import { MENU_LINKS } from "../../models";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent {
  constructor() {
    this.menuItems = MENU_LINKS;
  }

  public menuItems;
}
