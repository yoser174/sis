import { AuthGuard } from './_service/auth-guard.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './_component/login/login.component';
import { DashboardComponent } from './_component/dashboard/dashboard.component';
import { GoodsInComponent } from './_component/goods-in/goods-in.component';
import { BsSidebarComponent } from './_component/bs-sidebar/bs-sidebar.component';
import { BsHeaderComponent } from './_component/bs-header/bs-header.component';
import { BsFooterComponent } from './_component/bs-footer/bs-footer.component';
import { DataService } from './_service/data.service';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { GoodsOutComponent } from './_component/goods-out/goods-out.component';
import { GoodsMasterDataComponent } from './_component/goods-master-data/goods-master-data.component';

import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule, MatIconModule, MatToolbarModule, MatDialogModule, MatSelectModule, MatButtonModule, MatCardModule, MatTooltip, MatTooltipModule, MatAutocomplete, MatAutocompleteModule } from "@angular/material";
import { EditReagentComponent } from './_component/goods-master-data/dialogs/edit-reagent/edit-reagent.component';
import { UserManagementComponent } from './_component/user-management/user-management.component';
import { UmDeleteDialogComponent } from './_component/user-management/dialogs/um-delete-dialog/um-delete-dialog.component';
import { StorageManagementComponent } from './_component/storage-management/storage-management.component';
import { EditStorageComponent } from './_component/storage-management/dialogs/edit-storage/edit-storage.component';
import { AddStorageComponent } from './_component/storage-management/dialogs/add-storage/add-storage.component';
import { DeleteStorageComponent } from './_component/storage-management/dialogs/delete-storage/delete-storage.component';
import { InOutManagementComponent } from './_component/in-out-management/in-out-management.component';
import { ChangePasswordComponent } from './_component/change-password/change-password.component';
import { ReportGoodsReceivedComponent } from './_component/report-goods-received/report-goods-received.component';
import { ReportGoodsConsumptionsComponent } from './_component/report-goods-consumptions/report-goods-consumptions.component';
import { ReportGoodsExpiryComponent } from './_component/report-goods-expiry/report-goods-expiry.component';
import { ReportExpiredGoodsComponent } from './_component/report-expired-goods/report-expired-goods.component';
import { PreOrderGoodsComponent } from './_component/pre-order-goods/pre-order-goods.component';
import { GenerateComponent } from './_component/pre-order-goods/generate/generate.component';
import { CprrDataUsageComponent } from './_component/cprr-data-usage/cprr-data-usage.component';
import { FulfillmentSummaryComponent } from './_component/fulfillment-summary/fulfillment-summary.component';
import { AddPreOrderGoodsComponent } from './_component/add-pre-order-goods/add-pre-order-goods.component';
import { ItemListsComponent } from './_component/item-lists/item-lists.component';
import { AddGoodsComponent } from './_component/pre-order-goods/generate/add-goods/add-goods.component';

import { NgxSpinnerModule } from "ngx-spinner";
import { ApogGenerateComponent } from './_component/add-pre-order-goods/apog-generate/apog-generate.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ExpiryStatusComponent } from './_component/dashboard/expiry-status/expiry-status.component';
import { NotificationsComponent } from './_component/bs-header/notifications/notifications.component';

export function jwtTokenGetter() {
  return localStorage.getItem('access_token');
}

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    GoodsInComponent,
    BsSidebarComponent,
    BsHeaderComponent,
    BsFooterComponent,
    GoodsOutComponent,
    GoodsMasterDataComponent,
    EditReagentComponent,
    UserManagementComponent,
    UmDeleteDialogComponent,
    StorageManagementComponent,
    EditStorageComponent,
    AddStorageComponent,
    DeleteStorageComponent,
    InOutManagementComponent,
    ChangePasswordComponent,
    ReportGoodsReceivedComponent,
    ReportGoodsConsumptionsComponent,
    ReportGoodsExpiryComponent,
    ReportExpiredGoodsComponent,
    PreOrderGoodsComponent,
    GenerateComponent,
    CprrDataUsageComponent,
    FulfillmentSummaryComponent,
    AddPreOrderGoodsComponent,
    ItemListsComponent,
    AddGoodsComponent,
    ApogGenerateComponent,
    ExpiryStatusComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSortModule,
    CommonModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgxChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    })
  ],
  entryComponents: [
    EditReagentComponent,
    UmDeleteDialogComponent,
    AddStorageComponent,
    EditStorageComponent,
    DeleteStorageComponent,
    AddGoodsComponent
  ],
  providers: [
    DataService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
