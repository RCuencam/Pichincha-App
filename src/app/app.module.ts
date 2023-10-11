import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterProductComponent } from './components/register-product/register-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { DeleteProductModalComponent } from './components/delete-product-modal/delete-product-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    NavbarComponent,
    RegisterProductComponent,
    UpdateProductComponent,
    DeleteProductModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
