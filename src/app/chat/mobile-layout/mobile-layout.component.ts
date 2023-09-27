import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-mobile-layout',
  templateUrl: './mobile-layout.component.html',
  styleUrls: ['./mobile-layout.component.scss'],
})
export class MobileLayoutComponent {
  @Input() screen: iMessageScreen = {};
  @Output() sendMessage: EventEmitter<string> = new EventEmitter<string>();

  onSendMessage(inputRef: HTMLInputElement) {
    if (!inputRef.value) {
      return;
    }
    this.sendMessage.next(inputRef.value);
    inputRef.value = '';
  }
}

export interface iMessageScreen {
  app?: 'iMessage';
  iMessage?: {
    contact: { image: string; name?: string; phone?: string };
    messages: {
      inbound: boolean;
      message: string;
      phone: string;
      created: string;
      displayName: string;
    }[];
  };
}
