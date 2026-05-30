import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  username = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router) {}

  login() {

  if (!this.username || !this.password) {
    this.errorMessage = 'Completa todos los campos';
    return;
  }

  if (
    this.username === 'admin' &&
    this.password === '1234'
  ) {

    this.errorMessage = '';

    this.router.navigate(['/dashboard']);

  } else {

    this.errorMessage = 'Usuario o contraseña incorrectos';

  }
}
}