import { AfterViewInit, Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService } from '@app/core/services/theme.service';
import { HeaderComponent } from '../header/header.component';
import { SideNavComponent } from '../side-nav/side-nav.component';

import {
  MatSidenav,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [
    HeaderComponent,
    SideNavComponent,
    MatSidenavModule,
    RouterOutlet,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  isCollapsed = false;
  isMobile = false;
  readonly themeService = inject(ThemeService);

  @ViewChild(MatSidenav)
  private readonly sideNav: MatSidenav | undefined;
  private readonly destroyRef = inject(DestroyRef)
  private readonly observer = inject(BreakpointObserver);

  ngOnInit(): void {
    this.observer.observe('(max-width: 600px)').pipe(takeUntilDestroyed(this.destroyRef)).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isCollapsed = false;
        this.isMobile = true;
      } else {
        this.isCollapsed = !this.isCollapsed;
        this.isMobile = false;
      }
    })
  }

  toggleSideNavMenu(): void {
    console.log(this.isMobile, this.isCollapsed)
    if (this.isMobile) {
      this.sideNav?.toggle();
      this.isCollapsed = false; // On mobile, the is not collapsed
    } else {
      this.sideNav?.open(); // On desktop, the side nav is always open
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
