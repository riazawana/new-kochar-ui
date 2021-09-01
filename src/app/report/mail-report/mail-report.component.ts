import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mail-report',
  templateUrl: './mail-report.component.html',
  styleUrls: ['./mail-report.component.css']
})
export class MailReportComponent implements OnInit {

  constructor() { }

  start:any;
  // starttime:any;

  end:any;
  // endtime:any;

  ngOnInit(): void {
  }

  getrep(s,e){
    alert(s);
    alert(e);

  }

}
