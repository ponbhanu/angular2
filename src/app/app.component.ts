import { Component, ViewContainerRef } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as $ from 'jquery';
import { ToasterService} from 'angular2-toaster';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  files: any = [];
  list: any = [];
  radioSelected: any
  width: any;
  isTrue: any;
  id: any;
  selectedFiles: any = [];
  checkedFiles: any = [];
  isCheckBoxClicked: any = false;
  isRadioClicked: any = false;
  constructor(public http: Http,public toasterService: ToasterService){
  }

  onChange(data) {
    if (data && data.target && data.target.files && data.target.files.length) {
      var totalFiles = data.target.files;
      for (var i = 0; i < totalFiles.length; i++) {
        this.files.push({ 'id': Math.random(), 'name': totalFiles[i].name, 'size': totalFiles[i].size, 'image': totalFiles[i], 'number': 1 + i });
      }
    }
  }

  uploadFiles(type: any, i: any, selectedFiles) {
    this.id = i;
    var file = '';
    if (selectedFiles && selectedFiles.length && selectedFiles.length > 0) {
      file = selectedFiles[this.id].image;
    } else {
      this.toasterService.pop('error', 'Please select files to upload');
      return;
    }
    if (!this.isRadioClicked) {
      this.toasterService.pop('error', 'Please select the primary file');
      return;
    }

    var headers = new Headers();
    for (var k = 0; k < this.files.length; k++) {
      if (this.files[k].isPrimary) {
        headers.append('primary',this.files[k].name );
      }
    }
    let formData: FormData = new FormData();
    formData.append('image', file);
    this.http.post('http://localhost:3000/api/uploadFile', formData, { headers: headers })
      .subscribe(response => {
        if (response.json().message === 'success') {
          this.callLoader();
          this.files[this.id].status = 'success';
          var id = this.id + 1;
          if (selectedFiles && selectedFiles.length && selectedFiles.length > 0) {
            if (id < selectedFiles.length) {
              this.uploadFiles('multiple', id, this.selectedFiles);
            } else {
              this.toasterService.pop('success','All files uploaded successfully');
              //this.toastr.success('All files uploaded successfully');
            }
          } else if (this.files && this.files.length && this.files.length > 0) {
            if (id < this.files) {
              this.uploadFiles('multiple', id, this.files);
            } else {
              this.toasterService.pop('success','All files uploaded successfully');
            //  this.toastr.success('All files uploaded successfully');
            }
          }
        } else if (response.json().resultCode === 'KO') {
          $("#bar").removeClass("bar-grn");
          $("#bar").addClass("bar-red");
          this.files[this.id].status = 'fail';
          
              this.toasterService.pop('error', 'Files uploading has ben stopped');
              //this.toastr.error('Files uploading has ben stopped');
        }
      });
  };


  callLoader() {
    var elem = document.getElementById("bar"),
      width = 1;
    var ids = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(ids);
      } else {
        width++;
        elem.style.width = width + '%';
        elem.innerHTML = width * 1 + '%';
      }
    };
  }


  onClickRadio(data) {
    this.isRadioClicked = true;
    for (var i = 0; i < this.files.length; i++) {
      if (this.files[i].id === data.id) {
        this.files[i].isPrimary = true;
      }
    }
  }

  onClickCheckBox(file) {
    if (this.selectedFiles.indexOf(file) > -1) {
      this.selectedFiles.splice(file, 1);
    } else {
      this.selectedFiles.push(file);
    }
    console.log(this.selectedFiles)
  }

  cancel() {
    this.files = [];
  }

  manageActions(id, type) {
    if (type === 'delete') {
      this.files = this.files.filter((item) => item.id !== id);
    } else if (type === 'cancel') {

    }
  }


  uploadAllFiles() {
    this.uploadFiles('multiple', 0, this.selectedFiles);
  }
}









