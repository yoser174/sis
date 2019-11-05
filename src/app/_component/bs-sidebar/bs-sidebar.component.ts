import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-sidebar',
  templateUrl: './bs-sidebar.component.html',
  styleUrls: ['./bs-sidebar.component.css']
})
export class BsSidebarComponent implements OnInit {

  show:boolean = false;

  toggleCollapse() {
    this.show = !this.show
  }

  constructor() { }

  ngOnInit() {
  }

}
