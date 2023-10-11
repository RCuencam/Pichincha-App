import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IProduct } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  productsAux: IProduct[] = [];
  searchControl: FormControl = new FormControl('');
  productsQuantity: number = 5;
  openDeleteModal: boolean = false;
  productToDelete!: IProduct;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
    this.initControl();
  }

  initControl(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      this.products = this.productsAux.filter(item => {
        return item.name.toLowerCase().includes(value.toLowerCase())
      }).slice(0, this.productsQuantity);
    })
  }

  getProducts(): void {
    this.productService.loading = true;
    this.productService.getProducts().subscribe(resp => {
      this.productsQuantity = resp.length;
      this.productsAux = resp;
      this.products = resp.map(product => ({ ...product, openDropdown: false })).slice(0, this.productsQuantity);
      this.productService.loading = false;
    })
  }

  editProduct(product: IProduct) {
    this.productService.productToEdit = product;
    this.router.navigate(['/update'])
  }

  deleteProduct(product: IProduct) {
    this.productToDelete = product;
    this.openDeleteModal = true;
  }
  
  setProductsQuantity(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    const searchValue = this.searchControl.value;
    this.products = this.productsAux.filter(item => {
      return item.name.toLowerCase().includes(searchValue.toLowerCase())
    }).slice(0, Number(value));
  }

  toggleDropDown(productId: string): void {
    this.products = this.products.map(product => product.id === productId ? { ...product, openDropdown: !product.openDropdown }: { ...product, openDropdown: false })
  }

  closeModal(): void {
    this.openDeleteModal = false;
  }
}
