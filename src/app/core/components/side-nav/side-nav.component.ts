import { Component, Input } from '@angular/core';

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
  imports: [MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  @Input() public isCollapsed = true;

  public readonly menuConfigurationItems: SideNavMenuConfiguration[] = [
    {
      title: 'Home',
      icon: 'house',
      route: '/',
    },
  ];
}
