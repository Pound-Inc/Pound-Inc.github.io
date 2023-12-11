import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';
import { Coach } from '../model/coach.model';

@Injectable({
  providedIn: 'root',
})
export class CoachService {
  constructor(private http: HttpClient) {}

  getCoachById(coachId: string): Observable<Coach> {
    return of(this.getDummyCoachData(coachId)).pipe(delay(100));
  }

  private getDummyCoachData(coachId: string): Coach {
    return {
      coachId: coachId,
      name: 'احمد محسن',
      bio: 'أنا دنيز يوزكان، مدرب لياقة بدنية معتمد وبطل دولي في الكيوكوشن كاراتيه. أقدم خدمات التدريب الشخصي والتطوير الذاتي بأعلى جودة! الإحصائيات الشخصية: 186 سم، 96 كجم / 6 أقدام و1 قدم، 210 رطل المقعد - 160 كجم / 350 رطل القرفصاء - 210 كجم / 460 رطل الرفعة الميتة - 250 كجم / 550 رطل',
      certifications: [
        {
          title: 'شهادة تدريب لاكوست ١٤ب',
          desc: '٣ سنوات خبرة',
          location: 'الرياض',
          imgUrl: 'https://picsum.photos/200?random=4',
        },
        {
          title: 'شهادة تدريب لاكوست ١٤ب',
          desc: '٣ سنوات خبرة',
          location: 'الرياض',
          imgUrl: 'https://picsum.photos/200?random=4',
        },
      ],
      imageUrl: 'https://example.com/johndoe.jpg',
      contactEmail: 'john.doe@example.com',
      socialLinks: {
        twitter: 'https://twitter.com/johndoe',
        instagram: 'https://www.instagram.com/johndoe/',
      },
      trainingPrograms: [
        {
          programId: '11233',
          title: 'تدريب غذائي',
          img: 'https://picsum.photos/1920/1080?random=9',
          description: 'برنامج تدريب غذائي',
          plans: [
            {
              planId: '14144',
              planName: 'بسيط',
              planDescription: '٣ اسابيع تمرين',
              planPrice: 15,
            },
          ],
        },

        {
          programId: '11233',
          title: 'تدريب غذائي',
          img: 'https://picsum.photos/1920/1080?random=19',
          description: 'برنامج تدريب غذائي',
          plans: [
            {
              planId: '14144',
              planName: 'بسيط',
              planDescription: '٣ اسابيع تمرين',
              planPrice: 15,
            },
          ],
        },
      ],
      languages: ['gb', 'sa', 'se'],
      availability: 'الإثنين ـ الجمعة',
      clientsServed: 50,
      clientStories: [
        {
          storyId: '00912939',
          clientId: '4441444',
          title: 'قصة سارة',
          desc: 'من الصفر للقمة',
          imgs: [
            'https://picsum.photos/1920/1080?random=4',
            'https://picsum.photos/1920/1080?random=5',
          ],
          date: new Date().toLocaleDateString(),
        },

        {
          storyId: '00912939',
          clientId: '4441444',
          title: 'قصة احمد',
          desc: 'من الصفر للقمة',
          imgs: [
            'https://picsum.photos/1920/1080?random=6',
            'https://picsum.photos/1920/1080?random=7',
          ],
          date: new Date().toLocaleDateString(),
        },
      ],
      birthday: new Date().toLocaleDateString(),
      location: 'السعودية',
      isVerified: true,
    };
  }
}
