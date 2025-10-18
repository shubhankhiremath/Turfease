"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const validateForm = () => {
    if (!fullName.trim()) {
      setError("Full name is required.");
      return false;
    }
    if (!username.trim()) {
      setError("Username is required.");
      return false;
    }
    if (username.length < 3) {
      setError("Username must be at least 3 characters long.");
      return false;
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      setError("Username can only contain alphanumeric characters.");
      return false;
    }
    if (!email.trim()) {
      setError("Email is required.");
      return false;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!password.trim()) {
      setError("Password is required.");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return false;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return false;
    }
    if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one number.");
      return false;
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      setError("Password must contain at least one special character.");
      return false;
    }
    return true;
  };

  const handleGoogleSignUp = async () => {
    setError("");
    setSuccess("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError("Failed to initiate Google sign-up. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, username },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
      } else if (data.user) {
        setSuccess("Signup successful! Please check your email for a verification link.");
        // Optionally, redirect to a page informing the user to check their email
        // router.push("/check-email");
      } else {
        setError("An unexpected error occurred during signup.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max_w_sm p_8 rounded_xl shadow_xl bg_white dark_bg_gray_900 border border_gray_200 dark_border_gray_800"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Sign Up</h2>
        <Input
          placeholder="Full Name"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          className="mb-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500"
          required
        />
        <Input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="mb-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500"
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="mb-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500"
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="mb-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500"
          required
        />
        {error && <div className="text-red-500 mb-3 text-center">{error}</div>}
        {success && <div className="text-green-600 mb-3 text-center">{success}</div>}
        <Button type="submit" className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-2 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all">Sign Up</Button>
        <div className="mt-4 text-center">
          <Button
            variant="outline"
            className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={handleGoogleSignUp}
          >
            Sign Up with Google
          </Button>
        </div>
        <div className="mt-6 text-center text-gray-600 dark:text-gray-400">
          Already have an account? <a href="/login" className="text-blue-600 dark:text-blue-400 font-semibold">Login</a>
        </div>
      </form>
    </div>
  );
}