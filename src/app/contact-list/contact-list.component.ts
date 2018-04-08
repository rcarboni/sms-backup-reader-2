import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import { Message } from '../message';
import { Contact } from '../contact';
import { SmsStoreService }  from '../sms-store.service';

@Component({
    selector: 'contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.css'],
})

export class ContactListComponent implements OnInit {

	messagesLoaded: boolean;
    loadingSubscription: Subscription;
    contacts: Contact[];
    selectedContact: Contact;
    numfilter: string


    constructor(private smsStoreService: SmsStoreService) { }

    ngOnInit() {
        this.numfilter = '';
        this.loadingSubscription = this.smsStoreService.messagesLoaded$
        .subscribe(messagesLoaded => {
            if (messagesLoaded) {
                this.messagesLoaded = messagesLoaded;
                this.getAllContacts();
                return;
            } else {
                return;
            }
        });
    }

    getAllContacts() {
        this.smsStoreService.getAllContacts().then((contacts) => this.contacts = contacts);
    }

    showMessages(contact) {
        this.selectedContact = contact;
        this.smsStoreService.broadcastContactClicked(contact);
    }

	isSelected(contact) {
        return(this.selectedContact == contact);
    }
    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.loadingSubscription.unsubscribe();
    }

}
