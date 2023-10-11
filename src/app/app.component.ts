import { Component, ChangeDetectorRef, OnInit  } from '@angular/core';
import { ProductService } from './services/product/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public productService: ProductService, private cd: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    this.productService.getLoading.subscribe(value => {
      this.cd.detectChanges();
    })
  }
  title = 'pichincha-app';
}
