import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  httpClient = inject(HttpClient);
  userList: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/api/users')
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.userList = data;
        }, 
        error: (err) => console.log(err)
      });
  }

  goToUserDetail(userId: number) {
    this.router.navigate(['/users', userId]);
  }
}
