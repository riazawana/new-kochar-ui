import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendconnectionService } from '../backendconnection.service';
import {Router} from '@angular/router';
import { faSignOutAlt,faCaretDown } from '@fortawesome/free-solid-svg-icons';
import {SocketioService} from "../socketio.service";
import {SocketioSendmsgService} from "../socketio-sendmsg.service";
import { NotifierService } from 'angular-notifier';
import { NotificationsService } from 'angular2-notifications';
import { KeycloakService } from 'keycloak-angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  faCaretDown = faCaretDown;

  faSignOutAlt = faSignOutAlt;
  
  private notifier: NotifierService;
  notif: boolean = false;

  constructor(
    private _notifications: NotificationsService,
    private socketService: SocketioService,
    private soc:SocketioSendmsgService,
    private router: Router,
    private backend: BackendconnectionService,
    private keycloakService : KeycloakService,
    notifier: NotifierService,
    private ngxLoader: NgxUiLoaderService
  ) {

    this.notifier = notifier;
   }



  sidebar:any;
  notification:any;
  notificationcount:number = 0;

 
  

  sendMessage() {
   
    var data = {
      mac:"asdf",
      type:"asdf123",
      value:"asdd"
    }
     
   this.soc.sendMsg(data);

   
 }
 
 profile_name:any;
 client :any;

  ngOnInit(): void {
    this.ngxLoader.start();
    try {
      let userDetails = this.keycloakService;
    

      sessionStorage.setItem('token', userDetails["_instance"].token);
      sessionStorage.setItem('userdata', JSON.stringify(userDetails["_instance"].tokenParsed));
      sessionStorage.setItem('userid', userDetails["_instance"].tokenParsed.sub);
      sessionStorage.setItem('role', userDetails["_instance"].realmAccess.roles[0]);

      if(userDetails["_instance"].realmAccess.roles[0] == 'admin'){
          this.notif = false;
      }else{
        this.notif = true;
      }


      this.profile_name = userDetails["_instance"].tokenParsed.name;
      
      this.backend.getUserInfo(userDetails["_instance"].tokenParsed.email)
      .subscribe((data)=> {  
        console.log("userInfo:",data)
        this.client = data["data"][0].client;
        this.ngxLoader.stop();
      })

      this.backend.getrole(userDetails["_instance"].realmAccess.roles[0])
      .subscribe((data)=> { 

        var role = userDetails["_instance"].realmAccess.roles[0];
    
        if(role == 'admin'){
          sessionStorage.setItem('features',  JSON.stringify('admin'));
        }else{
           sessionStorage.setItem('features',  JSON.stringify(data['data'][0].feature_mapping[0].mapping)); 
        }
  
      })

      this.backend.getModulesAgainstRole()
      .subscribe((data)=> { 
     // console.log("data:",data);
      this.sidebar = data["data"][0].mapping;

      })
      
      } catch (e){
     // console.log('Failed to load user details', e);
      }

  
    this.soc.messages.subscribe(msg => {

      if(msg.type == "iot-gateway-notification"){
          var type;
      console.log(msg);
      
      console.log(JSON.parse(msg.text[0]));
      var da = JSON.parse(msg.text[0]);
      var x = da[0]._id;
      var cli = da[0].client;
        // alert(cli);

    if(da[0].notification_category_name == "Health Check") {
      type = "warn"
    }else{
      type = "error"
    }
      if(this.notif == true){

        for(var i = 0; i < this.client.length; i++){
        // alert(this.client[i]);

          if(this.client[i] == cli){
              console.log(JSON.parse(msg.text[0])[0].data.notification);
              var notdata = JSON.parse(msg.text[0])[0].data.notification;
              var send_time = JSON.parse(msg.text[0])[0].send_time;
              this.create("Notification",notdata,send_time,x,cli,type);
              this.backend.getNotificationCount()
              .subscribe((data)=> { 
               console.log(data)
                this.notificationcount = data["opencount"]; 
              })
            
          }
        }
       
       
      
      }
    }



    })

   
      this.w3_open();

      if( this.notif == true){
       this.backend.getNotificationCount()
       .subscribe((data)=> { 
        console.log(data)
         this.notificationcount = data["opencount"]; 
       })
   
      }
      
      
     
  }

  clear(){
    this._notifications.remove()
  }

  create(title,content,send_time,id,cli,type) {

    var data = content+"\r\n"+send_time //JSON.parse(content);
     console.log(data);
    
     
     if(type == "success"){
      this.notification = this._notifications.success(title, data, {
        timeOut: 100000,
        showProgressBar: true,
        pauseOnHover: true
      });
     }if(type == "warn"){
      this.notification = this._notifications.warn(title, data, {
        timeOut: 100000,
        showProgressBar: true,
        pauseOnHover: true
      });
     }if(type == "error"){
      this.notification = this._notifications.error(title, data, {
        timeOut: 100000,
        showProgressBar: true,
        pauseOnHover: true
      });
     }



  
    this.notifyMe(data);
    this.notification.click.subscribe(function(noti, mouseEvent){
   // alert(id);
    this.router.navigate(['kochar/Notifications/notification-details',id,cli]);

   // console.log(notif);
    
  }.bind(this, this.notification));

  }
  

 

  ngOnDestroy(){
   
  }

  w3_open() {
    document.getElementById("main").style.marginLeft = "20%";
    document.getElementById("mySidebar").style.width = "20%";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
    document.getElementById("closeNav").style.display = 'block';

  }
  
  w3_close() {
  document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
  document.getElementById("closeNav").style.display = 'none';

  }
  

  logout(){
    // alert("logout");
     this.router.navigate(['kochar/profile']);

     setTimeout(()=> {
      sessionStorage.clear();
      this.keycloakService.logout();
     }, 2000);

   


  }

  redirect(){
    this.router.navigate(['kochar/profile']);
  }

  

  next(x){
    // alert(x)
    this.router.navigate([x]);

  }


  goto_notification(){
    this.router.navigate(['kochar/Notifications']);

  }




   notifyMe(x) {
    
          var options = {
                  body: x
               };
            var notification = new Notification("Hi there",options);
  
  }









   

}
