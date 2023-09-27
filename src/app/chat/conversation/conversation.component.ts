import { Component, Input, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { iMessageScreen } from '../mobile-layout/mobile-layout.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.sass'],
})
export class ConversationComponent implements OnInit {
  @Input() conversationId = uuidv4();
  newMessageControl = new FormControl('');
  messages: Message[] = [];
  user: any;

  appScreen: iMessageScreen = {
    app: 'iMessage',
  };

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = await this.fireAuth.currentUser;
    this.appScreen.iMessage = {
      contact: {
        name: this.user.email,
        image: '',
      },
      messages: [],
    };
    this.firestore
      .collection('chats')
      .doc(this.user.uid)
      .collection(this.conversationId, (ref) =>
        ref.orderBy('timestamp', 'desc').limit(30),
      )
      .valueChanges()
      .subscribe(
        (value) =>
          (this.appScreen.iMessage!.messages = (value as Message[])
            .reverse()
            .map((u) => ({
              inbound: u.sentBy !== this.user.uid,
              message: u.text?.body!,
              phone: '',
              created: u.timestamp.toString(),
              displayName: u.author!,
            }))),
      );
  }

  async onNewMessage(message: string) {
    this.newMessageControl.setValue('');
    const newMessage: Message = await this.baseMessage(MessageType.Text);
    newMessage.text = {
      body: message,
    };
    try {
      await this.firestore
        .collection('chats')
        .doc(this.user.uid)
        .collection(this.conversationId)
        .doc(newMessage.id)
        .set(newMessage);
    } catch (error) {
      console.log(error);
    }
  }

  private async baseMessage(type: MessageType): Promise<Message> {
    return {
      source: environment.firebaseConfig.projectId,
      readBy: '',
      timestamp: new Date().getTime(),
      type,
      author: this.user.email,
      id: uuidv4(),
      sentBy: this.user.uid,
      read: 1,
      sendingMessage: false,
    };
  }
}

export interface ITemplateData {
  category: string;
  components: ITemplateComponentData[];
  variableComponents?: any[];
  id: string;
  language: string;
  name: string;
  status: string;
}

export interface ITemplateComponentData {
  type: string;
  text?: string;
  format?: string;
  image?: any;
  video?: any;
  buttons?: {
    type: string;
    text: string;
    url?: string;
    phone_number: string;
  }[];
}

export enum MessageType {
  Text = 'text',
  Media = 'media',
  Contacts = 'contacts',
  Location = 'location',
  Interactive = 'interactive',
  Template = 'template',
  Document = 'document',
  Image = 'image',
  Audio = 'audio',
  Button = 'button',
  Sticker = 'sticker',
  Video = 'video',
  Unsupported = 'unsupported',
}

export enum MessageRole {
  Agent = 'AGENTE',
  Client = 'CLIENTE',
}

export enum ConversationType {
  Client = 'client',
  Provider = 'provider',
  Business = 'business',
  Systems = 'systems',
  Medical = 'medical',
  Home = 'home',
  Vial = 'vial',
  Pets = 'pets',
  Legal = 'legal',
}

export enum OriginConversationType {
  Business = 'business_initiated',
  User = 'user_initiated',
}

export interface Conversation {
  id: string;
  accountDisplayPhoneNumber: string;
  accountPhoneNumberId: string;
  accountId: string;
  serviceId: string;
  unreadMessages: number;
  phoneNumber: string;
  name: string;
  profileImage: string;
  lastMessage: string;
  updatedAt: number;
  messages?: Message[];
  type: ConversationType;
  expiresAt: number;
  initiated?: OriginConversationType;
  related?: string[];
}

interface Message {
  source: string;
  id: string;
  type: MessageType;
  sentBy: string;
  author: string;
  text?: {
    body: string;
  };
  location?: {
    latitude: number;
    longitude: number;
    name?: string;
    address?: string;
  };
  contacts?: {
    name: {
      last_name: string;
      first_name: string;
      formatted_name: string;
    };
    phones: {
      type: string;
      phone: string;
      wa_id: string;
    }[];
  }[];
  interactive?: {
    header?: {
      type: string;
      image?: {
        id: string;
      };
    };
    type: string;
    button_reply?: {
      id: string;
      title: string;
    };
    action?: {
      buttons?: {
        type: string;
        reply: {
          id: string;
          title: string;
        };
      }[];
    };
    body?: {
      text: string;
    };
  };
  button?: {
    payload: string;
    text: string;
  };
  template?: {
    name: string;
    language: {
      code: string;
    };
    components?: any[];
  };
  document?: {
    caption: string;
    filename: string;
    id: string;
    mime_type: string;
    sha256: string;
  };
  image?: {
    id: string;
    mime_type: string;
    sha256: string;
    caption?: string;
  };
  audio?: {
    id: string;
    mime_type: string;
    sha256: string;
    voice: boolean;
  };
  video?: {
    mime_type: string;
    sha256: string;
    id: string;
    caption?: string;
  };
  sticker?: {
    id: string;
    sha256: string;
    animated: boolean;
    mime_type: string;
  };
  unsupported?: any;
  timestamp: number;
  readBy: string;
  read: 0 | 1;
  context?: {
    from: string;
    id: string;
    message?: Message;
  };
  sendingMessage?: boolean;
  error?: boolean;
  fromNumber?: string;
  toNumber?: string;
  conversation?: Conversation;
  forwardFrom?: string;
  forwardedTo?: IMessageForwardedTo[];
  templateMeta?: ITemplateData;
  metadata?: {
    [key: string]: {
      [key: string]: any;
      user: { id: number; username: string };
      created: number;
    };
  };
}

export interface IMessageForwardedTo {
  name: string;
  id: string;
  phone: string;
  timestamp: number;
  toMessageId: string;
}
