
import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';

interface Inquiry {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    timestamp: string;
}

async function getInquiries(): Promise<Inquiry[]> {
    const filePath = path.join(process.cwd(), 'src/data/inquiries.json');
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data).reverse(); // Newest first
    } catch (error) {
        return [];
    }
}

export default async function AdminPage() {
    const inquiries = await getInquiries();

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold mb-8">Sales Inquiries</h1>

            {inquiries.length === 0 ? (
                <p className="text-muted-foreground">No inquiries found.</p>
            ) : (
                <div className="overflow-x-auto rounded-lg border border-border">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-muted text-muted-foreground">
                            <tr>
                                <th className="px-6 py-3 whitespace-nowrap">Date</th>
                                <th className="px-6 py-3 whitespace-nowrap">Name</th>
                                <th className="px-6 py-3 whitespace-nowrap">Contact</th>
                                <th className="px-6 py-3 min-w-[300px]">Message</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {inquiries.map((inquiry) => (
                                <tr key={inquiry.id} className="bg-background hover:bg-muted/50">
                                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                                        {new Date(inquiry.timestamp).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-foreground">
                                        {inquiry.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-foreground">{inquiry.email}</span>
                                            <span className="text-muted-foreground text-xs">{inquiry.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="whitespace-pre-wrap text-foreground">{inquiry.message}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
