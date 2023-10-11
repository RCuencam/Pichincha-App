import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegisterProductComponent } from './register-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('RegisterProductComponent', () => {
  let component: RegisterProductComponent;
  let fixture: ComponentFixture<RegisterProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [ RegisterProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
