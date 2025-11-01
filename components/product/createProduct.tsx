'use client';
import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Upload, Card, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const CreateProduct = () => {
    const { data: session } = useSession();
    const accessToken = session?.accessToken;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<any[]>([]);
    const [imgCode, setImgCode] = useState<number | null>(null);

    const handleUploadChange = ({ fileList }: any) => {
        setFileList(fileList.slice(-1)); // Only keep the latest file
        if (fileList.length > 0 && !imgCode) {
            setImgCode(Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000);
        }
    };

    const onFinish = async (values: any) => {
        if (fileList.length === 0) {
            message.warning('Vui lòng chọn ảnh sản phẩm!');
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append('file', fileList[0].originFileObj, `${imgCode}.jpg`);

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_BE_URL}/products/file`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            await axios.post(
                `${process.env.NEXT_PUBLIC_BE_URL}/products/data`,
                {
                    name: values.name,
                    type: values.type,
                    price: values.price,
                    description: values.description,
                    img: imgCode,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            message.success('Tạo sản phẩm thành công!');
            form.resetFields();
            setFileList([]);
            setImgCode(null);
        } catch (error) {
            message.error('Có lỗi xảy ra khi tạo sản phẩm!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-blue-50 to-blue-100 py-10">
            <Card
                title="Tạo sản phẩm mới"
                className="w-full max-w-lg shadow-xl rounded-2xl"
                variant={undefined}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên sản phẩm"
                        name="name"
                        rules={[{ required: true, message: 'Xin hãy nhập tên sản phẩm' }]}
                    >
                        <Input placeholder="Nhập tên sản phẩm" />
                    </Form.Item>
                    <Form.Item
                        label="Loại sản phẩm"
                        name="type"
                        rules={[{ required: true, message: 'Xin hãy nhập loại sản phẩm' }]}
                    >
                        <Input placeholder="Đồ ăn, quần áo, đồ chơi, ..." />
                    </Form.Item>
                    <Form.Item
                        label="Giá"
                        name="price"
                        rules={[{ required: true, message: 'Xin hãy nhập giá sản phẩm' }]}
                    >
                        <InputNumber
                            min={0}
                            className="w-full"
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            placeholder="Nhập giá sản phẩm"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[{ required: false }]}
                    >
                        <Input.TextArea rows={3} placeholder="Mô tả sản phẩm" />
                    </Form.Item>
                    <Form.Item
                        label="Ảnh sản phẩm"
                        required
                    >
                        <Upload
                            beforeUpload={() => false}
                            fileList={fileList}
                            onChange={handleUploadChange}
                            accept="image/*"
                            listType="picture-card"
                            maxCount={1}
                        >
                            {fileList.length < 1 && (
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full"
                            loading={loading}
                        >
                            {loading ? <Spin /> : "Tạo sản phẩm"}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default CreateProduct;