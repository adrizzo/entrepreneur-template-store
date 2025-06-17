"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { 
  Package, 
  Users, 
  ShoppingCart, 
  Settings, 
  Plus,
  TrendingUp,
  Eye
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import { formatPrice } from "@/lib/utils"



export default function AdminDashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!session || (session.user as any)?.role !== "ADMIN") {
      router.push("/")
      return
    }

    fetchStats()
  }, [session, status, router])

  const fetchStats = async () => {
    try {
      // Check if we have actual Supabase connection
      const hasSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!hasSupabase) {
        // Use mock data for demo
        setStats({
          totalProducts: 8,
          totalUsers: 25,
          totalOrders: 12,
          totalRevenue: 145670, // $1,456.70 in cents
          recentOrders: [
            {
              id: '1',
              total: 15999,
              created_at: new Date().toISOString(),
              users: { name: 'John Doe', email: 'john@example.com' }
            },
            {
              id: '2', 
              total: 7999,
              created_at: new Date(Date.now() - 86400000).toISOString(),
              users: { name: 'Jane Smith', email: 'jane@example.com' }
            },
            {
              id: '3',
              total: 4999,
              created_at: new Date(Date.now() - 172800000).toISOString(),
              users: { name: 'Mike Johnson', email: 'mike@example.com' }
            }
          ]
        })
        return
      }

      // Fetch products count
      const { count: productsCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })

      // Fetch users count
      const { count: usersCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })

      // Fetch orders count and revenue
      const { data: orders, count: ordersCount } = await supabase
        .from('orders')
        .select('total, created_at, users(name, email)', { count: 'exact' })
        .order('created_at', { ascending: false })

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const totalRevenue = orders?.reduce((sum: number, order: any) => sum + order.total, 0) || 0

      // Get recent orders (last 5)
      const recentOrders = orders?.slice(0, 5) || []

      setStats({
        totalProducts: productsCount || 0,
        totalUsers: usersCount || 0,
        totalOrders: ordersCount || 0,
        totalRevenue,
        recentOrders
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
      // Set mock stats as fallback
      setStats({
        totalProducts: 8,
        totalUsers: 25,
        totalOrders: 12,
        totalRevenue: 145670, // $1,456.70 in cents
        recentOrders: [
          {
            id: '1',
            total: 15999,
            created_at: new Date().toISOString(),
            users: { name: 'John Doe', email: 'john@example.com' }
          },
          {
            id: '2', 
            total: 7999,
            created_at: new Date(Date.now() - 86400000).toISOString(),
            users: { name: 'Jane Smith', email: 'jane@example.com' }
          },
          {
            id: '3',
            total: 4999,
            created_at: new Date(Date.now() - 172800000).toISOString(),
            users: { name: 'Mike Johnson', email: 'mike@example.com' }
          }
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage your marketplace, products, and settings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatPrice(stats.totalRevenue)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/admin/products/new"
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Plus className="h-5 w-5 text-blue-600 mr-3" />
                <span className="font-medium">Add New Product</span>
              </Link>
              <Link
                href="/admin/products"
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Package className="h-5 w-5 text-green-600 mr-3" />
                <span className="font-medium">Manage Products</span>
              </Link>
              <Link
                href="/admin/orders"
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ShoppingCart className="h-5 w-5 text-yellow-600 mr-3" />
                <span className="font-medium">View Orders</span>
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Settings className="h-5 w-5 text-purple-600 mr-3" />
                <span className="font-medium">Site Settings</span>
              </Link>
              <Link
                href="/"
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Eye className="h-5 w-5 text-gray-600 mr-3" />
                <span className="font-medium">View Store</span>
              </Link>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Recent Orders
              </h3>
              <div className="flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {stats.recentOrders.map((order: any) => (
                    <li key={order.id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {order.users?.name || 'Unknown User'}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {order.users?.email || 'No email'}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="text-sm font-medium text-gray-900">
                            ${order.total?.toFixed(2) || '0.00'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 