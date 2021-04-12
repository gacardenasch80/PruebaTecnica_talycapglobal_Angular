// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RestService } from '../../rest.service';
import { Router } from "@angular/router"
import { element } from 'protractor';
import * as XLSX from 'xlsx'; 

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-data-table-cmp',
    templateUrl: 'datatable.component.html'
})

  
export class DataTableComponent implements OnInit, AfterViewInit {
  constructor(private router: Router, public rest: RestService) { }
  public dataTable: DataTable;
  token: string;
  

  /*name of the excel-file which will be downloaded. */ 
  fileName= 'ExcelSheet.xlsx';  
  
  exportexcel(): void 
  {
      /* table id is passed over here */   
      let element = document.getElementById('datatables'); 
      const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, this.fileName);
    
  }

  ngOnInit() {
    this.token = localStorage.getItem('token');  
    if (this.token == null){
        this.router.navigate(['../pages/login'])
    }
    this.loadGridAuthors();
  }

  ngAfterViewInit() {
    $('#datatables').DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "All"]
      ],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Buscar Registros",
      }
    });

    const table = $('#datatables').DataTable();

    // Edit record
    table.on('click', '.edit', function(e) {
      let $tr = $(this).closest('tr');
      if ($($tr).hasClass('child')) {
        $tr = $tr.prev('.parent');
      }

      var data = table.row($tr).data();
      alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
      e.preventDefault();
    });

    // Delete a record
    table.on('click', '.remove', function(e) {
      const $tr = $(this).closest('tr');
      table.row($tr).remove().draw();
      e.preventDefault();
    });

    //Like record
    table.on('click', '.like', function(e) {
      alert('You clicked on Like button');
      e.preventDefault();
    });

    $('.card .material-datatables label').addClass('form-group');
  }
  
  loadGridAuthors() {
    this.rest.getBooksAuthors(this.token).subscribe((resp: any) => {
      var data = [];
       resp.forEach(function (item){data.push(Object.values(item))}) 
         this.dataTable = {
           headerRow: ['Id', 'Título', 'Autores', 'Fecha de Publicación', 'Hojas', 'Actions'],
           footerRow: ['Id', 'Título', 'Autores', 'Fecha de Publicación', 'Hojas', 'Actions'],
           dataRows: data
         };
        },(err) => {
            $.notify({
                icon: "notifications",
                message: err
            }, {
                type: 'danger',
                timer: 4000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });
     }); 
  }
}
