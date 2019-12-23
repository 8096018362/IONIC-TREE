import { Component, OnInit } from '@angular/core';
import { Events, MenuController } from '@ionic/angular';
import { WebApiService } from '../web-api.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public LOGIN_URL = "webserviceforlogin";
  loginForm: FormGroup;
  userObj: any = {
    username: '8096018362',
    password: 'Test@123'
  }
  constructor(
    private ionicEvents: Events,
    public menu: MenuController,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    public api: WebApiService

  ) {
    this.menu.enable(false);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      isToggled: [''],
    });
  }

  validation_messages = {
    'username': [
      { type: 'required', message: 'Mobile Number is required.' }
    ],

    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'minimum 6 ' }
    ]
  };


  doLogin() {

    localStorage.setItem("isLogin", 'true');
    let obj =
    {
      userName: "surekha",
      userId: "1"
    }

    this.ionicEvents.publish("LOGIN_EVENT", obj);
  //  this.presentAlertConfirm()
  }
  subId:any='ramu';
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Parent Selection',
      message: `<ion-item>
      <ion-label>Please select your parent</ion-label>
      <ion-select [(ngModel)]="subId">
        <ion-select-option [value]="f">Female</ion-select-option>
        <ion-select-option [value]="m">Male</ion-select-option>
      </ion-select>
    </ion-item>`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.alert('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.alert('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  alert(msg) {
    alert(msg);
  }



  login() {


    //===========service call code

    // this.api.serviceCall(
    //   {
    //     mobile:"9999999999",
    //     password: "123456"
    //   },this.LOGIN_URL
    // ).subscribe((result: any) => {
    //   console.log("result:::", result)


    // },
    //   error => {
    //     alert("Server Error. Try again later..!");

    //     console.log("RESULT in ERROR", error);
    //   })


  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }


}
