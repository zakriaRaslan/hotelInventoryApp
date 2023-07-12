import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs';
import { CustomValidation } from './CustomValidation/custom-validation';
import { BookingService } from './booking.service';

@Component({
  selector: 'hInv-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private bookingService: BookingService
  ) {}
  ngOnInit(): void {
    const roomNumber = this.route.snapshot.paramMap.get('roomId');
    // You Can Use new FormControl('') OR Use ['']
    this.bookingForm = this.formBuilder.group(
      {
        roomId: new FormControl(
          { value: roomNumber, disabled: true },
          { validators: [Validators.required] }
        ), // to get this filed on submit you should use bookingForm.getRawValue()
        guestEmail: new FormControl('', {
          validators: [Validators.email, Validators.required],
        }),
        checkinDate: [''],
        checkoutDate: [''],
        bookingStatus: new FormControl(''),
        bookingAmount: [''],
        bookingDate: [''],
        mobileNumber: new FormControl(''),
        guestName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(25),
            CustomValidation.validateName,
            CustomValidation.validateSpecialChar('@'),
          ],
        ],
        guests: this.formBuilder.array([this.addGuestControl()]),
        terms: new FormControl(false, {
          validators: [Validators.requiredTrue],
        }),
        address: this.formBuilder.group({
          addressLine1: new FormControl('', {
            validators: [Validators.required],
          }),
          addressLine2: new FormControl(''),
          City: new FormControl('', { validators: [Validators.required] }),
          State: new FormControl(''),
          Country: new FormControl(''),
          ZipCode: new FormControl(''),
        }),
      },{updateOn:'blur',validators:[CustomValidation.validateDate]});

    // this.bookingForm.valueChanges.pipe((data)=>{
    //   mergeMap(data)
    // }
    // )
    // this.bookingForm.valueChanges.subscribe((date) => {
    //   this.bookingService.booking(date).subscribe((date)=>{

    //   })
    // });
    this.bookingForm.valueChanges
      .pipe(mergeMap((data) => this.bookingService.booking(data)))
      .subscribe((data) => console.log(data));
  }

  submitBooking() {
    // console.log(this.bookingForm.value);
    console.log(this.bookingForm.getRawValue());
    // this.bookingService.booking(this.bookingForm.getRawValue()).subscribe((date)=>console.log(date))
    // this.bookingForm.reset();
    this.bookingForm.reset({
      roomId: '2',
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      guests: [],
      terms: false,
      address: this.formBuilder.group({
        addressLine1: '',
        addressLine2: '',
        City: '',
        State: '',
        Country: '',
        ZipCode: '',
      }),
    });
  }
  addGuestControl() {
    return this.formBuilder.group({
      guestName: ['', [Validators.required]],
      age: new FormControl(''),
    });
  }
  addGuest() {
    this.guests.push(this.addGuestControl());
  }
  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }
  removePassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }

  removeGuest(i: number) {
    this.guests.removeAt(i);
  }

  resetForm() {
    this.bookingForm.reset();
  }
  goBack() {
    this.location.back();
  }
}
