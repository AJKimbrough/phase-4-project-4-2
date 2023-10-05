import React from "react"

function Home({ products }) {
    
    const product = products.map((product) => (
        <>
            <img alt="product img" src={product.image_url} width={250} height={250} key={product.img} />
            <button key={product.name}></button>
        </>
    ))

    console.log(products)

    return (
        <div>
            <h1>Products</h1>
            {product}
        </div>
    )
}

export default Home