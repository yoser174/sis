import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/_service/data.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'bs-header',
  templateUrl: './bs-header.component.html',
  styleUrls: ['./bs-header.component.css']
})
export class BsHeaderComponent implements OnInit {

  model: any = {};
  isProduction;
  isSidebarIcon: boolean = false;

  constructor(
    private dataService: DataService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.model.token_data = this.dataService.getTokenData();
    this.isProduction = environment.production;
    this.translate.use(localStorage.getItem('lang'));
  }

  logout() {
    this.dataService.logout();
  }

  clickSidebarIcon() {
    const body = document.getElementsByTagName('body')[0];
    if (!this.isSidebarIcon) {
      body.classList.remove('sidebar-icon-only');
      this.isSidebarIcon = true;
    }
    else {
      body.classList.add('sidebar-icon-only');
      this.isSidebarIcon = false;
    }
  }
}
