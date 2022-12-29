import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-inventory';

  navbar = document.getElementsByClassName("navbar") as HTMLCollectionOf<HTMLElement>;
  hide = false;

  hideMenu() {
    
    const navbarElement = this.navbar[0];

    if (this.hide === false) {
      navbarElement.style.transition = "transform 0.5s";
      navbarElement.style.transform = "translatex(-250px)";
      setTimeout(() => {
        navbarElement.style.display = "none";
      }, 300)
      console.log('hide');
      this.hide = true;
    } else {
      navbarElement.style.display = "flex";
      
      setTimeout(() => {
        navbarElement.style.transition = "transform 0.5s";
      navbarElement.style.transform = "translatex(0px)";
      }, 0)
      console.log('open');
      this.hide = false;
    }


  }
}
