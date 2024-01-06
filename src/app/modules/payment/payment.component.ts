import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  Stripe,
  StripeElements,
  StripePaymentElementOptions,
  loadStripe,
} from '@stripe/stripe-js';
import { map } from 'rxjs';
import { BillingService } from 'src/app/admin/services/billing.service';
import { OrderService } from 'src/app/admin/services/order.service';
import { Billing } from 'src/app/model/billing.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  public translateBaseRoute = 'routing.payment.';
  @ViewChild('paymentElement') paymentElement: ElementRef;
  @Input() clientSecret: string;
  @Input() billing: Billing[];
  @Input() amount: number;
  private stripe: Stripe;
  public disabledBtn: boolean = true;
  private elements: StripeElements;
  constructor(
    private renderer: Renderer2,
    private router: Router,
    private orderService: OrderService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loadStripeScript();
    await new Promise((f) => setTimeout(f, 2000));

    //
    this.disabledBtn = false;
    this.elements = this.stripe.elements({
      locale: 'ar',
      fonts: [
        {
          family: 'Tajawal',
          src: 'https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;500&display=swap',
        },
      ],
      appearance: { theme: 'flat' },
      clientSecret: this.clientSecret,
    });

    const paymentElementOptions: StripePaymentElementOptions = {
      layout: { type: 'auto' },
      wallets: { applePay: 'auto', googlePay: 'auto' },
      business: { name: 'Pound Inc.' },
      terms: { card: 'always' },
    };

    const paymentElement = this.elements.create(
      'payment',
      paymentElementOptions
    );
    paymentElement.mount('#payment-element');
  }

  private async loadStripeScript() {
    const script = this.renderer.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.async = true;
    script.onload = async () => {
      // Stripe.js has loaded, initialize it
      this.stripe = (await loadStripe(
        'pk_live_51OJQt3DgRKOECkRdOzKfWFdnvqLFuSQGqM0VlWotmZSkLSKv7dgYLyxmSPCWGPyXt7ekajSbCim9lEgGuZvFfCXq00uQXDXpXr'
      )) as Stripe;
    };
    this.renderer.appendChild(document.body, script);

    // Append the script to the document body
  }

  async onSubmit() {
    this.setLoading(true);

    const { error } = await this.stripe.confirmPayment({
      elements: this.elements,
      confirmParams: {
        return_url: 'http://localhost:4200/payment-management',
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      this.showMessage(error.message ? error.message : 'Unknown Error');
    } else {
      this.showMessage('An unexpected error occurred.');
    }

    this.setLoading(false);
    this.disabledBtn = false;
  }

  showMessage(messageText: string) {
    const messageContainer = document.querySelector(
      '#payment-message'
    ) as Element;

    messageContainer.classList.remove('hidden');
    messageContainer.textContent = messageText;

    setTimeout(function () {
      messageContainer.classList.add('hidden');
      messageContainer.textContent = '';
    }, 4000);
  }

  setLoading(isLoading: boolean) {
    if (isLoading) {
      // Disable the button and show a spinner
      (document.querySelector('#submit') as HTMLElement).setAttribute(
        'disabled',
        'true'
      );
      (document.querySelector('#spinner') as HTMLElement).classList.remove(
        'hidden'
      );
      (document.querySelector('#button-text') as HTMLElement).classList.add(
        'hidden'
      );
    } else {
      (document.querySelector('#submit') as HTMLElement).setAttribute(
        'disabled',
        'false'
      );
      (document.querySelector('#spinner') as HTMLElement).classList.add(
        'hidden'
      );
      (document.querySelector('#button-text') as HTMLElement).classList.remove(
        'hidden'
      );
    }
  }
}
