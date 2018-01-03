import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';

// import { MatDatepickerModule } from '@angular/material/datepicker';


// import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

import { APP_ROUTING } from './app.routing';
import { APP_CONFIG, AppConfig } from './config/app.config';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './trades/search/search.component';
import { HeaderComponent } from './header/header.component';
import { TradesComponent } from './trades/trades.component';
import { TradeListComponent } from './trades/trade-list/trade-list.component';
import { TradeComponent } from './trades/trade-list/trade/trade.component';
import { LiveMarketComponent } from "./trades/live-market/live-market.component";
import { NotificationService } from "./services/notification.service";
import { RefDataService } from "./services/refdata.service";
import { CommodityService } from "./services/commodities.service";
import { LocationService } from "./services/locations.service";
import { CounterpartyService } from "./services/counterparties.service";

import { KeyValuePipe } from './pipe/KeyValuePipe.pipe'

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ]
})
export class MaterialModule {}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    APP_ROUTING,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
    // MatDatepickerModule
  ],
  declarations: [
    HeaderComponent,
    HomeComponent,
    AppComponent,
    TradesComponent,
    TradeListComponent,
    TradeComponent,
    SearchComponent,
    KeyValuePipe,
    LiveMarketComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    { provide: APP_CONFIG, useValue: AppConfig },
    NotificationService,
    RefDataService,
    CommodityService,
    CounterpartyService,
    LocationService
  ]
})
export class AppModule { }
