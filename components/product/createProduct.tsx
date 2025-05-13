'use client'
import React from 'react';

const axios = require('axios');
import { useState } from 'react';
import {

    Form,
    Input,
    Segmented,
} from 'antd';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};


const CreateProduct = () => {
    const [file, setFile] = useState();
    const [Name, setName] = useState();
    const [Type, setType] = useState();
    const [Price, setPrice] = useState();
    const [Description, setDescription] = useState();
    const [ProductImgCode, setProductImgCode] = useState(0)
    const [uploadResponse, setUploadResponse] = useState(null);
    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
        const randomNumber: number = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        setProductImgCode(randomNumber)
    };
    const handleGetName = (e: any) => {
        setName(e.target.value);
    }
    const handleGetDescription = (e: any) => {
        setDescription(e.target.value);
    }
    const handleGetType = (e: any) => {
        setType(e.target.value);
    }
    const handleGetPrice = (e: any) => {
        setPrice(e.target.value);
    }



    const onFinish = async (values: any) => {
        if (!file) return alert('Please select a file.');
        const formData = new FormData();
        formData.append('file', file, ProductImgCode + '.jpg');


        try {
            const responsefile = axios.post(`${process.env.API}products/file`, formData
                , {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            // setUploadResponse(responsefile.data);
            const response = axios.post(`${process.env.API}products`, {
                name: Name,
                type: Type,
                price: Price,
                description: Description,
                img: ProductImgCode
            });
            setUploadResponse(response)

        } catch (error) {
            console.error('Error :', error);
        }
    };

    const [form] = Form.useForm();
    return (
        <Form
            {...formItemLayout}
            form={form}
            variant={'outlined'}
            style={{ maxWidth: 600 }}
            initialValues={{ variant: 'filled' }}
            onFinish={onFinish}
        >
            <Form.Item label="Tên sản phẩm" name="NameProduct" rules={[{ required: true, message: 'Xin hãy nhập tên sản phẩm' }]}>
                <Input onChange={handleGetName} />
            </Form.Item>
            <Form.Item label="Loại sản phẩm" name="TypeProduct" rules={[{ required: true, message: 'Xin hãy nhập loại sản phẩm' }]}>
                <Input placeholder='Đồ ăn,quần áo,đồ chơi,...' onChange={handleGetType} />
            </Form.Item>
            <Form.Item
                label="Giá "
                name="PriceProduct"
                rules={[{ required: true, message: 'Xin hãy nhập giá sản phẩm' }]}
            >
                <Input style={{ width: '100%' }} onChange={handleGetPrice} />
            </Form.Item>

            <Form.Item
                label="Mô tả"
                name="DescriptionProduct"
                rules={[{ required: false }]}
            >
                <Textarea className='h-14' onChange={handleGetDescription} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <input type="file" onChange={handleFileChange} />
                <Button type="submit" >
                    Submit
                </Button>
                {uploadResponse && <div>Upload successful</div>}
            </Form.Item>
        </Form>
    );
};

export default CreateProduct;