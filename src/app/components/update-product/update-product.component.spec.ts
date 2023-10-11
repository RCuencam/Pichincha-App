import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UpdateProductComponent } from './update-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('UpdateProductComponent', () => {
  let component: UpdateProductComponent;
  let fixture: ComponentFixture<UpdateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [ UpdateProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProductComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
