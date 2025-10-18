"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar, MapPin, Phone, User, CreditCard } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

interface BookingData {
  turfId: number
  turfName: string
  date: string
  timeSlot: string
  hourlyRate: number
  ownerContact: string
  ownerName: string
}

export default function BookingConfirmationPage() {
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    // Get booking data from localStorage
    const storedBooking = localStorage.getItem("currentBooking")
    if (storedBooking) {
      setBookingData(JSON.parse(storedBooking))
    }
  }, [])

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Loading booking details...</h2>
        </div>
      </div>
    )
  }

  const bookingId = `TF${Date.now().toString().slice(-6)}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header removed to avoid duplicate navbar */}
      {/* <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700"> ... </header> */}

      <div className="container mx-auto px-4 py-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Booking Confirmed!</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Your turf has been successfully booked</p>
        </div>

        {/* Booking Details Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg border-0 bg-white dark:bg-gray-800">
            <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold text-center">Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Booking ID */}
                <div className="text-center">
                  <Badge
                    variant="outline"
                    className="text-lg px-4 py-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                  >
                    Booking ID: {bookingId}
                  </Badge>
                </div>

                {/* Turf Information */}
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-900 dark:text-white">
                    <MapPin className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                    Turf Details
                  </h3>
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-gray-900 dark:text-white">{bookingData.turfName}</p>
                    <p className="text-gray-600 dark:text-gray-400">Turf ID: #{bookingData.turfId}</p>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-900 dark:text-white">
                    <Calendar className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                    Date & Time
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                      <p className="font-medium text-gray-900 dark:text-white">{bookingData.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Time Slot</p>
                      <p className="font-medium text-gray-900 dark:text-white">{bookingData.timeSlot}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-900 dark:text-white">
                    <CreditCard className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                    Payment Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Hourly Rate</p>
                      <p className="font-medium text-gray-900 dark:text-white">₹{bookingData.hourlyRate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                      <p className="font-medium text-gray-900 dark:text-white">1 Hour</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Amount</p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">₹{bookingData.hourlyRate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Payment Status</p>
                      <Badge className="bg-green-500 text-white">Paid</Badge>
                    </div>
                  </div>
                </div>

                {/* Owner Contact */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-900 dark:text-white">
                    <User className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                    Owner Contact
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="space-y-2">
                      <p className="font-medium text-gray-900 dark:text-white">{bookingData.ownerName}</p>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300">{bookingData.ownerContact}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call Owner
                      </Button>
                      <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Important Notes:</h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Please arrive 10 minutes before your scheduled time</li>
                    <li>• Contact the owner if you need to reschedule</li>
                    <li>• Bring your own sports equipment</li>
                    <li>• Follow all safety guidelines during play</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/bookings" className="flex-1">
              <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
                View My Bookings
              </Button>
            </Link>
            <Link href="/turfs" className="flex-1">
              <Button
                variant="outline"
                className="w-full bg-transparent border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Book Another Turf
              </Button>
            </Link>
          </div>
        </div>
      </div>

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
