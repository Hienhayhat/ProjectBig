'use client';
import CreateProduct from '@/components/product/createProduct';
import protectRouterAdmin from '@/components/Sercurity/protectRouterAdmin';

export default function FileUpload() {
    return (
        <div>
            <CreateProduct />
        </div>
    );
}
protectRouterAdmin(FileUpload)