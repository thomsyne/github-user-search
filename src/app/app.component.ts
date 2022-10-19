import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'github-user-search';
  deferredPrompt: any;
  showButton = false

  constructor(private swUpdate: SwUpdate){
    this.deferPrompt()
    this.serviceWorkerUpdate();
  }

  deferPrompt(){
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
      // Update UI notify the user they can install the PWA

      setTimeout(() => {
        this.showInstallPromotion();
      }, 2000);

      // Optionally, send analytics event that PWA install promo was shown.
      console.log(`'beforeinstallprompt' event was fired.`);
    });
  }

  showInstallPromotion(){
    this.showButton = true
    alert('Install')
  }

  serviceWorkerUpdate(){
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if(confirm("You're using an old version of the control panel. Want to update?")) {
          window.location.reload();
        }
      });
    }
  }

  async install(){
    // Show the install prompt
  this.deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  const { outcome } = await this.deferredPrompt.userChoice;
  // Optionally, send analytics event with outcome of user choice
  console.log(`User response to the install prompt: ${outcome}`);
  // We've used the prompt, and can't use it again, throw it away
  this.deferredPrompt = null;
  }
}
