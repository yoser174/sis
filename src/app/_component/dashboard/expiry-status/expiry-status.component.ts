import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_service/data.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-expiry-status',
  templateUrl: './expiry-status.component.html',
  styleUrls: ['./expiry-status.component.css']
})
export class ExpiryStatusComponent implements OnInit {

  constructor(private dataService: DataService,
    public translate: TranslateService,
    private toastr: ToastrService) { }



  view: any[] = [600, 400];
  model: any = {};

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Expiry group';
  showYAxisLabel = true;
  yAxisLabel = 'Quantity';
  timeline = true;

  dataSource;
  isLoadingResults;
  dataFromServer;

  colorScheme = {
    domain: ['#90EE90', '#E6ED90', '#87CEFA', '#ed9090']
  };

  //pie
  showLabels = true;

  // data goes here
  public expiry_status_data = [
  ];

  showError() {
    this.toastr.error('Something bad happened; Please try again later.', 'Major Error');
  }

  public loadData() {
    this.isLoadingResults = true;
    this.model.action = 'dashboard-goods-expiry-group';
    this.model.access_token = localStorage.getItem('access_token');
    this.dataService.getData(this.model).subscribe(response => {
      if (response.status === 'success') {
        this.isLoadingResults = true;
        this.dataFromServer = response['data'];
        this.expiry_status_data = this.dataFromServer['expiry_status_data'];

      }
    }, error => {
      this.showError();
      this.isLoadingResults = false;
    });
  }

  onSelect(event){
    //
  }



  ngOnInit() {
    this.translate.get('DASHBOARD.QUANTITY').subscribe((res: string) => {
      this.yAxisLabel = res;
    });
    this.translate.get('DASHBOARD.EXPIRYGROUP').subscribe((res: string) => {
      this.xAxisLabel = res;
    });
    // get data
    this.loadData();

  }


}
