"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { MapPin, Star, Phone, Clock, Users, Shield, CalendarIcon, Instagram, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/contexts/auth-context"

// Real turf data from Kalaburgi
const allTurfs = [
  {
    id: 1,
    name: "Orbit Play Arena",
    location: "Ring Road, Cross Circle, beside Om Sai Water Plant, Naganalli, Kalaburagi, Karnataka 585102",
    sports: ["Football", "Cricket"],
    rating: 4.7,
    hourlyRate: 800,
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&h=400&fit=crop&crop=center",
    ],
    availability: "Available",
    contact: "8884201437",
    description:
      "Best place to hangout and great warmup one of the best in Gulbarga. Perfect for both cricket and football enthusiasts.",
    amenities: ["Floodlights", "Parking", "Changing Rooms", "Security", "Refreshments", "First Aid"],
    operatingHours: "6:00 AM - 10:00 PM",
    capacity: "22 players",
    surface: "Artificial Turf",
    mapsUrl:
      "https://www.google.com/maps/dir//8R2V%2BVR+Orbit+Play+Arena,+Ring+Road,+Cross+Circle,+beside+Om+Sai+Water+Plant,+Naganalli,+Kalaburagi,+Karnataka+585102/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3bc8c1199e6ea36f:0x57072f67e841e033?sa=X&ved=1t:57443&ictx=111",
    owner: {
      name: "Orbit Play Arena Management",
      phone: "8884201437",
      whatsapp: "8884201437",
    },
    reviews: [
      {
        id: 1,
        user: "Rajesh Kumar",
        rating: 5,
        comment: "Best place to hangout and great warmup one of the best in Gulbarga",
        date: "2024-01-15",
      },
      {
        id: 2,
        user: "Amit Sharma",
        rating: 4,
        comment: "Good facilities and well maintained ground. Parking is convenient.",
        date: "2024-01-10",
      },
      {
        id: 3,
        user: "Priya Patel",
        rating: 5,
        comment: "Excellent experience! Will definitely come back.",
        date: "2024-01-05",
      },
    ],
  },
  {
    id: 2,
    name: "MASTER TURF",
    location: "Msk Mill, Master Truf Cricket Ground Zafrabad Cross, Kalaburagi, Karnataka 585103",
    sports: ["Football", "Cricket"],
    rating: 5.0,
    hourlyRate: 750,
    images: [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&h=400&fit=crop&crop=center",
    ],
    availability: "Available",
    contact: "9980571708",
    description:
      "Such a good turf and a good price to play long cricket 👍. Affordable rates with excellent playing conditions.",
    amenities: ["Floodlights", "Parking", "Changing Rooms", "WiFi", "Security", "Refreshments"],
    operatingHours: "6:00 AM - 10:00 PM",
    capacity: "22 players",
    surface: "Natural Grass",
    mapsUrl:
      "https://www.google.com/maps/dir//MASTER+TURF,+Msk+Mill,+Master+Truf+Cricket+Ground+Zafrabad+Cross,+Kalaburagi,+Karnataka+585103/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3bc8b9004d45d3af:0x31065b95ec4354f1?sa=X&ved=1t:57443&ictx=111",
    owner: {
      name: "Master Turf Management",
      phone: "9980571708",
      whatsapp: "9980571708",
    },
    reviews: [
      {
        id: 1,
        user: "Vikram Singh",
        rating: 5,
        comment: "Such a good turf and a good price to play long cricket 👍",
        date: "2024-01-18",
      },
      {
        id: 2,
        user: "Suresh Reddy",
        rating: 5,
        comment: "Best value for money. Great pitch conditions.",
        date: "2024-01-12",
      },
    ],
  },
  // Add more turfs with similar structure
]

const timeSlots = [
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
]

export default function TurfDetailPage({ params }: { params: { id: string } }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const router = useRouter()
  const { user, loading } = useAuth()

  // Get turf data based on ID (fallback to first turf if not found)
  const turfData = allTurfs.find((turf) => turf.id === Number.parseInt(params.id)) || allTurfs[0]

  const handleBooking = () => {
    if (selectedDate && selectedTimeSlot) {
      const bookingData = {
        turfId: turfData.id,
        turfName: turfData.name,
        date: selectedDate.toDateString(),
        timeSlot: selectedTimeSlot,
        hourlyRate: turfData.hourlyRate,
        ownerContact: turfData.contact,
        ownerName: turfData.owner.name,
      }

      // Store booking data in localStorage for demo purposes
      localStorage.setItem("currentBooking", JSON.stringify(bookingData))

      // Navigate to booking confirmation page
      router.push(
        `/booking-confirmation?turfId=${turfData.id}&date=${selectedDate.toISOString()}&timeSlot=${selectedTimeSlot}`,
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header removed to avoid duplicate navbar */}
      {/* <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700"> ... </header> */}

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-green-600 dark:hover:text-green-400">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/turfs" className="hover:text-green-600 dark:hover:text-green-400">
              Turfs
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-white">{turfData.name}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative rounded-lg overflow-hidden mb-4">
                <Image
                  src={turfData.images[currentImageIndex] || "/placeholder.svg"}
                  alt={turfData.name}
                  width={600}
                  height={400}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge
                    variant={turfData.availability === "Available" ? "default" : "secondary"}
                    className={
                      turfData.availability === "Available" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }
                  >
                    {turfData.availability}
                  </Badge>
                </div>
              </div>

              {/* Thumbnail images */}
              <div className="grid grid-cols-4 gap-2">
                {turfData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative rounded-lg overflow-hidden ${
                      currentImageIndex === index ? "ring-2 ring-green-500" : ""
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${turfData.name} ${index + 1}`}
                      width={150}
                      height={100}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Turf Details */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{turfData.name}</h1>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{turfData.location}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium text-gray-900 dark:text-white">{turfData.rating}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">({turfData.reviews.length} reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    ₹{turfData.hourlyRate}/hr
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {turfData.sports.map((sport) => (
                      <Badge
                        key={sport}
                        variant="outline"
                        className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                      >
                        {sport}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6">{turfData.description}</p>

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Hours</div>
                    <div className="font-medium text-gray-900 dark:text-white">{turfData.operatingHours}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Capacity</div>
                    <div className="font-medium text-gray-900 dark:text-white">{turfData.capacity}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Contact</div>
                    <div className="font-medium text-gray-900 dark:text-white">{turfData.contact}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Surface</div>
                    <div className="font-medium text-gray-900 dark:text-white">{turfData.surface}</div>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {turfData.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Maps and Links */}
              <div className="flex flex-wrap gap-3">
                <Link href={turfData.mapsUrl} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 bg-transparent"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    View on Maps
                  </Button>
                </Link>
                {/* Instagram and Website buttons removed as those properties do not exist */}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Reviews & Ratings</h3>
              <div className="space-y-4">
                {turfData.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                          {review.user.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{review.user}</div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 text-yellow-400 fill-current mr-1`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Book This Turf
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="book" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-700">
                    <TabsTrigger
                      value="book"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 text-gray-900 dark:text-white"
                    >
                      Book Now
                    </TabsTrigger>
                    <TabsTrigger
                      value="contact"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 text-gray-900 dark:text-white"
                    >
                      Contact
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="book" className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block text-gray-900 dark:text-white">
                        Select Date
                      </label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                        disabled={(date) => date < new Date()}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block text-gray-900 dark:text-white">
                        Select Time Slot
                      </label>
                      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                        {timeSlots.map((slot) => (
                          <Button
                            key={slot}
                            variant={selectedTimeSlot === slot ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`text-xs ${
                              selectedTimeSlot === slot
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                          >
                            {slot}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-900 dark:text-white">Hourly Rate:</span>
                        <span className="font-bold text-green-600 dark:text-green-400">₹{turfData.hourlyRate}</span>
                      </div>
                      <Button
                        onClick={handleBooking}
                        className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                        disabled={!selectedDate || !selectedTimeSlot || !user}
                      >
                        Book Now
                      </Button>
                      {!user && !loading && (
                        <div className="mt-2 text-red-600 text-center text-sm font-medium">You must be logged in to book a turf.</div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="contact" className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Owner Details</h4>
                      <div className="space-y-2">
                        <p className="text-gray-700 dark:text-gray-300">
                          <strong>Name:</strong> {turfData.owner.name}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          <strong>Phone:</strong> {turfData.owner.phone}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        className="w-full bg-transparent border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        variant="outline"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </Button>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">WhatsApp</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
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
