/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import  Mailjet from 'node-mailjet';

@Injectable()
export class MailjetService {
    private readonly mailjet: Mailjet;

    constructor() {
        this.mailjet= new Mailjet({
             apiKey: '8b24cd799692908b89b84c01c169e577',
             apiSecret: '02287fcf4c7eced2c6a712e5a2e3af38' });
    }
    async sendWelcomeEmail(to: string, email: string) {
        const request = this.mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: `${email}`,
                        Name: `${to}`
                    },
                    To: [
                        {
                            Name: to,
                            Email: email
                        }
                    ],
                    Subject: 'Welcome to Our Platform',
                    TextPart: `Hello ${to},\n\nThank you for registering on our platform.\n\nBest regards,\nThe Platform Team`
                }
            ]
        });
        try {
            const result = await request;
            console.log('Email sent successfully:', result.body);
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send welcome email');
        }
    }
}
