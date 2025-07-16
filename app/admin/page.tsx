"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Calendar, DollarSign, Eye, MapPin, Phone, Plus, Trash2, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ThemeToggle } from "@/components/theme-toggle"

/* -------------------------------------------------------------------------- */
/*                                MOCK  DATA                                  */
/* -------------------------------------------------------------------------- */

const bookingData = [
  { month: "Jan", bookings: 45, revenue: 36000 },
  { month: "Feb", bookings: 52, revenue: 41600 },
  { month: "Mar", bookings: 48, revenue: 38400 },
  { month: "Apr", bookings: 61, revenue: 48800 },
  { month: "May", bookings: 55, revenue: 44000 },
  { month: "Jun", bookings: 67, revenue: 53600 },
]

const sportData = [
  { name: "Cricket", value: 60, color: "#10B981" },
  { name: "Football", value: 35, color: "#3B82F6" },
  { name: "Volleyball", value: 5, color: "#F59E0B" },
]

const initialTurfs = [
  {
    id: 1,
    name: "Orbit Play Arena",
    location: "Ring Road, Cross Circle, Naganalli",
    sports: ["Football", "Cricket"],
    hourlyRate: 800,
    status: "Active",
    bookings: 23,
    revenue: 18400,
    contact: "8884201437",
  },
  {
    id: 2,
    name: "MASTER TURF",
    location: "Msk Mill, Zafrabad Cross",
    sports: ["Football", "Cricket"],
    hourlyRate: 750,
    status: "Active",
    bookings: 19,
    revenue: 14250,
    contact: "9980571708",
  },
  {
    id: 3,
    name: "HR Sport's Arena",
    location: "Misbah Nagar Chowk, Ring Rd",
    sports: ["Football", "Cricket"],
    hourlyRate: 900,
    status: "Active",
    bookings: 15,
    revenue: 13500,
    contact: "9611126654",
  },
]

/* -------------------------------------------------------------------------- */
/*                                PAGE  START                                 */
/* -------------------------------------------------------------------------- */

export default function AdminPage() {
  /* ---------------------------- local component state --------------------------- */
  const [turfs, setTurfs] = useState(initialTurfs)
  const [isAdding, setIsAdding] = useState(false)
  const [newTurf, setNewTurf] = useState({
    name: "",
    location: "",
    hourlyRate: "",
    contact: "",
    sportType: "both",
  })

  /* ----------------------------- derived statistics ---------------------------- */
  const totalBookings = turfs.reduce((sum, t) => sum + t.bookings, 0)
  const totalRevenue = turfs.reduce((sum, t) => sum + t.revenue, 0)
  const activeTurfs = turfs.filter((t) => t.status === "Active").length

  /* ------------------------------ add turf handler ------------------------------ */
  const handleAddTurf = () => {
    if (!newTurf.name || !newTurf.location || !newTurf.hourlyRate || !newTurf.contact) return
    setTurfs((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: newTurf.name,
        location: newTurf.location,
        sports:
          newTurf.sportType === "both"
            ? ["Football", "Cricket"]
            : [newTurf.sportType === "cricket" ? "Cricket" : "Football"],
        hourlyRate: Number(newTurf.hourlyRate),
        status: "Active",
        bookings: 0,
        revenue: 0,
        contact: newTurf.contact,
      },
    ])
    setNewTurf({ name: "", location: "", hourlyRate: "", contact: "", sportType: "both" })
    setIsAdding(false)
  }

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* ------------------------------ HEADER BAR ------------------------------ */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              TURFEASE ADMIN
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/turfs"
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Browse Turfs
            </Link>
            <Link href="/admin" className="text-green-600 dark:text-green-400 font-medium">
              Admin Panel
            </Link>
            <ThemeToggle />
            <Button className="bg-gradient-to-r from-green-500 to-blue-500 text-white">Sign Out</Button>
          </nav>
        </div>
      </header>

      {/* ------------------------------ MAIN BODY ------------------------------ */}
      <div className="container mx-auto px-4 py-8">
        {/* Headline */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Admin Dashboard</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">Manage turfs, bookings & analytics</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<MapPin className="h-8 w-8 text-green-600 dark:text-green-400" />}
            label="Active Turfs"
            value={activeTurfs}
          />
          <StatCard
            icon={<Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />}
            label="Total Bookings"
            value={totalBookings}
          />
          <StatCard
            icon={<DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />}
            label="Revenue"
            value={`₹${totalRevenue.toLocaleString()}`}
          />
          <StatCard
            icon={<Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />}
            label="Active Users"
            value="1 234"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="analytics">
          <TabsList className="grid grid-cols-3 w-full bg-gray-100 dark:bg-gray-800">
            <TabsTriggerWithStyles value="analytics">Analytics</TabsTriggerWithStyles>
            <TabsTriggerWithStyles value="turfs">Manage Turfs</TabsTriggerWithStyles>
            <TabsTriggerWithStyles value="bookings">Bookings</TabsTriggerWithStyles>
          </TabsList>

          {/* -------------------------- ANALYTICS TAB -------------------------- */}
          <TabsContent value="analytics" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bar chart */}
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Monthly Bookings & Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={bookingData}>
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                      <XAxis dataKey="month" stroke="currentColor" />
                      <YAxis stroke="currentColor" />
                      <Tooltip />
                      <Bar dataKey="bookings" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Pie chart */}
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Sports Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={sportData} dataKey="value" nameKey="name" outerRadius={100} label>
                        {sportData.map((d, i) => (
                          <Cell key={i} fill={d.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* --------------------------- TURFS TAB ---------------------------- */}
          <TabsContent value="turfs" className="mt-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Turfs</h3>
              <Button
                onClick={() => setIsAdding(true)}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Turf
              </Button>
            </div>

            {/* Add form */}
            {isAdding && (
              <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>Add New Turf</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <InputField
                      id="name"
                      label="Turf Name"
                      value={newTurf.name}
                      onChange={(e) => setNewTurf({ ...newTurf, name: e.target.value })}
                    />
                    <InputField
                      id="contact"
                      label="Contact Number"
                      value={newTurf.contact}
                      onChange={(e) => setNewTurf({ ...newTurf, contact: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location" className="mb-1 block">
                      Location
                    </Label>
                    <Textarea
                      id="location"
                      value={newTurf.location}
                      onChange={(e) => setNewTurf({ ...newTurf, location: e.target.value })}
                      placeholder="Full address"
                      className="bg-white dark:bg-gray-700"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <InputField
                      id="rate"
                      label="Hourly Rate (₹)"
                      type="number"
                      value={newTurf.hourlyRate}
                      onChange={(e) => setNewTurf({ ...newTurf, hourlyRate: e.target.value })}
                    />
                    <div>
                      <Label className="mb-1 block">Sport Type</Label>
                      <Select value={newTurf.sportType} onValueChange={(v) => setNewTurf({ ...newTurf, sportType: v })}>
                        <SelectTrigger className="bg-white dark:bg-gray-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800">
                          <SelectItem value="cricket">Cricket</SelectItem>
                          <SelectItem value="football">Football</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddTurf}>Add</Button>
                    <Button variant="outline" onClick={() => setIsAdding(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Turfs list */}
            <div className="grid gap-4">
              {turfs.map((turf) => (
                <Card key={turf.id} className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <CardContent className="p-6 flex items-start justify-between">
                    {/* info */}
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{turf.name}</h4>
                        <Badge className={turf.status === "Active" ? "bg-green-600" : "bg-red-600"}>
                          {turf.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{turf.location}</p>
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex flex-wrap gap-4">
                        <span>₹{turf.hourlyRate}/hr</span>
                        <span>{turf.bookings} bookings</span>
                        <span>₹{turf.revenue} revenue</span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {turf.contact}
                        </span>
                      </div>
                    </div>

                    {/* actions */}
                    <div className="flex gap-2">
                      <IconButton icon={<Eye className="h-4 w-4" />} />
                      <IconButton icon={<Trash2 className="h-4 w-4" />} className="text-red-600" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ------------------------- BOOKINGS TAB (placeholder) ------------------------- */}
          <TabsContent value="bookings" className="mt-6">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardContent className="p-12 text-center">
                <p className="text-gray-600 dark:text-gray-400">Advanced booking management coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                              SMALL SUBCOMPONENTS                           */
/* -------------------------------------------------------------------------- */

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
}) {
  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <CardContent className="p-6 flex items-center gap-4">
        {icon}
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function TabsTriggerWithStyles({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) {
  return (
    <TabsTrigger
      value={value}
      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 text-gray-900 dark:text-white"
    >
      {children}
    </TabsTrigger>
  )
}

function InputField(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props
  return (
    <div>
      <Label className="mb-1 block">{label}</Label>
      <Input {...rest} className="bg-white dark:bg-gray-700" />
    </div>
  )
}

function IconButton({
  icon,
  className = "",
}: {
  icon: React.ReactNode
  className?: string
}) {
  return (
    <Button size="icon" variant="outline" className={`bg-transparent ${className}`}>
      {icon}
    </Button>
  )
}
