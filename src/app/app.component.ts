import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  files :any = [];
  constructor(public http:Http) {
    
  }

  onChange(data) {
    console.log(data);
    if (data && data.target && data.target.files && data.target.files.length) {
       var totalFiles = data.target.files;
       for (var i = 0;i< totalFiles.length;i++) {
          this.files.push({'id':Math.random(),'name':totalFiles[i].name,'size':totalFiles[i].size,'image': totalFiles[i],'number':1+i});
       }
    }
  }

  uploadFiles (id:any) {
    var headers = new Headers();
    let formData: FormData = new FormData();
    var image = this.files.filter((item) => item.id === id);
    formData.append('image',image[0].image);
    this.http.post('http://localhost:3000/api/uploadFile', formData, { headers: headers })
    .subscribe(response => {
      if (response.json().message === 'success') {
        for (var i = 0;i< this.files.length;i++) {
            if (this.files[i].id === id) {
              this.files[i].status = 'success';
            }
        }
      } else if (response.json().message === 'fail') {
        for (var i = 0;i< this.files.length;i++) {
          if (this.files[i].id === id) {
            this.files[i].status = 'fail';
          }
      }
      }
      
    });

  }
    
  manageActions(id,type) {
    if (type === 'delete') {
      this.files = this.files.filter((item) => item.id !== id);
    } else if (type === 'upload') {
      this.uploadFiles(id);
    } else if (type === 'cancel') {

    }
  }
}

