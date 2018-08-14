import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnChanges {

  no = 0;
  i =0;
  @Input()
  interval:number;
  constructor() { 

    
  }
  images = [
    'https://images.pexels.com/photos/1275393/pexels-photo-1275393.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/48262/pexels-photo-48262.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/171940/pexels-photo-171940.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
  ]
  ngOnInit() {
  }

  ngOnChanges(){
    setInterval(()=>{
      if(this.i == this.images.length-1){
        this.i = 0;
      }
      this.i++;
    }, this.interval)

  }
  inc(){
      this.no = this.no + 1;
  }
}
