import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  sidebarVisible: boolean = true;

  constructor(private renderer: Renderer2, private router: Router) {}

  closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    const openBtn = document.querySelector('.open-btn');
    if (sidebar && mainContent && openBtn) {
      this.renderer.addClass(sidebar, 'sidebar-hidden');
      this.renderer.addClass(mainContent, 'full-width');
      this.renderer.setStyle(openBtn, 'display', 'block');
    }
    this.sidebarVisible = false;
  }

  openSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    const openBtn = document.querySelector('.open-btn');
    if (sidebar && mainContent && openBtn) {
      this.renderer.removeClass(sidebar, 'sidebar-hidden');
      this.renderer.removeClass(mainContent, 'full-width');
      this.renderer.setStyle(openBtn, 'display', 'none');
    }
    this.sidebarVisible = true;
  }
}
