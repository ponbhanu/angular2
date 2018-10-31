import { Component, ViewContainerRef } from '@angular/core';
import { Http, Response, Headers , RequestOptions } from '@angular/http';
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as $ from 'jquery';

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
  checkedFiles :any= [];
  isCheckBoxClicked: any = false;
  constructor(public http: Http) {
    

  }

  onChange(data) {
    if (data && data.target && data.target.files && data.target.files.length) {
      var totalFiles = data.target.files;
      for (var i = 0; i < totalFiles.length; i++) {
        this.files.push({ 'id': Math.random(), 'name': totalFiles[i].name, 'size': totalFiles[i].size, 'image': totalFiles[i], 'number': 1 + i });
      }
    }
  }

  uploadFiles(type: any, i: any) {
    this.id = i;
    if (type === 'single') {
      var file = this.files.filter((item) => item.id === this.id);
      file = file[0].image
    } else {
      var file = this.files[this.id].image;
    }
    var elem = document.getElementById("bar"),
      width = 1,
      ids = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(i);
      } else {
        width++;
        elem.style.width = width + '%';
        elem.innerHTML = width * 1 + '%';
      }
    };
    var headers = new Headers();
    for (var k = 0; k < this.files.length; k++) {
      if (this.files[k].isPrimary) {
        headers.append('primary',this.files[k].name );
      }
    }
    let formData: FormData = new FormData();
    formData.append('file', file);
    this.http.post('http://localhost:3000/api/uploadFile', formData, { headers: headers })
      .subscribe(response => {
        if (response.json().resultCode === 'OK') {
          if (type === 'single') {
            for (var i = 0; i < this.files.length; i++) {
              if (this.files[i].id === this.id) {
                this.files[i].status = 'success';
              }
            }
          } else {
            this.files[this.id].status = 'success';
          }
          var id = this.id + 1;
          if (type === 'multiple') {
            if (id < this.files.length) {
              this.uploadFiles('multiple', id);
            } else {
      //        this.toastr.success('All files uploaded successfully');
            }
          }
        } else if (response.json().resultCode === 'KO') {
          if (type === 'single') {
            for (var i = 0; i < this.files.length; i++) {
              if (this.files[i].id === this.id) {
                this.files[i].status = 'fail';
                
              }
            }
          }
          $("#bar").removeClass("bar-grn");
          $("#bar").addClass("bar-red");
            this.files[this.id].status = 'fail';
        //    this.toastr.error('Files uploading has ben stopped');
        }
      });
  };

  onClickRadio(data) {
    for (var i = 0; i < this.files.length; i++) {
      if (this.files[i].id === data.id) {
        this.files[i].isPrimary = true;
      }
    }
  }

  cancel() {
    this.files = [];
  }

  manageActions(id, type) {
    if (type === 'delete') {
      this.files = this.files.filter((item) => item.id !== id);
    } else if (type === 'upload') {
      this.uploadFiles('single', id);
    } else if (type === 'cancel') {

    }
  }


  uploadAllFiles() {
    this.uploadFiles('multiple', 0);
  }
}

