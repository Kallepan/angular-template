import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { ThemeService } from '@app/core/services/theme.service';
import { HeaderComponent } from '../header/header.component';
import { SideNavComponent } from '../side-nav/side-nav.component';

import {
  MatSidenavContainer,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-main',
  imports: [
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    MatSidenavModule,
    RouterOutlet,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements AfterViewInit {
  sideNavOpened = false;
  readonly themeService = inject(ThemeService);

  @ViewChild(MatSidenavContainer)
  private readonly sidenavContainer: MatSidenavContainer | undefined;

  ngAfterViewInit(): void {
    this.sidenavContainer?.scrollable?.elementScrolled().subscribe(() => {
      // React to scroll events
    });
  }
}
