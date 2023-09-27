import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { CoreModule } from '../core/core.module';
import { ConversationComponent } from './conversation/conversation.component';
import { MobileLayoutComponent } from './mobile-layout/mobile-layout.component';

@NgModule({
  declarations: [ChatComponent, ConversationComponent, MobileLayoutComponent],
  imports: [CommonModule, ChatRoutingModule, CoreModule],
})
export class ChatModule {}
