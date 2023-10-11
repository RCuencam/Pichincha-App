import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.scss']
})
export class RegisterProductComponent {
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) {
    this.initForm();
  }
  
  initForm(): void {
    this.registerForm = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      date_release: ['', Validators.required],
      date_revision: ['', Validators.required]
    })
    this.validateID();
    this.registerForm.markAllAsTouched();

  }

  isValidControl(control: string): boolean {
    return this.registerForm.get(control)!.invalid && this.registerForm.get(control)!.touched;
  }

  validateID():void {
    this.registerForm.get('id')?.valueChanges.pipe(
      debounceTime(800),
      distinctUntilChanged(),
      switchMap((value) => {
        this.productService.loading = true;
        return this.productService.verifyID(value)
      })
    ).subscribe(resp => {
      this.productService.loading = false;
      let errors = this.registerForm.get('id')?.errors;
      if(!resp) {
        this.registerForm.get('id')?.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(10)])
      } else {
        this.registerForm.get('id')?.setErrors({ ...errors, validateID: true })
      }
    })
  }

  validateDates(event: Event): void {
    const input = new Date((event.target as HTMLInputElement).value).getTime();
    const today = new Date().getTime() - 86400000;
    const dateRelease = this.registerForm.get('date_release');
    const dateRevision = this.registerForm.get('date_revision');
    
    if(input >= today) {
      dateRelease?.setErrors(null);
      const date_revision = this.getFormattedDate(dateRelease?.value)
      this.registerForm.get('date_revision')?.patchValue(date_revision);
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
    const date = new Date(Number(year) + 1, Number(month) - 1, Number(day));
    
    const newYear = date.getFullYear();
    const newMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const newDay = date.getDate().toString().padStart(2, '0');
    const result = `${newYear}-${newMonth}-${newDay}`;

    return result;
  }

  resetForm(): void {
    this.registerForm.reset();
    this.registerForm.markAllAsTouched();
  }

  createProduct(): void {
    if(this.registerForm.valid) {
      this.productService.loading = true;
      this.productService.createProduct(this.registerForm.value).subscribe(resp => {
        if(resp) {
          this.router.navigate(['/']);
        }
        this.productService.loading = false;
      })
    }    
  }
}
