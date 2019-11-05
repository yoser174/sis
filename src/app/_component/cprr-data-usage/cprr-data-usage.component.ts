import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/_service/data.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-cprr-data-usage',
  templateUrl: './cprr-data-usage.component.html',
  styleUrls: ['./cprr-data-usage.component.css']
})
export class CprrDataUsageComponent implements OnInit {

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  model: any = {};
  index;
  user_id;
  isLoadingResults;
  dataFromServer;
  dataSource;
  displayedColumns: string[] = ['file','size', 'created' ];

  basePath = environment.basePath;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private http: HttpClient,
    private toastr: ToastrService,
    private dataService: DataService) { }


    public loadData(){
      this.model.action = 'cprr-data-usage';
      this.model.access_token = localStorage.getItem('access_token');
      this.dataService.getData(this.model).subscribe(response => {
        if (response.status === 'success') {
          this.isLoadingResults = true;
          this.dataFromServer = response['data'];
          console.log(this.dataFromServer);
          let tmp: Storage[] = this.dataFromServer['files'];
  
          this.dataSource = new MatTableDataSource(tmp);
          console.log(this.dataSource);
          this.isLoadingResults = false;
          this.dataSource.paginator = this.paginator;
  
          console.log(this.dataSource);
  
        }
      }, error => {
        this.showError();
        this.isLoadingResults = false;
      });
    }

  ngOnInit() {
    this.loadData();
  }


  

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
  }

  private refreshTable() {
    this.dataSource = [];
    this.loadData();
  }

  showSuccess() {
    this.toastr.success(`uploaded.`, 'Success');
  }

  showError() {
    this.toastr.error('Something bad happened; Please try again later.', 'Major Error');
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    formData.append('access_token',localStorage.getItem('access_token'));
    console.log(this.fileData);
    console.log(formData);

    this.fileUploadProgress = '0%';

    this.http.post(this.basePath + 'upload.php', formData,{
      reportProgress: true,
      observe: 'events'   
    })
      .subscribe(
        events => {
          if(events.type === HttpEventType.UploadProgress) {
            this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
            console.log(this.fileUploadProgress);
          } else if(events.type === HttpEventType.Response) {
            this.fileUploadProgress = '';
            console.log(events.body);
            let status = events.body['data']['status'];
            console.log(status);
            if(status === 'success'){
              this.showSuccess();
              this.refreshTable();
            }
            else
            {
              this.showError();
            }
          }
             
        }
      )

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
