import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  updateForm!: FormGroup;
  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) {
    if(!this.productService.productToEdit) {
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {
    this.initForm();
  }
  
  initForm(): void {
    const currentProduct = this.productService.productToEdit;
    
    this.updateForm = this.fb.group({
      id: [{ value: currentProduct.id, disabled: true  }, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: [currentProduct.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: [currentProduct.description, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: [currentProduct.logo, Validators.required],
      date_release: [this.getCurrentFormattedDate(currentProduct.date_release.split("T")[0]), Validators.required],
      date_revision: [this.getCurrentFormattedDate(currentProduct.date_revision.split("T")[0]), Validators.required]
    })
    this.updateForm.markAllAsTouched();
  }

  isValidControl(control: string): boolean {
    return this.updateForm.get(control)!.invalid && this.updateForm.get(control)!.touched;
  }

  validateDates(event: Event): void {
    const input = new Date((event.target as HTMLInputElement).value).getTime();
    const today = new Date().getTime() - 86400000;
    const dateRelease = this.updateForm.get('date_release');
    const dateRevision = this.updateForm.get('date_revision');
    
    if(input >= today) {
      dateRelease?.setErrors(null);
      const date_revision = this.getFormattedDate(dateRelease?.value)
      this.updateForm.get('date_revision')?.patchValue(date_revision);
      dateRevision?.setErrors(null)
    } else {
      dateRelease?.setErrors({ valid: true });
      dateRevision?.setErrors({ required: true })
      dateRevision?.reset();
    }
    dateRelease?.markAsTouched();
  }

  getFormattedDate(value: string): string {
    const [year, month, day] = value.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    
    const newYear = date.getFullYear() + 1;
    const newMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const newDay = date.getDate().toString().padStart(2, '0');
    const result = `${newYear}-${newMonth}-${newDay}`;
    return result;
  }

  getCurrentFormattedDate(value: string): string {
    const [year, month, day] = value.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    
    const newYear = date.getFullYear();
    const newMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const newDay = date.getDate().toString().padStart(2, '0');
    const result = `${newYear}-${newMonth}-${newDay}`;
    return result;
  }

  resetForm(): void {
    this.updateForm.patchValue({
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
      id: this.productService.productToEdit.id
    });
    this.updateForm.markAllAsTouched();
  }

  createProduct(): void {
    if(this.updateForm.valid) {
      this.productService.loading = true;
      this.productService.updateProduct(this.updateForm.getRawValue()).subscribe(resp => {
        if(resp) {
          this.router.navigate(['/']);
        }
        this.productService.loading = false;
      })
    }    
  }
}
