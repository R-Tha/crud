import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NgConfirmService } from 'ng-confirm-box';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'CRUD';
  data:any
  displayedColumns: string[] = ['productName', 'category','date','freshness', 'price', 'comment','action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

 constructor(private dialog:MatDialog,private api : ApiService,private confirmService:NgConfirmService){

 }
  ngOnInit(): void {
    this.getAllProducts
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
    width:'30%'
    });
  }
  getAllProducts(){
    this.api.getproduct().subscribe({
      next:(res)=> {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
        this.api.getproduct()

      },
      error:(err)=>{
        alert("Error while fetching the Record!!")
      }
    })

  }
  editproduct(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
