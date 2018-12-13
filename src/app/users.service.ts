import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UsersService {

  private _isLoggedIn:boolean = false;

  private url = 'http://localhost:3000/'; //using json server.
  user: any;
  usersUpdated: EventEmitter<Boolean> = new EventEmitter();

  constructor(private http: HttpClient) { }

  public get isLoggedIn() {
    return this._isLoggedIn;
  }
  public set isLoggedIn(value) {
    this._isLoggedIn = value;
  }

  public getLoggedinUser() {
    return this.user;
  }

  hasUsersAdded() {
    return this.usersUpdated;
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.url + 'users').map(res => {		
		return res;
	} );
  }

  isValidUser(users, data): boolean {
    // Coule use a md5 encrypition for the password.
    let u = users.filter(user=> (user.username == data.username && user.password == data.password));
    if(u.length > 0){
        this.isLoggedIn = true;
        this.user = u;
        localStorage.setItem('user', JSON.stringify(this.user)); //bad practice beacuse password is in there.
        return true;
    }else{
        return false;
    }
  }

  createUser (user, nextId): Observable<any>{
	let input =  {
		"id": nextId,         
		"username": user.username,
		"firstName" : user.firstName,
		"lastName" : user.lastName,
		"address" : user.address,
		"password": user.password,
	  }

	return this.http.request('post', this.url+'users', {
		body: input,
		headers: new HttpHeaders({
			'Accept': 'application/json;',
			'Content-Type': 'application/json'
		})
	}).map(res => {
			this.usersUpdated.emit(true);
			return res;
		}).catch((error: Response | any) => {
			return Observable.throw(error);
		});
  }

  

}
