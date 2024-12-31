import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    expect(component.title).toBe('Angular Template - Dev');
  });

  it('title should be "Angular Template - Dev"', () => {
    expect(component.title).toBe('Angular Template - Dev');
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('span.title')?.textContent).toBe(
      'Angular Template - Dev'
    );
  });

  it('should emit toggleSideNav event', () => {
    spyOn(component.toggleSideNav, 'emit');
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector(
      'button.sidenav-toggle'
    ) as HTMLButtonElement;
    button.click();
    expect(component.toggleSideNav.emit).toHaveBeenCalled();
  });
});
