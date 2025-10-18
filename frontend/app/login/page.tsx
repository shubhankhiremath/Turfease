"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // const success = await login(username, password);
    // if (!success) {
    //   setError("Invalid username or password");
    // } else {
    //   router.push("/");
    // }
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
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
      setError("Failed to initiate Google sign-in. Please try again.");
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    if (!email) {
      setError("Please enter your email to reset password.");
      return;
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });
      if (error) {
        setError(error.message);
      } else {
        alert("Password reset email sent. Please check your inbox.");
      }
    } catch (err) {
      setError("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 rounded-xl shadow-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Login</h2>
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
        <Button type="submit" className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-2 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all">Login</Button>
        <div className="mt-4 text-center">
          <Button
            variant="outline"
            className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={handleGoogleSignIn}
          >
            Sign In with Google
          </Button>
        </div>
        <div className="mt-4 text-center">
          <a
            href="#"
            onClick={handleForgotPassword}
            className="text-blue-600 dark:text-blue-400 font-semibold text-sm"
          >
            Forgot password?
          </a>
        </div>
        <div className="mt-6 text-center text-gray-600 dark:text-gray-400">
          Don't have an account? <a href="/signup" className="text-blue-600 dark:text-blue-400 font-semibold">Sign up</a>
        </div>
      </form>
    </div>
  );
}