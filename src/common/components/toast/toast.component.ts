import { Component, OnDestroy, TemplateRef, inject } from '@angular/core';
import { ToastService } from 'src/common/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {}
