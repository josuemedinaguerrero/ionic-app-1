import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Customer {
  name: string;
  state: number;
  description: string;
  image: string;
}

interface ApiResponse {
  data: Customer[];
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
  users: Customer[] = [];
  permission!: boolean;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.permission = true;
    this.getUsers().subscribe({
      next: (response: ApiResponse) => (this.users = response.data),
    });
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  getUsers() {
    const url = '/assets/files/customers.json';
    return this.http.get<ApiResponse>(url);
  }
}
