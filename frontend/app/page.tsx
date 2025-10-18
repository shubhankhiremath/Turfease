import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Clock, Users, Phone, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"

const featuredTurfs = [
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
    mapsUrl:
      "https://www.google.com/maps/dir//8R2V%2BVR+Orbit+Play+Arena,+Ring+Road,+Cross+Circle,+beside+Om+Sai+Water+Plant,+Naganalli,+Kalaburagi,+Karnataka+585102/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3bc8c1199e6ea36f:0x57072f67e841e033?sa=X&ved=1t:57443&ictx=111",
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
    mapsUrl:
      "https://www.google.com/maps/dir//MASTER+TURF,+Msk+Mill,+Master+Truf+Cricket+Ground+Zafrabad+Cross,+Kalaburagi,+Karnataka+585103/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3bc8b9004d45d3af:0x31065b95ec4354f1?sa=X&ved=1t:57443&ictx=111",
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
    mapsUrl:
      "https://www.google.com/maps/dir//HR+Sport's+Arena,+Misbah+Nagar+Chowk,+Ring+Rd,+opposite+Cold+Storage,+Kalaburagi,+Karnataka+585103/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3bc8b9026fb354f1:0xe48527db6c5e859?sa=X&ved=1t:57443&ictx=111",
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
    mapsUrl:
      "https://www.google.com/maps/dir//Phoenix+Multi+Sports+Turf,+Hagarga+Rd,+near+Inamdar+Public+School,+Kalaburagi,+Karnataka+585104/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3bc8c74797e450dd:0x696d24a98a2062d9?sa=X&ved=1t:57443&ictx=111",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Book Your Perfect
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent block">
              Turf in Kalaburgi
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover and book the best cricket and football turfs in Kalaburgi. Real-time availability, instant booking,
            and seamless experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/turfs">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-lg px-8 py-3 text-white"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Now
              </Button>
            </Link>
            <Link href="/turfs">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 border-2 bg-transparent border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Explore Turfs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">25+</div>
              <div className="text-gray-600 dark:text-gray-400">Active Turfs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">500+</div>
              <div className="text-gray-600 dark:text-gray-400">Happy Players</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">1000+</div>
              <div className="text-gray-600 dark:text-gray-400">Bookings Made</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">4.8★</div>
              <div className="text-gray-600 dark:text-gray-400">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Turfs */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Turfs</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Discover the most popular turfs in Kalaburgi</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTurfs.map((turf) => (
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
                      className={
                        turf.availability === "Available" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                      }
                    >
                      {turf.availability}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors text-gray-900 dark:text-white">
                    {turf.name}
                  </h3>

                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{turf.location}</span>
                  </div>

                  <div className="flex items-center mb-3">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{turf.rating}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">({turf.reviews} reviews)</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
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
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">₹{turf.hourlyRate}/hr</div>
                    <Link href={`/turf/${turf.id}`}>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                      >
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/turfs">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 border-2 bg-transparent border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                View All Turfs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose TURFEASE?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Everything you need for the perfect game</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow bg-gray-50 dark:bg-gray-800">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Real-time Availability</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Check live availability and book instantly without any hassle
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow bg-gray-50 dark:bg-gray-800">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Easy Group Booking</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Book for your team, split costs, and manage group reservations
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow bg-gray-50 dark:bg-gray-800">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get help anytime with our dedicated customer support team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-blue-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Play?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of players who trust TURFEASE for their turf booking needs
          </p>
          <Link href="/turfs">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-3">
              Start Booking Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
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
