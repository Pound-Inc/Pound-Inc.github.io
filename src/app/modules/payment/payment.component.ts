import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { OrderService } from 'src/app/admin/services/order.service';
import { OrderStatusEnum } from 'src/app/model/order.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @ViewChild('paymentElement') paymentElement: ElementRef;
  private stripe: Stripe;
  private elements: any;

  constructor(
    private renderer: Renderer2,
    private orderService: OrderService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loadStripeScript();

    const items = [{ id: 'xl-tshirt' }];

    const newOrder = {
      user_id: '6588917e47eaab5536308ad3',
      items,
      addons: [],
      price: 1400,
      status: OrderStatusEnum.New,
    };
    const response = await this.orderService.createNewOrder(newOrder);
    console.log('here');

    this.elements = this.stripe.elements({
      appearance: { theme: 'stripe' },
      clientSecret: response.response.clientSecret,
    });

    const paymentElementOptions = {
      layout: 'tabs',
    };

    const paymentElement = this.elements.create('payment', {});
    paymentElement.mount('#payment-element');

  }

  private loadStripeScript() {
    const script = this.renderer.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.async = true;
    script.onload = async () => {
      // Stripe.js has loaded, initialize it
      this.stripe = (await loadStripe(
        'pk_test_51OJQt3DgRKOECkRdFTqG5zYGtuGeHzaEJGjRA0k7XuPREWz7g8F27KnpBqFrtvssk8BfUUsXCXz0FbAeZbhvfiPD004lnnconj'
      )) as Stripe;
    };

    // Append the script to the document body
    this.renderer.appendChild(document.body, script);
  }

  async onSubmit() {
    this.setLoading(true);

    const { error } = await this.stripe.confirmPayment({
      elements: this.elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'http://localhost:4200/checkout.html',
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      this.showMessage(error.message ? error.message : 'Unknown Error');
    } else {
      this.showMessage('An unexpected error occurred.');
    }

    this.setLoading(false);
    this.checkStatus();
  }

  async checkStatus() {
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    console.log(clientSecret);

    if (!clientSecret) {
      return;
    }

    const { paymentIntent } = await this.stripe.retrievePaymentIntent(
      clientSecret
    );
    if (paymentIntent) {
      switch (paymentIntent.status) {
        case 'succeeded':
          this.showMessage('Payment succeeded!');
          break;
        case 'processing':
          this.showMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          this.showMessage(
            'Your payment was not successful, please try again.'
          );
          break;
        default:
          this.showMessage('Something went wrong.');
          break;
      }
    }
  }

  private handlePaymentMethod(paymentMethod: any) {
    // Send payment method to your server for further processing
    // You can use Angular's HttpClient here
    // Example: this.http.post('/your-server-endpoint', { paymentMethod: paymentMethod.id })
  }

  private showError(message: string) {
    const paymentMessage = document.getElementById(
      'payment-message'
    ) as HTMLElement;
    paymentMessage.textContent = message;
    paymentMessage.classList.remove('hidden');
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
