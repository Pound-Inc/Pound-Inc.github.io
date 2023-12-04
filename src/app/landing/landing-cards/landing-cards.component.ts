import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-cards',
  templateUrl: './landing-cards.component.html',
  styleUrls: ['./landing-cards.component.scss'],
})
export class LandingCardsComponent {
  public cards: any[];
  constructor() {
    this.cards = [
      {
        title: 'تقنيات رفع الأثقال الفعّالة',
        subtitle: 'قم بتحقيق أقصى مكاسبك مع الأساليب المثبتة',
        author: 'خبراء اللياقة البدنية',
        button: 'اقرأ المزيد',
        comments: 237,
        date: new Date('2019-04-13'),
        isActive: true,
        isActiveButton: true,
        likes: 421,
        imageUrl:
          'https://www.acleisure.com/wp-content/uploads/2023/03/Untitled-design-2023-03-06T160556.570.png',
      },
      {
        title: 'تحسين تمارين القلب',
        subtitle: 'حقق أداءً قصوى مع التدريب القلبي',
        author: 'أخصائيون في التمارين القلبية',
        button: 'اقرأ المزيد',
        comments: 23,
        date: new Date('2022-01-01'),
        isActive: true,
        isActiveButton: true,
        likes: 154,
        imageUrl:
          'https://www.shape.com/thmb/DjCIHGX6cWaIniuqHeBAAreNE08=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/best-cardio-exercises-promo-2000-498cbfb8f07541b78572bf810e7fb600.jpg',
      },
      {
        title: 'التغذية الأساسية لبناء العضلات',
        subtitle: 'قم بتغذية جسمك لتحقيق أقصى نمو للعضلات',
        author: 'خبراء التغذية',
        button: 'اقرأ المزيد',
        comments: 23,
        date: new Date('2022-01-01'),
        isActive: true,
        isActiveButton: true,
        likes: 154,
        imageUrl:
          'https://marathonhandbook.com/wp-content/uploads/How-To-Build-Muscle-Fast.jpg',
      },
      {
        title: 'الأخطاء الشائعة التي يجب تجنبها في رحلتك الرياضية',
        subtitle: 'تعلم من تجارب الآخرين للحصول على نتائج أفضل',
        author: 'مجتمع اللياقة البدنية',
        button: 'اقرأ المزيد',
        comments: 78,
        date: new Date('2021-11-15'),
        isActive: true,
        isActiveButton: true,
        likes: 279,
        imageUrl:
          'https://health.clevelandclinic.org/wp-content/uploads/sites/3/2018/10/OverExercising-748340061-770x533-1.jpg',
      },
    ];
  }
}
