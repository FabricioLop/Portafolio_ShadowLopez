import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('renders the hero heading', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Fabricio');
  });

  it('renders the page content even while the splash is showing', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.componentInstance.showSplash.set(true);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-splash')).toBeTruthy();
    expect(compiled.querySelector('#projects')).toBeTruthy();
    expect(compiled.querySelector('#contact')).toBeTruthy();
  });
});
