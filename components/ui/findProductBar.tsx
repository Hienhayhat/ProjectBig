import { useState, useEffect } from "react";
import SearchIcon from "../icon/search-icon";
import axios from "axios";
import Link from "next/link";

const FindProductBar = () => {
    const [input, setInput] = useState<string>("");
    const [listProduct, setlistProduct] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BE_URL}/products`)
            .then(function (response: any) {
                setlistProduct(response?.data?.Product || []);
                setFilteredProducts(response?.data?.Product || []);
            })
            .catch(function () {
                setlistProduct([]);
                setFilteredProducts([]);
            });
    }, []);

    useEffect(() => {
        const keyword = input.trim().toLowerCase();
        if (!keyword) {
            setFilteredProducts(listProduct);
        } else {
            const results = listProduct.filter(product =>
                product.name.toLowerCase().includes(keyword)
            );
            setFilteredProducts(results);
        }
    }, [input]);

    return (
        <div>
            <form
                className="relative flex w-[670px] h-[50px] rounded-2xl border-[2px] border-gray-400 p-3 items-center bg-white"
                onSubmit={e => e.preventDefault()}
            >
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="tìm kiếm"
                    className="w-full outline-none text-2xl"
                />
                <button type="submit">
                    <SearchIcon className="cursor-pointer" />
                </button>
                {/* Results dropdown */}
                {input && (
                    <div className="absolute left-0 top-full w-full max-h-64 overflow-y-auto bg-white border border-gray-300 rounded-xl shadow-lg z-50">
                        {filteredProducts.length === 0 ? (
                            <div className="p-4 text-gray-500">Không tìm thấy sản phẩm.</div>
                        ) : (
                            <ul>
                                {filteredProducts.map(product => (
                                    <li key={product._id} >
                                        <Link href={product._id} onClick={() => setInput("")} >
                                            <div className="py-2 px-4 hover:bg-gray-100 cursor-pointer border-b last:border-b-0">
                                                {product.name}
                                            </div>

                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
};

export default FindProductBar;