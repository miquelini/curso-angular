

import { NgModule } from "@angular/core";

import { RouterModule, Routes } from '@angular/router';

import { DeliveryCostsComponent } from './delivery-costs/delivery-costs.component';
import { OrderItemsComponent } from './order-items/order-items.component';
import { OrderComponent } from "./order.component";
import { SharedModule } from "app/shared/shared.module";
import { leaveOrderGuard } from './leave-order.guard';

const ROUTES: Routes = [
    {path:'', component: OrderComponent, canDeactivate: [leaveOrderGuard] }
]

@NgModule({
    declarations: [OrderComponent, OrderItemsComponent, DeliveryCostsComponent],
    imports: [SharedModule, RouterModule.forChild(ROUTES) ]
})

export class OrderModule {}