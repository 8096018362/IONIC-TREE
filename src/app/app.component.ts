import { Component } from '@angular/core';
import { Platform, Events, AlertController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },

    {
      title: 'Profile',
      url: "/profile",
      icon: 'home'
    },
    {
      title: 'registration',
      url: "/registration",
      icon: 'home'
    }
  ];
  
  loggedin: boolean = false;
  isLogin: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public storage: Storage,
    public alertController: AlertController,
    private statusBar: StatusBar,
    private ionicEvents: Events,
    public menu: MenuController,
    public router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.loginEvent();
      this.isLogged();
    });
  }
  async logout() {
    console.log("logout clicked");
    const alert = await this.alertController.create({
      header: 'Do you want to logout?',
      // message: '',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            localStorage.setItem("isLogin", 'false');
            this.menu.enable(false);
            this.router.navigate(['/login']);
          }
        }
      ],
      backdropDismiss: true // <- Here! :)
    });
    await alert.present();
  }
 
  loginEvent() {
    this.ionicEvents.subscribe("LOGIN_EVENT", (userDetails) => {
      console.log("userDetails:::", userDetails);
      localStorage.setItem("isLogin", "true");
      this.loggedin = true;
      this.router.navigate(['/home']);
    })
  }

  isLogged() {
    this.isLogin = localStorage.getItem("isLogin");
    if (this.isLogin == undefined || this.isLogin == null || this.isLogin == 'false') {
      this.loggedin = false;
      this.router.navigateByUrl('/login');
      this.splashScreen.hide();
    }
    else if (this.isLogin == 'true') {
      this.loggedin = true;
      this.router.navigate(['/home']);
      this.splashScreen.hide();
    }
  }
}
