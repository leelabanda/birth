import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  username = '';
  password = '';

  constructor(private router: Router) {}

  login() {

    if (this.username === 'surekha' && this.password === '123#') {

      localStorage.setItem('loggedIn', 'true');
       localStorage.setItem('username', this.username);


      this.router.navigate(['/mother/events']);

    }else if(this.username === 'rajendra' && this.password === '123#') {
 localStorage.setItem('username', this.username);

      localStorage.setItem('loggedIn', 'true');

      this.router.navigate(['/father/events']);

    }
     else {

      alert('Invalid Username or Password');

    }

  }

}