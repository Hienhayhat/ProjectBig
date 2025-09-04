'use client'


import { useEffect, useState } from "react";
import axios from 'axios';
import { useSession } from "next-auth/react";
const UserDetail = (props: any) => {
    const [dataUser, setDataUser] = useState<any>({
        name: "",
        email: "",
        phone: "",
        address: "",
        joined: "",
    });
    const [editing, setEditing] = useState(false);
    const { data: session } = useSession();


    const accessToken = session?.accessToken;
    console.log('Access Token:', accessToken);
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BE_URL}/users/${props.userid}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then(function (response: any) {
                console.log(response.data);

                setDataUser({
                    name: response.data.name ?? "",
                    email: response.data.email ?? "",
                    phone: response.data.phone ?? "",
                    address: response.data.address ?? "",
                    joined: response.data.joined ?? "",
                });
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }, [session]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataUser({ ...dataUser, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_BE_URL}/users/${props.userid}`, dataUser);
            setEditing(false);
            alert("Cập nhật thông tin thành công!");
        } catch (error) {
            alert("Cập nhật thất bại!");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
            <form onSubmit={handleUpdate}>
                <div className="flex flex-col gap-4">
                    <label className="font-semibold text-gray-700">Tên</label>
                    <input
                        type="text"
                        name="name"
                        value={dataUser.name ?? ""}
                        onChange={handleChange}
                        disabled={!editing}
                        className="border rounded px-3 py-2"
                    />

                    <label className="font-semibold text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={dataUser.email ?? ""}
                        onChange={handleChange}
                        disabled={!editing}
                        className="border rounded px-3 py-2"
                    />

                    <label className="font-semibold text-gray-700">SĐT</label>
                    <input
                        type="text"
                        name="phone"
                        value={dataUser.phone ?? ""}
                        onChange={handleChange}
                        disabled={!editing}
                        className="border rounded px-3 py-2"
                    />

                    <label className="font-semibold text-gray-700">Địa chỉ</label>
                    <input
                        type="text"
                        name="address"
                        value={dataUser.address ?? ""}
                        onChange={handleChange}
                        disabled={!editing}
                        className="border rounded px-3 py-2"
                    />


                </div>
                <div className="flex gap-2 mt-6">
                    {!editing ? (
                        <button
                            type="button"
                            onClick={() => setEditing(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Chỉnh sửa
                        </button>
                    ) : (
                        <>
                            <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Cập nhật
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditing(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                            >
                                Hủy
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default UserDetail;