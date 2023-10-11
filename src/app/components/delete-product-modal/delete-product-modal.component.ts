import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-delete-product-modal',
  templateUrl: './delete-product-modal.component.html',
  styleUrls: ['./delete-product-modal.component.scss']
})
export class DeleteProductModalComponent {
  @Input() product!: IProduct;
  @Output() close = new EventEmitter<boolean>();

  constructor(private productService: ProductService, private router: Router){}

  closeModal(): void {
    this.close.emit(false);
  }

  deleteProduct(): void {
    this.productService.loading = true;
    this.productService.deleteProduct(this.product.id).subscribe(resp => {
      this.productService.loading = false;
      this.router.navigate(['/']);
    }, error => {
      this.productService.loading = false;
    })
  }
}
