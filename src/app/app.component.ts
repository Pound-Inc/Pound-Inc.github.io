import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, filter } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { HeadersService } from 'src/common/services/headers.service';
import { UserService } from './admin/services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private httpSubscription: Subscription;

  constructor(
    private router: Router,
    private meta: Meta,
    private translate: TranslateService,
    private authService: AuthService,
    private userService: UserService,
    private http: HttpClient
  ) {
    if (!localStorage.getItem('selectedLanguage')) {
      localStorage.setItem('selectedLanguage', 'ar');
    }
    // Add the JSON-LD structured data block
    this.addStructuredData();

    // Set the canonical URL initially
    this.setCanonicalUrl();

    // Update the canonical URL when the route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setCanonicalUrl();
      });

    // Set the default language
    translate.setDefaultLang('en');

    // Use the browser language by default
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|ar/) ? browserLang : 'en');
  }

  ngOnInit() {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    this.translate.use(savedLanguage);
    this.translate.setDefaultLang('en');

    // Set the text direction based on the selected language
    this.setDirection(savedLanguage);

    this.httpSubscription = this.http
      .get('http://api.ipify.org/?format=json')
      .subscribe((res: any) => {
        this.userService.setUserInfo(res.ip);
      });
  }

  private setCanonicalUrl() {
    const canonicalUrl = `https://www.yourcompany.com${this.router.url}`;
    this.meta.removeTag('name="canonical"');
    this.meta.addTag({ name: 'canonical', content: canonicalUrl });
  }

  private addStructuredData() {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Your Company',
      url: 'https://www.yourcompany.com',
      logo: 'https://www.yourcompany.com/logo.png',
      // Add more details as needed
    };

    // Convert the JSON object to a string
    const structuredDataString = JSON.stringify(structuredData);

    // Add the script tag with the structured data to the head of the document
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = structuredDataString;
    document.head.appendChild(script);
  }

  private setDirection(savedLanguage: string) {
    document.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
  }
}
