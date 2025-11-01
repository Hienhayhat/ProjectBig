'use client';
import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, message, Space } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios";
import { useSession } from "next-auth/react";

const AdminProducts = (props: any) => {
    const { data: session } = useSession();
    const accessToken = session?.accessToken;
    const [list, setList] = useState<any[]>([]);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [modal, contextHolder1] = Modal.useModal();

    const successAlert = (e: string) => {
        messageApi.open({
            type: 'success',
            content: ` ${e} thành công!`,
        });
    };

    const errorAlert = (e: string) => {
        messageApi.open({
            type: 'error',
            content: `${e} thất bại!`,
        });
    };
    useEffect(() => {
        setList(props.List || []);
    }, [props.List]);

    const showEditModal = (item: any) => {
        setEditingProduct(item);
        setModalOpen(true);
        // Set form values here instead of using initialValues in Form
        form.setFieldsValue({
            name: item.name,
            type: item.type,
            price: item.price,
        });
    };

    const handleEditSave = async () => {

        try {
            const values = await form.validateFields();
            await axios.patch(
                `${process.env.NEXT_PUBLIC_BE_URL}/products/${editingProduct._id}`,
                values,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            setModalOpen(false);
            setEditingProduct(null);
            successAlert('cập nhật')
            // Optionally reload list from API here
        } catch (error) {

            errorAlert('cập nhật')
        }

    };

    const handleDelete = async (id: string) => {
        modal.confirm({

            title: 'Bạn có muốn xóa sản phẩm này không?',
            icon: <ExclamationCircleFilled />,
            content: 'Khi bạn nhấn đồng ý, sản phẩm này sẽ bị xóa.',
            okText: 'Đồng ý',
            okType: 'danger',
            cancelText: 'Không',
            async onOk() {

                try {

                    await axios.delete(`${process.env.NEXT_PUBLIC_BE_URL}/products/${id}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });

                    setList(list.filter((item: any) => item._id !== id));

                    successAlert("Xóa sản phẩm ");
                } catch (err) {
                    errorAlert('Xóa sản phẩm ');
                    throw err;
                }
            },
            onCancel() {

            },
        });



    }



    const columns = [
        {
            title: "Ảnh",
            dataIndex: "img",
            key: "img",
            render: (img: string) => (
                <img
                    src={`${process.env.NEXT_PUBLIC_BE_URL}/${img}.jpg`}
                    alt=""
                    style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }}
                />
            ),
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Loại",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: (price: number) => price?.toLocaleString("vi-VN") + " đ",
        },
        {
            title: "Hành động",
            key: "action",
            render: (_: any, record: any) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => showEditModal(record)}
                        type="primary"
                    >
                        Sửa
                    </Button>
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => handleDelete(record._id)}
                    >
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    return (

        <div className="min-h-screen bg-gray-50 p-8">
            {contextHolder}
            {contextHolder1}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-blue-700">Quản lý sản phẩm</h1>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => window.location.href = '/brand/createProduct'}
                >
                    Thêm mới sản phẩm
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={list}
                rowKey="_id"
                pagination={{ pageSize: 8 }}
                bordered
            />

            <Modal
                title="Sửa sản phẩm"
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                onOk={handleEditSave}
                okText="Lưu"
                cancelText="Hủy"
                destroyOnHidden
            >
                <Form
                    form={form}
                    layout="vertical"
                // REMOVE initialValues here!
                >
                    <Form.Item
                        label="Tên sản phẩm"
                        name="name"
                        rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Loại sản phẩm"
                        name="type"
                        rules={[{ required: true, message: "Vui lòng nhập loại sản phẩm" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Giá"
                        name="price"
                        rules={[{ required: true, message: "Vui lòng nhập giá" }]}
                    >
                        <InputNumber
                            min={0}
                            className="w-full"
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminProducts;