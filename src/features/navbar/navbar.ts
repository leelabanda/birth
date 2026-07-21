import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
constructor(private router:Router){}
sidebarOpen = true;

motherOpen = false;
fatherOpen = false;
//sidebarOpen = true;

toggleSidebar() {
  this.sidebarOpen = !this.sidebarOpen;
}
toggleMotherMenu() {
  this.motherOpen = !this.motherOpen;
}
  // Close menus when clicking anywhere outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest('.menu-item')) {
      this.fatherOpen = false;
      this.motherOpen = false;
    }
  }

toggleFatherMenu() {
  this.fatherOpen = !this.fatherOpen;
}
logout(){
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('username');
this.router.navigate(['/login']);

}


}

