import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

const popularProducts = [
    {
        id: '3432',
        product_name: 'Kevindol',
        product_thumbnail: 'https://cpc1.com.vn/Files/Uploads/2017/08/01/15/25/kevindol.jpg',
        product_price: 'VND 60,000',
        product_stock: 3410
    },
    {
        id: '7633',
        product_name: 'Morphini Spinal',
        product_thumbnail: 'https://cpc1.com.vn/Files/Uploads/2016/04/26/10/22/Catalogue%20CPC111V2.jpg',
        product_price: 'VND 40,000',
        product_stock: 2467
    },
    {
        id: '6534',
        product_name: 'Vitamin B Complex',
        product_thumbnail: `https://cpc1.com.vn/Files/Uploads/2016/04/26/13/44/Catalogue%20CPC115V2.jpg`,
        product_price: 'VND 15,000',
        product_stock: 5656
    },
    {
        id: '9234',
        product_name: 'Mg-Tan 960ml',
        product_thumbnail: 'https://cpc1.com.vn/Files/Uploads/2016/04/26/14/49/Catalogue-CPC11v2.jpg',
        product_price: 'VND 26,000',
        product_stock: 98
    },
    {
        id: '4314',
        product_name: 'Syntarpen 1g',
        product_thumbnail: 'https://cpc1.com.vn/Files/Uploads/2017/08/01/16/39/SYNTAPERN.jpg',
        product_price: 'VND 10,000',
        product_stock: 0
    },
    {
        id: '4342',
        product_name: 'Bupivacain Spinal Heavy',
        product_thumbnail: 'https://cpc1.com.vn/Files/Uploads/2017/08/29/10/10/bupivacinwpw.jpg',
        product_price: 'VND 2,000',
        product_stock: 453
    }
]

function PopularProducts() {
    return (
        <div className="w-[20rem] bg-white p-4 rounded-sm border border-gray-200">
            <strong className="text-gray-700 font-medium">Popular Products</strong>
            <div className="mt-4 flex flex-col gap-3">
                {popularProducts.map((product) => (
                    <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="flex items-start hover:no-underline"
                    >
                        <div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
                            <img
                                className="w-full h-full object-cover rounded-sm"
                                src={product.product_thumbnail}
                                alt={product.product_name}
                            />
                        </div>
                        <div className="ml-4 flex-1">
                            <p className="text-sm text-gray-800">{product.product_name}</p>
                            <span
                                className={classNames(
                                    product.product_stock === 0
                                        ? 'text-red-500'
                                        : product.product_stock > 50
                                            ? 'text-green-500'
                                            : 'text-orange-500',
                                    'text-xs font-medium'
                                )}
                            >
                                {product.product_stock === 0 ? 'Out of Stock' : product.product_stock + ' in Stock'}
                            </span>
                        </div>
                        <div className="text-xs text-gray-400 pl-1.5">{product.product_price}</div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default PopularProducts
