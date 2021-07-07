import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendconnectionService } from '../../backendconnection.service';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {

  constructor( 
    private backend: BackendconnectionService,
    public dialogRef: MatDialogRef<DetailModalComponent>,
    private dialog: MatDialog,

    @Inject(MAT_DIALOG_DATA) public data: any) { }
    
  


    type:any;
    da:any;

    ngOnInit(): void {
        //console.log(this.data)
        this.da = this.data.da.escalation;
    }


    

    onclose(): void {
      this.dialogRef.close();
    }
   inp:any;
    copy(x){
      // alert(x);
      this.inp = x;

      setTimeout(function(){ 

        var copyText = (<HTMLInputElement>document.getElementById('inp'));
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        alert("Copied the text: " + copyText.value);

       }, 1000);
  
    }

    police_value : any = "100";
   
    sendmssg(mac_id,phone,msg,client){
      this.backend.sendSMS(mac_id,phone,msg,client)
  .subscribe((data)=> { 
    //console.log("Send mssf",data["data"]);
  });
    }

      }
