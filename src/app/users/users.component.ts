import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import {timer} from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  user: User;
  
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }
  

  
  getUsers(): void {
    //this.userService.getUsers().subscribe(users => this.users = users);
    timer(0, 2000)
      .subscribe(() => {
        this.userService.getUsers()
          .subscribe(users => this.users = users);
      });
  }
  
  select(user: User): void {
    this.user = user;
  }
  
  update(user: User): void {
    this.userService.updateUser(this.user);
  }
  
  /*add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.userService.addUser({ name } as User)
    .subscribe(user => {
      this.users.push(user);
    });
    
}*/

  /*delete(user: User): void {
  this.users = this.users.filter(h => h !== user);
  this.userService.deleteUser(user).subscribe();
}*/
}
