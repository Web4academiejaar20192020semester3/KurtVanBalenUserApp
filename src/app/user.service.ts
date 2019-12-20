import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private usersURL = 'http://localhost:8080/VanBalenKurt_ChatApp_Web_exploded/Controller?action=Users';  // URL to web api
  private updateURL = 'http://localhost:8080/VanBalenKurt_ChatApp_Web_exploded/Controller?action=updateStatus&id=';
  
  constructor(private http: HttpClient, private messageService: MessageService) { }
  
  getUser(id: string): Observable<User> 
  {
    const url = '${this.usersUrl}&id=${id}';
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }



updateUser (user: User): Observable<any> {
    const url = '${this.updateUrl}${user.id}&newStatus=${user.status}';
    return this.http.get(url).pipe(
      tap(_ => this.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersURL)
    .pipe(tap(_ => this.log('fetched users')),catchError(this.handleError<User[]>('getUsers', [])));
  }
  
  private log(message: string) {
  this.messageService.add(`UserService: ${message}`);
  }
    private handleError<T> (operation = 'operation', result?: T) 
    {
        return (error: any): Observable<T> => 
        {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}


  
  /*getUsers(): Observable<User[]> {
  // TODO: send the message _after_ fetching the heroes
  this.messageService.add('UserService: fetched users');
  return this.http.get<User[]>(this.usersURL).pipe(tap(_ => this.log('fetched users')),catchError(this.handleError<User[]>('getUsers', [])));
  }*/
  
  /*addUser(user: User): Observable<User> {
  return this.http.post<User>(this.usersURL, user, httpOptions).pipe(
    tap((newUser: User) => this.log(`added user w/ id=${newUser.id}`)),
    catchError(this.handleError<User>('addUser'))
  );
}*/

  /*updateUser (user: User): Observable<any> {
  return this.http.put(this.usersURL, user, httpOptions).pipe(tap(_ => this.log(`updated user      id=${user.id}`)),catchError(this.handleError<any('updateUser')));

}*/
  
  /*getUser(id: number): Observable<User> {
  // TODO: send the message _after_ fetching the user
  this.messageService.add(`UserService: fetched user id=${id}`);
  const url = `${this.usersURL}/${id}`;
  return this.http.get<User>(url).pipe(tap(_ => this.log(`fetched user id=${id}`)),catchError(this.handleError<User>(`getUser id=${id}`)));
  }*/
  
  /*deleteUser (user: User | number): Observable<User> {
  const id = typeof user === 'number' ? user : user.id;
  const url = `${this.usersURL}/${id}`;
  return this.http.delete<User>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted user id=${id}`)),
    catchError(this.handleError<User>('deleteUser'))
  );
}*/
  

}
