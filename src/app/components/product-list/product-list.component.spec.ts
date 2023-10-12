import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductListComponent } from './product-list.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, startWith } from 'rxjs';
import { ProductService } from '../../services/product/product.service';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let service: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [ ProductListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('product list should be customize', fakeAsync(() => {
    let product = { id: '', name: 'Producto B', date_release: '', date_revision: '', logo: '', description: '' };
    component.productsAux = [product]
    component.initControl();
    component.searchControl.setValue('B');
    tick(600);
    expect(component.products).toEqual([{ ...component.productsAux[0], name: 'Producto B' }]);
  }))

  test('product quantity should by product array length', () => {
    let product = { id: '', name: 'Producto B', date_release: '', date_revision: '', logo: '', description: '' };
    const getProductsSpy = jest.spyOn(service, 'getProducts').mockReturnValue(of([product]));
    component.getProducts();
    component.productsQuantity = 1;
    expect(getProductsSpy).toHaveBeenCalled();
    expect(component.productsQuantity).toBe([product].length);
  })

  test('product to edit should be modify', () => {
    let product = { id: '', name: 'Producto B', date_release: '', date_revision: '', logo: '', description: '' };
    component.editProduct(product);
    expect(service.productToEdit).toBe(product);
  })

  test('product to delete should be modify', () => {
    let product = { id: '', name: 'Producto B', date_release: '', date_revision: '', logo: '', description: '' };
    component.deleteProduct(product);
    expect(component.productToDelete).toBe(product);
  })

  test('close modal should be modify', () => {
    component.closeModal();
    expect(component.openDeleteModal).toBe(false);
  })

  test('value should be modify in serProductsQuantity function', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = '5';
    
    const event = new Event('input');
    inputElement.dispatchEvent(event);
    component.setProductsQuantity(event);
    expect(component.productsQuantity).toBe(5);
  })

  test('set products when change quantity', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = '5';
    const event = new Event('input');
    inputElement.dispatchEvent(event);
    component.setProductsQuantity(event);

    let product = { id: '', name: 'Producto B', date_release: '', date_revision: '', logo: '', description: '' };
    component.productsAux = [product]
    component.products = [product];
    expect(component.products).toEqual(component.productsAux);
  })
  
  test('toggle dropdown set products', () => {
    component.products = [
      { id: '1', name: 'Producto B', date_release: '', date_revision: '', logo: '', description: '', openDropdown: false },
      { id: '2', name: 'Producto B', date_release: '', date_revision: '', logo: '', description: '', openDropdown: true },
      { id: '3', name: 'Producto B', date_release: '', date_revision: '', logo: '', description: '', openDropdown: false },
    ];
    component.toggleDropDown('2');
    expect(component.products).toEqual([
      { id: '1', name: 'Producto B', date_release: '', date_revision: '', logo: '', description: '', openDropdown: false },
      { id: '2', name: 'Producto B', date_release: '', date_revision: '', logo: '', description: '', openDropdown: false },
      { id: '3', name: 'Producto B', date_release: '', date_revision: '', logo: '', description: '', openDropdown: false },
    ]);
  })
});
