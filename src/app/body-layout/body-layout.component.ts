import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-body-layout',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './body-layout.component.html',
  styleUrl: './body-layout.component.css',
})
export class BodyLayoutComponent {}
