import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
})
export class LanguageSwitcherComponent implements OnInit {
  selectedLanguage: string;

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';
  }

  changeLanguage(lang: Event) {
    this.selectedLanguage = (lang.target as HTMLSelectElement).value;

    this.translate.use(this.selectedLanguage);
    localStorage.setItem('selectedLanguage', this.selectedLanguage);
    this.setDirection(this.selectedLanguage);
  }

  private setDirection(savedLanguage: string) {
    document.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
  }
}
