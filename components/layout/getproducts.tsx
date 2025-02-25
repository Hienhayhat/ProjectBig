'use client'
import { useEffect, useState } from "react";
import { Pagination } from 'antd';
import Link from "next/link";
const axios = require('axios')
const ListProduct = () => {
    const [listProduct, setlistProduct] = useState([])
    const [pageCurrent, setPageCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPage, setTotalPage] = useState(0)


    useEffect(() => {
        axios.get(`${process.env.API}products?current=${pageCurrent}&pageSize=${pageSize}`)
            .then(function (response: any) {
                setlistProduct(response.data.Product)
                setTotalPage(response.data.totalPage);
                console.log(totalPage);
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }, [pageCurrent]);


    const GetPageCurrent = (page: number) => {
        setPageCurrent(page)
    }

    return (
        <div>
            <div className=" flex flex-wrap justify-center " >
                {listProduct.map((productdata: any) => {
                    let tientramdong;
                    let tienchuc;
                    let tientram;
                    let tientrieu;
                    if (productdata.price / 1000 >= 1 && productdata.price / 1000 < 100) {
                        tienchuc = productdata.price / 1000
                    } else if (productdata.price / 1000 >= 100 && productdata.price / 1000 < 1000) {
                        tientram = productdata.price / 1000
                    }
                    else if (productdata.price / 1000 >= 1000) {
                        tientrieu = productdata.price / 1000000

                    } else {
                        tientramdong = productdata.price
                    }
                    return (
                        <div className="w-[200px] h-[280px] border-2 shadow-2xl mx-[10px] my-[5px] rounded-lg overflow-hidden hover:border-pink-200 hover:shadow-pink-500/50" key={productdata._id}>
                            <Link href={productdata._id} >
                                <img src={`${process.env.API}${productdata.img}.jpg`} className="w-[200px] h-[200px] object-fill"></img>

                                <div className="w-[100%] h-[20%] truncate ...">{productdata.name}</div>
                                <span>
                                    {tientramdong &&
                                        <div>
                                            <span>{tientramdong}</span>
                                            <span className="text-sm font-thin  ">đ</span>
                                        </div>
                                    }
                                    {tienchuc &&
                                        <div>
                                            <span>{tienchuc}.000</span>
                                            <span className="text-sm font-thin  ">đ</span>
                                        </div>
                                    }
                                    {tientram &&
                                        <div>
                                            <span>{tientram}</span>
                                            <span className="text-sm font-thin  ">K</span>
                                        </div>
                                    }
                                    {tientrieu &&
                                        <div>
                                            <span>{tientrieu}</span>
                                            <span className="text-sm font-thin  ">tr</span>
                                        </div>
                                    }

                                </span>
                            </Link>
                        </div>
                    )
                })}

            </div >
            <div className="flex justify-center">

                <Pagination total={totalPage * pageSize} pageSize={pageSize} onChange={GetPageCurrent} />
            </div>
        </div>

    )
}






export default ListProduct;