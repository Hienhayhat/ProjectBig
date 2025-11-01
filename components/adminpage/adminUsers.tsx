'use client';
import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message, Space, Tag, App } from "antd";
import { EditOutlined, DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios";
import { useSession } from "next-auth/react";

const AdminUsers = (props: any) => {
    const { data: session } = useSession();
    const accessToken = session?.accessToken;
    const [list, setList] = useState<any[]>([]);
    const [editingUser, setEditingUser] = useState<any>(null);
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

    const showEditModal = (user: any) => {
        setEditingUser(user);
        setModalOpen(true);
        form.setFieldsValue({
            name: user.name,
            email: user.email,
            role: user.role,
        });
    };

    const handleEditSave = async () => {
        try {
            const values = await form.validateFields();
            await axios.patch(
                `${process.env.NEXT_PUBLIC_BE_URL}/users/${editingUser._id}`,
                values,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            setModalOpen(false);
            setEditingUser(null);
            successAlert("Cập nhật người dùng ");
            // Optionally reload list from API here
        } catch (error) {
            errorAlert("Cập nhật người dùng ");
        }
    };

    const handleDelete = (id: string) => {

        modal.confirm({

            title: 'Bạn có muốn xóa người dùng này không?',
            icon: <ExclamationCircleFilled />,
            content: 'Khi bạn nhấn đồng ý,người dùng sẽ bị xóa.',
            okText: 'Đồng ý',
            okType: 'danger',
            cancelText: 'Không',
            async onOk() {
                try {

                    await axios.delete(`${process.env.NEXT_PUBLIC_BE_URL}/users/${id}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });

                    setList(list.filter((item: any) => item._id !== id));

                    successAlert("Xóa người dùng ");
                } catch (err) {
                    errorAlert('Xóa người dùng ');
                    throw err;
                }
            },
            onCancel() {
            },
        });
    };

    const columns = [
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Vai trò",
            dataIndex: "role",
            key: "role",
            render: (role: string) => (
                <Tag color={role === "admin" ? "red" : "blue"}>{role}</Tag>
            ),
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
            <h1 className="text-3xl font-bold text-blue-700 mb-8">Quản lý người dùng</h1>
            <Table
                columns={columns}
                dataSource={list}
                rowKey="_id"
                pagination={{ pageSize: 8 }}
                bordered
            />

            <Modal
                title="Sửa người dùng"
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
                >
                    <Form.Item
                        label="Tên"
                        name="name"
                        rules={[{ required: true, message: "Vui lòng nhập tên" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Vui lòng nhập email" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Vai trò"
                        name="role"
                        rules={[{ required: true, message: "Vui lòng nhập vai trò" }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminUsers;