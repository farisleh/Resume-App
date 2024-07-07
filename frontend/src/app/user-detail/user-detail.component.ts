import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  httpClient = inject(HttpClient);
  userDetail: any;
  selected = 0;
  hovered = 0;
  readonly = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      this.httpClient.get(`http://localhost:3000/api/users/${userId}`)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.userDetail = data;
          }, 
          error: (err) => console.log(err)
        });
    });
  }
}
