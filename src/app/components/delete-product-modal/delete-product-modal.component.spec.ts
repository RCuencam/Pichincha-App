import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductModalComponent } from './delete-product-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('DeleteProductModalComponent', () => {
  let component: DeleteProductModalComponent;
  let fixture: ComponentFixture<DeleteProductModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [ DeleteProductModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProductModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
