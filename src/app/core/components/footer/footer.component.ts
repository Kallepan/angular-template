import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { environment } from '@env/environment';

@Component({
  selector: 'app-footer',
  imports: [MatDividerModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly currentYear: number = new Date().getFullYear();
  readonly title: string = environment.appName;
}
