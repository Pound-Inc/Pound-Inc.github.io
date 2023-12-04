import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
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
