import { seedCustomers } from '@/lib/seed-data';
import CustomerDetailClient from './ClientPage';

export function generateStaticParams() {
  return seedCustomers.map((customer) => ({
    id: customer.id,
  }));
}

export default function CustomerDetailPage() {
  return <CustomerDetailClient />;
}
