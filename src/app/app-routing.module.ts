import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RegisterProductComponent } from './components/register-product/register-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'register',
    component: RegisterProductComponent
  },
  {
    path: 'update',
    component: UpdateProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
