import { Component } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  private articles = [
    {
      title: 'الأخطاء الشائعة التي يجب تجنبها في رحلتك الرياضية',
      context:
        'تعتبر الرياضة جزءًا أساسيًا من حياة الكثيرين، فهي ليست فقط وسيلة للحفاظ على اللياقة البدنية بل وأيضًا وسيلة للتسلية وتحسين الصحة العامة. ومع ذلك، يقع العديد من الأشخاص في بعض الأخطاء الشائعة التي قد تؤثر سلبًا على تجربتهم الرياضية. في هذا المقال، سنلقي نظرة على الأخطاء الشائعة التي يجب تجنبها في رحلتك الرياضية لضمان الحصول على أقصى استفادة وتجنب إمكانية وقوع إصابات.',
      steps: {
        '1': {
          title: 'عدم وجود تسخين وتمارين استطالة:',
          context:
            'أحد أكبر الأخطاء التي يرتكبها العديد من الأشخاص هو البدء في ممارسة الرياضة دون التسخين الكافي. يعتبر التسخين وتمارين الاستطالة أمرًا أساسيًا لتحسين مرونة الجسم وتجنب الإصابات. قم بقضاء بعض الوقت في التسخين قبل كل جلسة رياضية لتحضير عضلاتك ومفاصلك للنشاط البدني.',
        },
        '2': {
          title: 'الإفراط في التمرين:',
          context:
            'قد يكون الحماس مفيدًا، ولكن الإفراط في التمرين يمكن أن يؤدي إلى إجهاد الجسم وزيادة خطر الإصابات. من المهم تحديد حدودك والاستماع إلى جسمك. ضبط كمية التمرين وفقًا لمستوى لياقتك الحالي وتدريجياً زيادتها مع مرور الوقت.',
        },
        '3': {
          title: 'تجاهل التغذية السليمة:',
          context:
            'يلعب النظام الغذائي دورًا كبيرًا في تعزيز الأداء الرياضي وتحقيق الأهداف. تجنب تجاهل التغذية السليمة وتأكد من تناول وجبات متوازنة تحتوي على البروتينات والكربوهيدرات والدهون الصحية.',
        },
        '4': {
          title: 'عدم الراحة الكافية:',
          context:
            'تعتبر فترات الراحة بين الجلسات الرياضية أمرًا ضروريًا للسماح للجسم بالاستعادة والتئام العضلات. من المهم منح نفسك وقتًا كافيًا للراحة لتفادي التعب الزائد والإصابات المحتملة.',
        },
        '5': {
          title: 'عدم الانصات للإشارات الجسدية:',
          context:
            'يجب عليك أن تكون حساسًا لإشارات جسدك. إذا كنت تشعر بألم مفاجئ أو غير طبيعي، فلا تتجاهل ذلك. قد تكون هذه إشارة إلى إصابة محتملة، وقد يكون من الأفضل تقليل النشاط البدني والاستعانة بالمساعدة الطبية إذا لزم الأمر.',
        },
        '6': {
          title: 'التمسك بنوع واحد من الرياضة:',
          context:
            'يمكن أن يؤدي التمسك بنوع واحد من الرياضة إلى تكرار الحركات وزيادة خطر الإصابات المتكررة. حاول تنويع نشاطاتك الرياضية لتعزيز جميع جوانب لياقتك.',
        },
      },
      footer:
        'باختصار، يجب أن يكون التوازن والانتباه لاحتياجات جسمك هما أساس نجاح رحلتك الرياضية. باعتبارها جزءًا من نمط حياة صحي، يمكن للرياضة أن تكون ممتعة ومفيدة، شريطة أن يتم الانتباه إلى النواحي الصحيحة وتجنب الأخطاء الشائعة.',
    },
  ];
}
