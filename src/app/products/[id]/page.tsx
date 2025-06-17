"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  rating: number
  reviews: number
  is_active: boolean
  features: string[]
  specifications: { [key: string]: string }
  seller: {
    name: string
    rating: number
    totalSales: number
  }
}

const mockProducts: { [key: string]: Product } = {
  "1": {
    id: "1",
    name: "Organic Honey",
    description: "Pure organic honey from local farms. Raw, unprocessed, and full of natural goodness. This honey is sourced directly from sustainable beekeepers who practice ethical and environmentally friendly methods. Perfect for tea, toast, or cooking.",
    price: 25.99,
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1471943311424-646960669fbc?w=600&h=600&fit=crop"
    ],
    category: "Food & Beverages",
    rating: 4.8,
    reviews: 127,
    is_active: true,
    features: [
      "100% Raw and Unprocessed",
      "Sustainably Sourced",
      "No Added Sugars or Preservatives",
      "Rich in Antioxidants",
      "Locally Produced"
    ],
    specifications: {
      "Weight": "500g",
      "Origin": "Local Farms",
      "Shelf Life": "2 Years",
      "Storage": "Cool, Dry Place"
    },
    seller: {
      name: "Honey Haven Farm",
      rating: 4.9,
      totalSales: 1247
    }
  },
  "2": {
    id: "2",
    name: "Handcrafted Leather Wallet",
    description: "Premium leather wallet handcrafted by skilled artisans. Perfect for everyday use with multiple card slots and bill compartments. Made from genuine leather that ages beautifully over time.",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608801945742-8b5f02e7e03a?w=600&h=600&fit=crop"
    ],
    category: "Accessories",
    rating: 4.6,
    reviews: 89,
    is_active: true,
    features: [
      "Genuine Leather Construction",
      "8 Card Slots",
      "2 Bill Compartments",
      "Coin Pocket",
      "RFID Protection"
    ],
    specifications: {
      "Material": "Genuine Leather",
      "Dimensions": "11cm x 9cm x 2cm",
      "Color": "Brown",
      "Closure": "Bifold"
    },
    seller: {
      name: "Artisan Leather Co.",
      rating: 4.7,
      totalSales: 543
    }
  },
  "3": {
    id: "3",
    name: "Eco-Friendly Water Bottle",
    description: "Sustainable stainless steel water bottle designed for the environmentally conscious consumer. Keeps drinks cold for 24 hours and hot for 12 hours. Perfect for daily hydration needs while reducing plastic waste.",
    price: 34.99,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop"
    ],
    category: "Home & Garden",
    rating: 4.7,
    reviews: 203,
    is_active: true,
    features: [
      "Double-Wall Insulation",
      "BPA-Free Materials",
      "Leak-Proof Design",
      "Easy-Clean Wide Mouth",
      "Eco-Friendly Manufacturing"
    ],
    specifications: {
      "Capacity": "750ml",
      "Material": "Stainless Steel",
      "Dimensions": "7cm x 27cm",
      "Weight": "450g"
    },
    seller: {
      name: "Green Living Co.",
      rating: 4.8,
      totalSales: 892
    }
  },
  "4": {
    id: "4",
    name: "Artisan Coffee Blend",
    description: "Small-batch roasted coffee beans from sustainable farms around the world. Rich, bold flavor with notes of chocolate and caramel. Perfect for coffee enthusiasts who appreciate quality and ethical sourcing.",
    price: 18.99,
    images: [
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=600&fit=crop"
    ],
    category: "Food & Beverages",
    rating: 4.9,
    reviews: 156,
    is_active: true,
    features: [
      "Single-Origin Beans",
      "Fair Trade Certified",
      "Small-Batch Roasted",
      "Medium-Dark Roast",
      "Ethically Sourced"
    ],
    specifications: {
      "Weight": "340g",
      "Roast Level": "Medium-Dark",
      "Origin": "Colombia & Ethiopia",
      "Processing": "Washed"
    },
    seller: {
      name: "Mountain Peak Roasters",
      rating: 4.9,
      totalSales: 2341
    }
  },
  "5": {
    id: "5",
    name: "Bamboo Phone Stand",
    description: "Sustainable bamboo phone stand with adjustable angle. Perfect for video calls, watching content, or keeping your phone accessible while charging. Eco-friendly alternative to plastic stands.",
    price: 22.99,
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop"
    ],
    category: "Tech Accessories",
    rating: 4.5,
    reviews: 78,
    is_active: true,
    features: [
      "100% Natural Bamboo",
      "Adjustable Viewing Angle",
      "Anti-Slip Base",
      "Universal Compatibility",
      "Eco-Friendly Design"
    ],
    specifications: {
      "Material": "Bamboo",
      "Dimensions": "12cm x 8cm x 10cm",
      "Weight": "180g",
      "Compatibility": "All Phone Sizes"
    },
    seller: {
      name: "EcoTech Solutions",
      rating: 4.6,
      totalSales: 445
    }
  },
  "6": {
    id: "6",
    name: "Natural Soap Set",
    description: "Handmade soap set with essential oils and natural ingredients. Moisturizing and gentle on all skin types. Made with organic oils and botanicals for a luxurious bathing experience.",
    price: 32.99,
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop"
    ],
    category: "Beauty & Personal Care",
    rating: 4.4,
    reviews: 92,
    is_active: true,
    features: [
      "100% Natural Ingredients",
      "Essential Oil Blends",
      "Moisturizing Formula",
      "Cruelty-Free",
      "Biodegradable Packaging"
    ],
    specifications: {
      "Set Contains": "3 Bars (120g each)",
      "Scents": "Lavender, Eucalyptus, Rose",
      "Ingredients": "Organic Oils & Botanicals",
      "Shelf Life": "18 Months"
    },
    seller: {
      name: "Pure Botanicals",
      rating: 4.5,
      totalSales: 678
    }
  },
  "7": {
    id: "7",
    name: "Minimalist Desk Lamp",
    description: "Modern LED desk lamp with adjustable brightness and color temperature. Perfect for home office, study, or workspace. Energy-efficient and designed to reduce eye strain during long work sessions.",
    price: 67.99,
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop"
    ],
    category: "Home & Garden",
    rating: 4.6,
    reviews: 134,
    is_active: true,
    features: [
      "LED Technology",
      "Adjustable Brightness",
      "Color Temperature Control",
      "Energy Efficient",
      "Touch Controls"
    ],
    specifications: {
      "Power": "12W LED",
      "Color Temperature": "3000K-6500K",
      "Brightness": "Up to 1000 Lumens",
      "Dimensions": "45cm x 20cm x 8cm"
    },
    seller: {
      name: "Modern Living Design",
      rating: 4.7,
      totalSales: 756
    }
  },
  "8": {
    id: "8",
    name: "Organic Cotton T-Shirt",
    description: "Soft, comfortable t-shirt made from 100% organic cotton. Available in multiple colors and sustainably produced. Perfect for everyday wear with a classic fit that maintains its shape after washing.",
    price: 29.99,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556821840-3a9c6e1fcb5e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=600&fit=crop"
    ],
    category: "Clothing",
    rating: 4.3,
    reviews: 167,
    is_active: true,
    features: [
      "100% Organic Cotton",
      "Pre-Shrunk Fabric",
      "Classic Fit",
      "Machine Washable",
      "Multiple Colors Available"
    ],
    specifications: {
      "Material": "100% Organic Cotton",
      "Fit": "Regular",
      "Care": "Machine Wash Cold",
      "Sizes": "XS - XXL"
    },
    seller: {
      name: "Sustainable Threads",
      rating: 4.4,
      totalSales: 1123
    }
  }
}

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const productId = params.id as string
    
    // Simulate loading
    setTimeout(() => {
      const foundProduct = mockProducts[productId]
      if (foundProduct) {
        setProduct(foundProduct)
      }
      setLoading(false)
    }, 500)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/products"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/products" className="hover:text-blue-600">
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square relative overflow-hidden rounded-lg bg-white shadow-sm border mb-4">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
                <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Shipping & Returns */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-green-600 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                    <p className="text-xs text-gray-600">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-blue-600 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Secure Payment</p>
                    <p className="text-xs text-gray-600">SSL encrypted</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <RefreshCw className="h-5 w-5 text-orange-600 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                    <p className="text-xs text-gray-600">30-day policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Specifications */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
            <dl className="space-y-3">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <dt className="text-gray-600">{key}:</dt>
                  <dd className="text-gray-900 font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Seller Info */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Seller:</span>
                <span className="text-gray-900 font-medium">{product.seller.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rating:</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-gray-900 font-medium">{product.seller.rating}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Sales:</span>
                <span className="text-gray-900 font-medium">{product.seller.totalSales.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 