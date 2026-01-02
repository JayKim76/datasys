
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';

// Define the path for storing inquiries locally
const INQUIRY_FILE_PATH = path.join(process.cwd(), 'src/data/inquiries.json');

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newInquiry = {
            id: Date.now().toString(),
            name,
            email,
            phone,
            message,
            timestamp: new Date().toISOString()
        };

        // 1. Save to JSON file
        try {
            let data = [];
            try {
                const content = await fs.readFile(INQUIRY_FILE_PATH, 'utf-8');
                data = JSON.parse(content);
            } catch (err) {
                // File likely doesn't exist or is empty, start fresh
            }
            data.push(newInquiry);
            await fs.writeFile(INQUIRY_FILE_PATH, JSON.stringify(data, null, 2));
        } catch (fileError) {
            console.error('Error saving inquiry to file:', fileError);
            // Continue to email sending even if file save fails
        }

        // 2. Send Email
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        } as nodemailer.TransportOptions);

        // Only attempt to send if credentials appear configured, otherwise simulate success
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            await transporter.sendMail({
                from: process.env.SMTP_FROM || process.env.SMTP_USER,
                to: 'datasys@datasys.co.kr', // Target recipient
                subject: `[Website Inquiry] New message from ${name}`,
                text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Message:
${message}
                `,
                html: `
<h3>New Sales Inquiry</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone}</p>
<p><strong>Message:</strong></p>
<pre>${message}</pre>
                `
            });
            console.log('Inquiry email sent successfully.');
        } else {
            console.log('Skipping email send: SMTP credentials not provided. (Logged to console)');
            console.log('Inquiry Details:', newInquiry);
        }

        return NextResponse.json({ success: true, message: 'Inquiry received' });

    } catch (error) {
        console.error('Error processing inquiry:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
