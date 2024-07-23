import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    this.initilaSetup()
  }
  toggleBodyClass() {
    const el = document.body;
    if (!el.classList.contains('sidebar-hidden')) {
      el.classList.add('sidebar-hidden');
    } else {
      el.classList.remove('sidebar-hidden');
    }
  }
  initilaSetup() {
    const el = document.body;
    if (screen.width <= 800) {
      console.log('object');
      el.classList.add('sidebar-hidden');
    }
  }
  final(){
    this.cookieService.delete('token')
    localStorage.clear();
    window.location.reload()
  }
}
