import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import { HomepageComponent } from "./homepage/homepage.component"
import { AdminpanelComponent } from "./adminpanel/adminpanel.component"
import { OrderComponent } from "./order/order.component"

const routes = [{ path: "", component: HomepageComponent }, { path: "admin", component: AdminpanelComponent }, { path: "order/:id", component: OrderComponent }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
