import { Component } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export type SideNavMenuConfiguration = {
  title: string;
  icon: string;
  route: string;
};

@Component({
  selector: 'app-side-nav',
  imports: [MatListModule, MatIconModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  public readonly menuConfigurationItems: SideNavMenuConfiguration[] = [
    {
      title: 'Home',
      icon: 'house',
      route: '/',
    },
  ];
}
