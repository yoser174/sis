import { ApogGenerateComponent } from './_component/add-pre-order-goods/apog-generate/apog-generate.component';
import { ItemListsComponent } from './_component/item-lists/item-lists.component';
import { AddPreOrderGoodsComponent } from './_component/add-pre-order-goods/add-pre-order-goods.component';
import { FulfillmentSummaryComponent } from './_component/fulfillment-summary/fulfillment-summary.component';
import { CprrDataUsageComponent } from './_component/cprr-data-usage/cprr-data-usage.component';
import { PreOrderGoodsComponent } from './_component/pre-order-goods/pre-order-goods.component';
import { ReportExpiredGoodsComponent } from './_component/report-expired-goods/report-expired-goods.component';
import { ReportGoodsExpiryComponent } from './_component/report-goods-expiry/report-goods-expiry.component';
import { ReportGoodsConsumptionsComponent } from './_component/report-goods-consumptions/report-goods-consumptions.component';
import { ReportGoodsReceivedComponent } from './_component/report-goods-received/report-goods-received.component';
import { ChangePasswordComponent } from './_component/change-password/change-password.component';
import { InOutManagementComponent } from './_component/in-out-management/in-out-management.component';
import { StorageManagementComponent } from './_component/storage-management/storage-management.component';
import { AuthGuard } from './_service/auth-guard.service';
import { GoodsInComponent } from './_component/goods-in/goods-in.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './_component/login/login.component';
import { DashboardComponent } from './_component/dashboard/dashboard.component';
import { GoodsOutComponent } from './_component/goods-out/goods-out.component';
import { GoodsMasterDataComponent } from './_component/goods-master-data/goods-master-data.component';
import { UserManagementComponent } from './_component/user-management/user-management.component';
import { GenerateComponent } from './_component/pre-order-goods/generate/generate.component';


const routes: Routes = [
  { path: "login", component: LoginComponent},
  { path: "goods-in", component: GoodsInComponent, canActivate: [AuthGuard]},
  { path: "goods-out", component: GoodsOutComponent, canActivate: [AuthGuard]},
  { path: "goods-master-data", component: GoodsMasterDataComponent, canActivate: [AuthGuard]},
  { path: "user-management", component: UserManagementComponent, canActivate: [AuthGuard]},
  { path: "storage-management", component: StorageManagementComponent, canActivate: [AuthGuard]},
  { path: "in-out-management", component: InOutManagementComponent, canActivate: [AuthGuard]},
  { path: "change-password", component: ChangePasswordComponent, canActivate: [AuthGuard]},
  { path: "report-goods-received", component: ReportGoodsReceivedComponent, canActivate: [AuthGuard]},
  { path: "report-goods-consumption", component: ReportGoodsConsumptionsComponent, canActivate: [AuthGuard]},
  { path: "report-goods-expiry", component: ReportGoodsExpiryComponent, canActivate: [AuthGuard]},
  { path: "report-expired-goods", component: ReportExpiredGoodsComponent, canActivate: [AuthGuard]},
  { path: "fulfillment-summary", component: FulfillmentSummaryComponent, canActivate: [AuthGuard]},
  { path: "pre-order-goods", component: PreOrderGoodsComponent, canActivate: [AuthGuard]},
  { path: "pre-order-goods/generate", component: GenerateComponent, canActivate: [AuthGuard]},
  { path: "add-pre-order-goods", component: AddPreOrderGoodsComponent, canActivate: [AuthGuard]},
  { path: "add-pre-order-goods/generate", component: ApogGenerateComponent, canActivate: [AuthGuard]},
  { path: "cprr-data-usage", component: CprrDataUsageComponent, canActivate: [AuthGuard]},
  { path: "item-lists", component: ItemListsComponent, canActivate: [AuthGuard]},
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
  { path: "**", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
