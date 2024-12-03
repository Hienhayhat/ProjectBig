'use client'
import React from 'react';

const axios = require('axios');
import { useState } from 'react';
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Mentions,
    Select,
    TreeSelect,
    Segmented,
} from 'antd';

const { RangePicker } = DatePicker;

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
    const [uploadResponse, setUploadResponse] = useState(null);
    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    };
    const handlename = (e: any) => {
        setName(e.target.value);

    }
    const onFinish = async (values: any) => {
        setName(values.NameProduct)
        setType(values.TypeProduct)
        setPrice(values.PriceProduct)
        setDescription(values.DescriptionProduct)
        console.log(Name);
        if (!file) return alert('Please select a file.');
        const formData = new FormData();
        await formData.append('file', file, Name + '.jpg');
        try {
            const response = await axios.post(`${process.env.API}products`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploadResponse(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
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
                <Input onChange={handlename} />
            </Form.Item>
            <Form.Item label="Loại sản phẩm" name="TypeProduct" rules={[{ required: true, message: 'Xin hãy nhập loại sản phẩm' }]}>
                <Input placeholder='Đồ ăn,quần áo,đồ chơi,...' />
            </Form.Item>
            <Form.Item
                label="Giá "
                name="PriceProduct"
                rules={[{ required: true, message: 'Xin hãy nhập giá sản phẩm' }]}
            >
                <Input style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                label="Mô tả"
                name="DescriptionProduct"
                rules={[{ required: false }]}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <input type="file" onChange={handleFileChange} />
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                {uploadResponse && <div>Upload successful: {JSON.stringify(uploadResponse)}</div>}
            </Form.Item>
        </Form>
    );
};

export default CreateProduct;