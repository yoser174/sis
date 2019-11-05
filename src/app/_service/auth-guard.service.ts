
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route: Router,
    private dataService: DataService) { 
  }

  canActivate(){
    if (this.dataService.isLoggedIn()) return true;

    this.route.navigate(['/login']);
    return false;

  }
}
