import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IProduct } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = environment.API_BASE_URL;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  productToEdit!: IProduct;

  get getLoading() {
    return this.loading$.asObservable()
  }

  set loading(value: boolean) {
    this.loading$.next(value);
  }

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.url}/bp/products`);
  }

  verifyID(id: string): Observable<boolean> {
    const params = new HttpParams().append('id', id)
    return this.http.get<boolean>(`${this.url}/bp/products/verification`, { params })
  }

  createProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.url}/bp/products`, product);
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.url}/bp/products`, product);
  }

  deleteProduct(productId: string): Observable<boolean> {
    const params = new HttpParams().append('id', productId);
    return this.http.delete<boolean>(`${this.url}/bp/products`, { params });
  }
}
