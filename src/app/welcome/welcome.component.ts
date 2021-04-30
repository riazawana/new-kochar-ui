import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendconnectionService } from '../backendconnection.service';
import {Router} from '@angular/router';
import { faSignOutAlt,faCaretDown } from '@fortawesome/free-solid-svg-icons';
import {SocketioService} from "../socketio.service";
import {SocketioSendmsgService} from "../socketio-sendmsg.service";
import { NotifierService } from 'angular-notifier';
import { NotificationsService } from 'angular2-notifications';
import { KeycloakService } from 'keycloak-angular';

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
    notifier: NotifierService 
  ) {

    this.notifier = notifier;
   }



  sidebar:any;
  notification:any;
  notificationcount:number = 0;

  create(title,content,id,cli) {

    var data = content //JSON.parse(content);
     console.log(data);
    
     var type = "success";
     if(type == "success"){
      this.notification = this._notifications.success(title, data, {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true
      });
     }if(type == "warn"){
      this.notification = this._notifications.warn(title, data, {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true
      });
     }if(type == "error"){
      this.notification = this._notifications.error(title, data, {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true
      });
     }



  
    this.notifyMe(data);
    this.notification.click.subscribe(function(notif, mouseEvent){
   // alert(id);
    this.router.navigate(['kochar/Notifications/notification-details',id,cli]);

   // console.log(notif);
    
  }.bind(this, this.notification));

  }
  
  

  sendMessage() {
   
    var data = {
      mac:"asdf",
      type:"asdf123",
      value:"asdd"
    }
     
   this.soc.sendMsg(data);

   
 }

  ngOnInit(): void {

    try {
      let userDetails = this.keycloakService;
      // console.log(userDetails);
      // console.log("%cInstance : ","color:green", userDetails["_instance"]);
      // console.log("%cRole : ", "color:green", userDetails["_instance"].realmAccess.roles);
      // console.log("%cToken : ", "color:green", userDetails["_instance"].token);
      // console.log("%cRefresh - Token : ", "color:green", userDetails["_instance"].refreshToken);
      
      //console.log("%cTokeninfo : ", "color:green", userDetails["_instance"].tokenParsed);
      // console.log("%cUser Info : ", "color:green", userDetails["_userProfile"]);


      sessionStorage.setItem('token', userDetails["_instance"].token);
      sessionStorage.setItem('userdata', JSON.stringify(userDetails["_instance"].tokenParsed));
      sessionStorage.setItem('userid', userDetails["_instance"].tokenParsed.sub);
      sessionStorage.setItem('role', userDetails["_instance"].realmAccess.roles[0]);

      if(userDetails["_instance"].realmAccess.roles[0] == 'admin'){
          this.notif = false;
      }else{
        this.notif = true;
      }



      this.backend.getrole(userDetails["_instance"].realmAccess.roles[0])
      .subscribe((data)=> { 

        var role = userDetails["_instance"].realmAccess.roles[0];
    
        if(role == 'admin'){
          sessionStorage.setItem('features',  JSON.stringify('admin'));
        }else{
          // console.log("data:",data['data'][0].feature_mapping[0].mapping);

          // console.log("data:",data['data'][0].feature_mapping[0].mapping);
           // this.sidebar = data["data"][0].mapping;
     
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
      console.log(JSON.parse(msg.text[0]));
      var da = JSON.parse(msg.text[0]);
      var x = da._id;
      var cli = da.client;
      
      if(this.notif == true){
        this.create("Notification",JSON.parse(msg.text[0]).data.notification,x,cli);
      }

    })

   
      this.w3_open();
      if( this.notif == true){
       // this.notificationcounter();
      }
      
      
     
  }

  knot:any;
  notificationcounter(){
   
   
        this.knot = setInterval(() =>{
         this.backend.getNotificationCount()
      .subscribe((data)=> { 
       console.log(data)
        this.notificationcount = data["opencount"]; 
      })
    }
         , 1000);
      

  }

  ngOnDestroy(){
    clearInterval(this.knot);
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
     this.knot = setInterval(() =>{
    sessionStorage.clear();
    this.keycloakService.logout();
  }
  , 1000);


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
