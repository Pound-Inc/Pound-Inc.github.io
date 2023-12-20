import { Component, Input, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(private meta: Meta) {}

  ngOnInit() {
    this.meta.updateTag({
      name: 'description',
      content: 'Your landing page description',
    });
    // Add more meta tags as needed
  }
}
