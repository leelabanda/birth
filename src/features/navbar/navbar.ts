import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  constructor(private router: Router) {}

  sidebarOpen = true;
  fatherOpen = false;
  motherOpen = false;

  ngOnInit(): void {
    // Desktop -> open
    // Mobile -> closed
    this.sidebarOpen = window.innerWidth > 768;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebarOnMobile() {
    if (window.innerWidth <= 768) {
      this.sidebarOpen = false;
    }
  }

  toggleFatherMenu() {
    this.fatherOpen = !this.fatherOpen;
  }

  toggleMotherMenu() {
    this.motherOpen = !this.motherOpen;
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768) {
      this.sidebarOpen = true;
    } else {
      this.sidebarOpen = false;
    }
  }

  // Close Father/Mother submenu when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest('.menu-item')) {
      this.fatherOpen = false;
      this.motherOpen = false;
    }
  }

  logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}