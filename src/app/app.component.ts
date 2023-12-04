import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private meta: Meta,
    private translate: TranslateService
  ) {
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

  // Company Information
  companyName: string = 'Your Company';
  companyLogoUrl: string = 'assets/logo.png';

  // Navigation
  navigationLinks: { label: string; link: string }[] = [
    { label: 'Home', link: '/' },
    { label: 'About Us', link: '/about' },
    { label: 'Services', link: '/services' },
    { label: 'Contact', link: '/contact' },
    // Add more navigation links as needed
  ];

  // Main Heading and Subheading
  mainHeading: string = 'Welcome to Our Company';
  subHeading: string = 'Delivering excellence in every aspect';

  // Featured Products or Services
  featuredProducts: { name: string; description: string; imageUrl: string }[] =
    [
      {
        name: 'Product 1',
        description: 'Description of Product 1',
        imageUrl: 'assets/product1.jpg',
      },
      {
        name: 'Product 2',
        description: 'Description of Product 2',
        imageUrl: 'assets/product2.jpg',
      },
      // Add more products as needed
    ];

  // Testimonials
  testimonials: { author: string; text: string }[] = [
    {
      author: 'John Doe',
      text: 'Great company to work with. Excellent service and support!',
    },
    {
      author: 'Jane Smith',
      text: 'I highly recommend their products. Top-notch quality.',
    },
    // Add more testimonials as needed
  ];

  // Contact Information
  contactEmail: string = 'info@yourcompany.com';
  contactPhone: string = '+1 (123) 456-7890';
  contactAddress: string = '123 Main Street, City, Country';

  // Social Media Links
  socialMediaLinks: { icon: string; link: string }[] = [
    { icon: 'fa-facebook', link: 'https://www.facebook.com/yourcompany' },
    { icon: 'fa-twitter', link: 'https://twitter.com/yourcompany' },
    {
      icon: 'fa-linkedin',
      link: 'https://www.linkedin.com/company/yourcompany',
    },
    // Add more social media links as needed
  ];

  // Footer Information
  copyrightYear: number = new Date().getFullYear();
  companyNameFooter: string = 'Your Company';
}
