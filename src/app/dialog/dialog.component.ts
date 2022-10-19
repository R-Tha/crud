import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import { createInjectableType } from '@angular/compiler';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshnessList = ["Brand New","Second Hand","Refurbished"]
  productForm ! : FormGroup;
  constructor(private formbuilder :FormBuilder,
    action :string ="save",
  private api : ApiService,
   @Inject(MAT_DIALOG_DATA) public editdata:any,
   private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      productName :['',Validators.required],
      category : ['',Validators.required],
      freshness : ['',Validators.required],
      price : ['',Validators.required],
      comment :['',Validators.required],
      date : ['',Validators.required]


    });
    if(this.editdata){
      this.productForm.controls['productName'].setValue(this.editdata.productName);
      this.productForm.controls['category'].setValue(this.editdata.category);
      this.productForm.controls['freshness'].setValue(this.editdata.freshness);
      this.productForm.controls['price'].setValue(this.editdata.price);
      this.productForm.controls['comment'].setValue(this.editdata.comment);
      this.productForm.controls['date'].setValue(this.editdata.date);


    }
  }
  addproduct(){
    if(this.productForm.valid){
      this.api.postproduct(this.productForm.value)
      .subscribe({
        next:(res)=>{
          alert("product added sucessfully");
          this.productForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Error while adding prouct")
        }
      })
    }
  }

}
