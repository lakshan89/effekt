import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsersService } from './users.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( private _user: UsersService ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    var user = JSON.parse(localStorage.getItem('user'));
    if(user[0].id){
      return true;
    }
    
  }
}
