import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { ProductService } from './services/product/product.service';

describe('AppComponent', () => {
  let service: ProductService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    service = TestBed.inject(ProductService)
  });

  test('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  test(`should have as title 'pichincha-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    expect(component.title).toEqual('pichincha-app');
  });

  test('should get loading value', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    service.getLoading.subscribe(resp => {
      fixture.detectChanges();
      expect(resp).toBe(false);
      done();
    })
  })

});
