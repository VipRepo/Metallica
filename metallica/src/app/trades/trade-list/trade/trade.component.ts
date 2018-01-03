import {
  Component, OnInit, Input, Output,
  EventEmitter, OnChanges, SimpleChanges
} from "@angular/core";
import { Trade } from "../../model/trade.model";
import { TradeService } from "../../trades.service";
import { RefDataService } from "../.././../services/refdata.service";
import { NotificationService } from "../../../services/notification.service";
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: "app-trade",
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss'],
  providers: [TradeService]
})
export class TradeComponent implements OnInit, OnChanges {

  editMode: boolean = false;
  oldTrade: Trade;

  myform: FormGroup;
  tradeDate: FormControl;
  commodity: FormControl;
  side: FormControl;
  counterparty: FormControl;
  price: FormControl;
  quantity: FormControl;
  location: FormControl;

  @Input()
  trade: Trade;

  locations: any;
  counterparties: any;
  commodities: any;

  @Output()
  addEvent = new EventEmitter();

  @Output()
  deleteEvent = new EventEmitter();

  @Output()
  updateEvent = new EventEmitter();

  public constructor(private tradeService: TradeService,
    private refDataService: RefDataService,
    private notificationService: NotificationService) { }

  public ngOnInit(): void {
    this.loadLocations();
    this.loadCounterparties();
    this.loadCommodities();
    

    this.createFormControls();
    this.createForm();
  }
  loadLocations() {
    this.refDataService.getLocations()
      .subscribe(locations => {
        this.locations = locations;
      }, err => {
        console.log("Error" + err);
        throw err;
      });
  }

  loadCounterparties() {
    this.refDataService.getCounterparties()
      .subscribe(counterparties => {
        this.counterparties = counterparties;
      }, err => {
        console.log("Error" + err);
        throw err;
      });
  }

  loadCommodities() {
    this.refDataService.getCommodities()
      .subscribe(commodities => {
        
        this.commodities = commodities;
        console.log("commodity recieved"+ JSON.stringify(this.commodities));
      }, err => {
        console.log("Error" + err);
        throw err;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if (propName === 'trade') {
        let chng = changes[propName];
        if (chng.currentValue.tradeId == null) {
          this.editMode = true;
        } else {
          this.editMode = false;
        }
      }
    }
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.tradeDate = new FormControl(this.trade.tradeDate, Validators.required);
    this.commodity = new FormControl(this.trade.commodity, Validators.required);
    this.side = new FormControl(this.trade.side, Validators.required);
    this.counterparty = new FormControl(this.trade.counterparty, Validators.required);
    this.price = new FormControl(this.trade.price, Validators.required);
    this.quantity = new FormControl(this.trade.quantity, Validators.required);
    this.location = new FormControl(this.trade.location, Validators.required);
  }

  createForm() {
    this.myform = new FormGroup({
      tradeDate: this.tradeDate,
      commodity: this.commodity,
      side: this.side,
      counterparty: this.counterparty,
      price: this.price,
      quantity: this.quantity,
      location: this.location
    });
  }

  public startEdit() {
    this.editMode = true;
  }

  public stopEdit() {
    this.editMode = false;
  }

  public cancel() {
    this.myform.reset();
    // this.stopEdit();
  }

  onDelete() {
    if (this.trade.tradeId) {
      this.delete();
    }
  }

  onSubmit() {
    if (this.trade.tradeId) {
      this.update();
    } else {
      this.save();
    }
  }

  save() {
    this.tradeService.createTrade(this.myform.value).subscribe((trade: any) => {
      this.trade = new Trade(trade._id,
        trade.tradeDate.substring(0, 10), trade.commodity,
        trade.side, trade.counterparty,
        trade.price, trade.quantity,
        trade.location, trade.version);
      this.addEvent.emit(this.trade);
      this.stopEdit();
    },
  (error) => {
    console.log("Trade could not created");
    this.notificationService.openSnackBar("Trade could not created", null);
  });
  }

  update() {
    let trade = this.myform.value;
    trade._id = this.trade.tradeId;
    trade.version = this.trade.version;
    this.tradeService.updateTrade(trade).subscribe((res: any) => {
      this.trade = new Trade(trade._id,
        trade.tradeDate, trade.commodity,
        trade.side, trade.counterparty,
        trade.price, trade.quantity,
        trade.location, trade.version);
      this.updateEvent.emit(this.trade);
      this.stopEdit();
    },
    (error) => {
      console.log("Trade could not updated");
      this.notificationService.openSnackBar("Trade could not updated", null);
    });
  }

  delete() {
    this.tradeService.deleteTrade(this.trade.tradeId).subscribe((trade: any) => {
      this.deleteEvent.emit(this.trade.tradeId);
    });
  }
}
