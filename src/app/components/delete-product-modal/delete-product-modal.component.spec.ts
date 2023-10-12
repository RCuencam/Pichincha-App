import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DeleteProductModalComponent } from './delete-product-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { BehaviorSubject, Observable, of } from 'rxjs';

describe('DeleteProductModalComponent', () => {
  let component: DeleteProductModalComponent;
  let fixture: ComponentFixture<DeleteProductModalComponent>;
  let service: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [ DeleteProductModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProductModalComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProductService);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should emit output event', () => {
    const spyEvent = jest.spyOn(component.close, 'emit');
    component.closeModal();
    expect(spyEvent).toHaveBeenCalledWith(false)
  })

  test('should set loading=true when delete product', fakeAsync(() => {

    component.product = {
      id: '1',
      name: 'test',
      description: 'test',
      date_release: 'test',
      date_revision: 'test',
      logo: 'test'
    }
    const spyEvent = jest.spyOn(service.loading$, 'next');
    service.loading = true;
    expect(spyEvent).toHaveBeenCalledWith(true);
    
    const deleteProductSpy = jest.spyOn(service, 'deleteProduct').mockReturnValue(of(false));
    component.deleteProduct();
    expect(deleteProductSpy).toHaveBeenCalled();

    service.loading = false;
    expect(spyEvent).toHaveBeenCalledWith(false);
    tick();
  }));
});
