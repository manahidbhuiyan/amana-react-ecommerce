import { useParams } from "react-router-dom"

const ProductDetails = () => {
    const { category, subcategory, slug, barcode } = useParams()
    console.log("category",category)
    console.log("subcategory",subcategory)
    console.log("slug",slug)
    console.log("barcode",barcode)
  return (
    <div className="">
      This is Product Page
    </div>
  )
}

export default ProductDetails
