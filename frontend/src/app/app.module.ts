import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"
import { HttpClientModule } from "@angular/common/http"
import { FormsModule } from "@angular/forms"

import { AppComponent } from "./app.component"
import { ProductsComponent } from "./products/products.component"
import { CartComponent } from "./cart/cart.component"
import { AppRoutingModule } from "./app-routing.module"
import { HomepageComponent } from "./homepage/homepage.component"
import { AdminpanelComponent } from "./adminpanel/adminpanel.component"
import { RouterModule } from "@angular/router"
import { MenuComponent } from "./menu/menu.component"
import { OrdersComponent } from "./orders/orders.component"
import { OrderComponent } from "./order/order.component"

@NgModule({
  declarations: [AppComponent, ProductsComponent, CartComponent, HomepageComponent, AdminpanelComponent, MenuComponent, OrdersComponent, OrderComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, RouterModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
