"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Phone, User, CreditCard } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock booking data
const mockBookings = [
  {
    id: "TF123456",
    turfName: "Orbit Play Arena",
    date: "2024-01-20",
    timeSlot: "06:00 PM",
    status: "Confirmed",
    amount: 800,
    ownerContact: "8884201437",
    ownerName: "Orbit Play Arena Management",
    location: "Ring Road, Cross Circle, Naganalli",
  },
  {
    id: "TF123457",
    turfName: "MASTER TURF",
    date: "2024-01-15",
    timeSlot: "07:00 PM",
    status: "Completed",
    amount: 750,
    ownerContact: "9980571708",
    ownerName: "Master Turf Management",
    location: "Msk Mill, Zafrabad Cross",
  },
  {
    id: "TF123458",
    turfName: "HR Sport's Arena",
    date: "2024-01-10",
    timeSlot: "08:00 PM",
    status: "Cancelled",
    amount: 900,
    ownerContact: "9611126654",
    ownerName: "HR Sports Management",
    location: "Misbah Nagar Chowk, Ring Rd",
  },
]

export default function BookingsPage() {
  const [bookings, setBookings] = useState(mockBookings)
  const [currentBooking, setCurrentBooking] = useState(null)

  useEffect(() => {
    // Check if there's a new booking from localStorage
    const storedBooking = localStorage.getItem("currentBooking")
    if (storedBooking) {
      const newBooking = JSON.parse(storedBooking)
      const bookingWithId = {
        id: `TF${Date.now().toString().slice(-6)}`,
        turfName: newBooking.turfName,
        date: new Date(newBooking.date).toLocaleDateString(),
        timeSlot: newBooking.timeSlot,
        status: "Confirmed",
        amount: newBooking.hourlyRate,
        ownerContact: newBooking.ownerContact,
        ownerName: newBooking.ownerName,
        location: "Kalaburgi, Karnataka",
      }

      // Add to bookings if not already present
      setBookings((prev) => {
        const exists = prev.some((booking) => booking.id === bookingWithId.id)
        if (!exists) {
          return [bookingWithId, ...prev]
        }
        return prev
      })

      // Clear localStorage
      localStorage.removeItem("currentBooking")
    }
  }, [])

  const upcomingBookings = bookings.filter((booking) => booking.status === "Confirmed")
  const pastBookings = bookings.filter((booking) => booking.status === "Completed")
  const cancelledBookings = bookings.filter((booking) => booking.status === "Cancelled")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-500"
      case "Completed":
        return "bg-blue-500"
      case "Cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const BookingCard = ({ booking }: { booking: any }) => (
    <Card className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{booking.turfName}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{booking.location}</p>
          </div>
          <Badge className={`${getStatusColor(booking.status)} text-white`}>{booking.status}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-700 dark:text-gray-300">{booking.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-700 dark:text-gray-300">{booking.timeSlot}</span>
          </div>
          <div className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-700 dark:text-gray-300">₹{booking.amount}</span>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-700 dark:text-gray-300">ID: {booking.id}</span>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{booking.ownerName}</p>
              <div className="flex items-center">
                <Phone className="h-3 w-3 mr-1 text-gray-400" />
                <span className="text-xs text-gray-500 dark:text-gray-400">{booking.ownerContact}</span>
              </div>
            </div>
            <div className="flex gap-2">
              {booking.status === "Confirmed" && (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 bg-transparent"
                  >
                    Reschedule
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700 bg-transparent border-red-300 dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Cancel
                  </Button>
                </>
              )}
              <Button
                size="sm"
                variant="outline"
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 bg-transparent"
              >
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Remove the custom header/navbar here */}
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">My Bookings</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">Manage your turf reservations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {upcomingBookings.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Upcoming Bookings</div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{pastBookings.length}</div>
            <div className="text-gray-600 dark:text-gray-400">Completed Bookings</div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">{cancelledBookings.length}</div>
            <div className="text-gray-600 dark:text-gray-400">Cancelled Bookings</div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings Tabs */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800">
          <TabsTrigger
            value="upcoming"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 text-gray-900 dark:text-white"
          >
            Upcoming ({upcomingBookings.length})
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 text-gray-900 dark:text-white"
          >
            Past ({pastBookings.length})
          </TabsTrigger>
          <TabsTrigger
            value="cancelled"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 text-gray-900 dark:text-white"
          >
            Cancelled ({cancelledBookings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6 mt-6">
          {upcomingBookings.length > 0 ? (
            upcomingBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No upcoming bookings</h3>
              <p className="text-gray-500 dark:text-gray-500 mb-4">Book a turf to see your reservations here</p>
              <Link href="/turfs">
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
                  Browse Turfs
                </Button>
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-6 mt-6">
          {pastBookings.length > 0 ? (
            pastBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
          ) : (
            <div className="text-center py-12">
              <Clock className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No past bookings</h3>
              <p className="text-gray-500 dark:text-gray-500">Your completed bookings will appear here</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-6 mt-6">
          {cancelledBookings.length > 0 ? (
            cancelledBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
          ) : (
            <div className="text-center py-12">
              <User className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No cancelled bookings</h3>
              <p className="text-gray-500 dark:text-gray-500">Your cancelled bookings will appear here</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">T</span>
                </div>
                <h3 className="text-xl font-bold">TURFEASE</h3>
              </div>
              <p className="text-gray-400 mb-4">Your trusted partner for turf booking in Kalaburgi, Karnataka.</p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/turfs" className="hover:text-white transition-colors">
                    Browse Turfs
                  </Link>
                </li>
                <li>
                  <Link href="/bookings" className="hover:text-white transition-colors">
                    My Bookings
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>Kalaburgi, Karnataka</p>
                <p>Phone: +91 987XX XXXXX</p>
                <p>Email: info@turfease.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} TURFEASE. All rights reserved. | Made with ❤️ by Shubhank Hiremath
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
