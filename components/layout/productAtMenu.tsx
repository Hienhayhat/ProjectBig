import { useEffect } from "react"
const axios = require('axios')
const Product = (props: any) => {
    useEffect(() => {
        axios.get(`${process.env.API}products/img`,
            { imgName: props.productdata.img }
        )
            .then(function (response: any) {


            })
            .catch(function (error: any) {
                console.log(error);
            });
    }, [])
    return (
        <div>

        </div>
    )
}
export default Product