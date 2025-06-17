"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { formatPrice } from "@/lib/utils"

interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  is_active: boolean
}

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .limit(8)

        if (error) throw error
        
        // If no data from Supabase (mock mode), use sample data
        const productsData = data && data.length > 0 ? data : [
          {
            id: '1',
            name: 'Organic Honey',
            description: 'Pure organic honey from local farms. Raw, unprocessed, and full of natural goodness.',
            price: 25.99,
            images: ['https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop'],
            category: 'Food & Beverages',
            is_active: true
          },
          {
            id: '2',
            name: 'Handcrafted Leather Wallet',
            description: 'Premium leather wallet handcrafted by skilled artisans. Perfect for everyday use.',
            price: 89.99,
            images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'],
            category: 'Accessories',
            is_active: true
          },
          {
            id: '3',
            name: 'Eco-Friendly Water Bottle',
            description: 'Sustainable stainless steel water bottle. Keeps drinks cold for 24h, hot for 12h.',
            price: 34.99,
            images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop'],
            category: 'Home & Garden',
            is_active: true
          },
          {
            id: '4',
            name: 'Artisan Coffee Blend',
            description: 'Small-batch roasted coffee beans from sustainable farms. Rich, bold flavor.',
            price: 18.99,
            images: ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop'],
            category: 'Food & Beverages',
            is_active: true
          },
          {
            id: '5',
            name: 'Bamboo Phone Stand',
            description: 'Sustainable bamboo phone stand. Adjustable angle, perfect for video calls.',
            price: 22.99,
            images: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop'],
            category: 'Tech Accessories',
            is_active: true
          },
          {
            id: '6',
            name: 'Natural Soap Set',
            description: 'Handmade soap set with essential oils. Moisturizing and gentle on skin.',
            price: 32.99,
            images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop'],
            category: 'Beauty & Personal Care',
            is_active: true
          },
          {
            id: '7',
            name: 'Minimalist Desk Lamp',
            description: 'Modern LED desk lamp with adjustable brightness. Perfect for home office.',
            price: 67.99,
            images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'],
            category: 'Home & Garden',
            is_active: true
          },
          {
            id: '8',
            name: 'Organic Cotton T-Shirt',
            description: 'Soft, comfortable t-shirt made from 100% organic cotton. Available in multiple colors.',
            price: 29.99,
            images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'],
            category: 'Clothing',
            is_active: true
          }
        ]
        
        setProducts(productsData)
      } catch (error) {
        console.error('Error fetching products:', error)
        // Set mock data even on error
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="w-full h-48 bg-gray-200"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No products available</h3>
        <p className="text-gray-500">Check back soon for new products!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative w-full h-48">
            {product.images.length > 0 ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-blue-600">
                {typeof product.price === 'number' && product.price > 100 
                  ? formatPrice(product.price) 
                  : `$${product.price.toFixed(2)}`}
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {product.category}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
} 