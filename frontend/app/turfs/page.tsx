"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Star, Search, Filter, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"

const allTurfs = [
  {
    id: 1,
    name: "Orbit Play Arena",
    location: "Ring Road, Cross Circle, beside Om Sai Water Plant, Naganalli",
    sports: ["Football", "Cricket"],
    rating: 4.7,
    reviews: 45,
    hourlyRate: 800,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop&crop=center",
    availability: "Available",
    contact: "8884201437",
    description: "Best place to hangout and great warmup one of the best in Gulbarga",
  },
  {
    id: 2,
    name: "MASTER TURF",
    location: "Msk Mill, Master Truf Cricket Ground Zafrabad Cross",
    sports: ["Football", "Cricket"],
    rating: 5.0,
    reviews: 67,
    hourlyRate: 750,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=200&fit=crop&crop=center",
    availability: "Available",
    contact: "9980571708",
    description: "Such a good turf and a good price to play long cricket 👍",
  },
  {
    id: 3,
    name: "HR Sport's Arena",
    location: "Misbah Nagar Chowk, Ring Rd, opposite Cold Storage, Misbaha Colony",
    sports: ["Football", "Cricket"],
    rating: 4.4,
    reviews: 89,
    hourlyRate: 900,
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=300&h=200&fit=crop&crop=center",
    availability: "Available",
    contact: "9611126654",
    description: "The largest in Gulbarga and easily reachable by everyone.",
    instagram: "https://instagram.com/hr_sports_arena?igshid=YmMyMTA2M2Y=",
  },
  {
    id: 4,
    name: "Phoenix Multi Sports Turf",
    location: "Hagarga Rd, near Inamdar Public School",
    sports: ["Football", "Cricket"],
    rating: 4.6,
    reviews: 78,
    hourlyRate: 850,
    image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=300&h=200&fit=crop&crop=center",
    availability: "Available",
    contact: "7349481411",
    description: "Nice playing conditions and enjoyed at lot while batting",
  },
  {
    id: 5,
    name: "KTS Sports Academy",
    location: "4th Cross Road, Malgatti Cross, Hagarga Rd, Noor Khan Colony",
    sports: ["Football", "Cricket"],
    rating: 4.7,
    reviews: 92,
    hourlyRate: 700,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center",
    availability: "Available",
    contact: "9902029343",
    description: "Clean washroom and cheapest in the city",
    website: "https://sites.google.com/view/kts-sports-academy/home",
  },
  {
    id: 6,
    name: "F1 Sports Arena",
    location: "Villa Night Restaurant, Ring Rd, beside F1, Jagriti Colony, Azadpur",
    sports: ["Football", "Cricket"],
    rating: 5.0,
    reviews: 134,
    hourlyRate: 950,
    image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=300&h=200&fit=crop&crop=center",
    availability: "Available",
    contact: "8217854160",
    description: "Very good experience in this arena...",
    instagram: "https://www.instagram.com/f1sportsarena",
  },
  {
    id: 7,
    name: "S M Turf Zone Box Cricket Let's Play",
    location: "Hundakar Colony",
    sports: ["Football", "Cricket"],
    rating: 4.3,
    reviews: 56,
    hourlyRate: 800,
    image: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=300&h=200&fit=crop&crop=center",
    availability: "Available",
    contact: "8884040983",
    description: "Biggest in town. Best Turf in gulbarga",
    whatsapp: "https://chat.whatsapp.com/KwHNzQvW7WxLwGsqwigsQB",
  },
  {
    id: 8,
    name: "CAP Gulbarga ground",
    location: "Cricket Academy of pathan's Ground, beside KCT pharmacy, Khaja Colony",
    sports: ["Cricket"],
    rating: 5.0,
    reviews: 87,
    hourlyRate: 900,
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=300&h=200&fit=crop&crop=center",
    availability: "Available",
    contact: "8904197007",
    description: "Best academy of cricket",
    website: "http://cricketacademyofpathans.com/",
  },
  {
    id: 9,
    name: "Deccan Sports Club",
    location: "near mam garden, Malgathi",
    sports: ["Football", "Cricket"],
    rating: 4.3,
    reviews: 43,
    hourlyRate: 750,
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=300&h=200&fit=crop&crop=center",
    availability: "Available",
    contact: "9740694117",
    description: "Overall good.",
  },
  {
    id: 10,
    name: "M.K.S ARCADE ( Cricket & Football Turf )",
    location: "Kalaburagi",
    sports: ["Football", "Cricket"],
    rating: 4.2,
    reviews: 65,
    hourlyRate: 850,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop&crop=center",
    availability: "Available",
    contact: "9606067516",
    description: "Turf Cricket Ground is a top-tier venue for sports enthusiasts.",
  },
  {
    id: 11,
    name: "Gulbarga Mystics - Cricket Team",
    location: "Ground, Sayyid, Akbar Husayni, KBN Turf, Campus, Santraswadi",
    sports: ["Football", "Cricket"],
    rating: 4.0,
    reviews: 34,
    hourlyRate: 800,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&crop=center",
    availability: "Available",
    contact: "Contact via Instagram",
    description: "Professional cricket team ground",
    instagram: "https://www.instagram.com/gulbargamystics/",
  },
  {
    id: 12,
    name: "A to Z sport Zone",
    location: "Naganalli Cross",
    sports: ["Football", "Cricket"],
    rating: 5.0,
    reviews: 76,
    hourlyRate: 750,
    image: "https://images.unsplash.com/photo-1486286701208-1d58e9338013?w=300&h=200&fit=crop&crop=center",
    availability: "Available",
    contact: "8660400019",
    description: "Complete sports zone for all your needs",
  },
  {
    id: 13,
    name: "Ali's Turf",
    location: "Malgathi",
    sports: ["Football", "Cricket"],
    rating: 5.0,
    reviews: 45,
    hourlyRate: 700,
    image: "https://images.unsplash.com/photo-1552667466-07770ae110d0?w=300&h=200&fit=crop&crop=center",
    availability: "Available",
    contact: "8971031036",
    description: "Quality turf with excellent facilities",
  },
  {
    id: 14,
    name: "Green Space TURF",
    location: "Malgathi",
    sports: ["Cricket", "Football", "Volleyball"],
    rating: 4.4,
    reviews: 58,
    hourlyRate: 800,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop&crop=center",
    availability: "Available",
    contact: "7195485522",
    description: "Multi-sport facility with volleyball court",
  },
]

export default function TurfsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sportFilter, setSportFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  const filteredTurfs = allTurfs.filter((turf) => {
    const matchesSearch =
      turf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      turf.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = sportFilter === "all" || turf.sports.includes(sportFilter);
    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "low" && turf.hourlyRate < 800) ||
      (priceFilter === "medium" && turf.hourlyRate >= 800 && turf.hourlyRate < 1000) ||
      (priceFilter === "high" && turf.hourlyRate >= 1000);
    const matchesAvailability = availabilityFilter === "all" || turf.availability === availabilityFilter;

    return matchesSearch && matchesSport && matchesPrice && matchesAvailability;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Browse Turfs in Kalaburgi</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">Find the perfect turf for your next game</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search turfs or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>

          <Select value={sportFilter} onValueChange={setSportFilter}>
            <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
              <SelectValue placeholder="Sport Type" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <SelectItem
                value="all"
                className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                All Sports
              </SelectItem>
              <SelectItem
                value="Cricket"
                className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cricket
              </SelectItem>
              <SelectItem
                value="Football"
                className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Football
              </SelectItem>
              <SelectItem
                value="Volleyball"
                className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Volleyball
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <SelectItem
                value="all"
                className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                All Prices
              </SelectItem>
              <SelectItem
                value="low"
                className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Under ₹800
              </SelectItem>
              <SelectItem
                value="medium"
                className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                ₹800 - ₹1000
              </SelectItem>
              <SelectItem
                value="high"
                className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Above ₹1000
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
            <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <SelectItem
                value="all"
                className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                All
              </SelectItem>
              <SelectItem
                value="Available"
                className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Available
              </SelectItem>
              <SelectItem
                value="Booked"
                className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Booked
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          Showing {filteredTurfs.length} of {allTurfs.length} turfs
        </p>
      </div>

      {/* Turfs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTurfs.map((turf) => (
          <Card
            key={turf.id}
            className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-0 shadow-lg bg-white dark:bg-gray-800"
          >
            <div className="relative overflow-hidden rounded-t-lg">
              <Image
                src={turf.image || "/placeholder.svg"}
                alt={turf.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3">
                <Badge
                  variant={turf.availability === "Available" ? "default" : "secondary"}
                  className={turf.availability === "Available" ? "bg-green-500 text-white" : "bg-red-500 text-white"}
                >
                  {turf.availability}
                </Badge>
              </div>
            </div>

            <CardContent className="p-6">
              <h3 className="font-bold text-xl mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors text-gray-900 dark:text-white">
                {turf.name}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{turf.description}</p>

              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{turf.location}</span>
              </div>

              <div className="flex items-center mb-4">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{turf.rating}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">({turf.reviews} reviews)</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {turf.sports.map((sport) => (
                  <Badge
                    key={sport}
                    variant="outline"
                    className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                  >
                    {sport}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-green-600 dark:text-green-400">₹{turf.hourlyRate}/hr</div>
                <div className="flex gap-2">
                  <Link href={`/turf/${turf.id}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 bg-transparent"
                    >
                      View Details
                    </Button>
                  </Link>
                  <Link href={`/turf/${turf.id}`}>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      Book
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTurfs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Filter className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No turfs found</h3>
          <p className="text-gray-500 dark:text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}
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
                  <Link href="/" className="hover:text-white transition-colors">Home</Link>
                </li>
                <li>
                  <Link href="/turfs" className="hover:text-white transition-colors">Browse Turfs</Link>
                </li>
                <li>
                  <Link href="/bookings" className="hover:text-white transition-colors">My Bookings</Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">Help Center</Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
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
  );
}
