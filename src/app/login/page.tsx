"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useAuth, useFirestore } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export default function UniversalLogin() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        await auth.signOut();
        toast({
          variant: "destructive",
          title: "Email Not Verified",
          description: "Please check your inbox and verify your email address before logging in.",
        });
        return;
      }

      // Fetch user role from Firestore
      const userDocRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await auth.signOut();
        throw new Error("User data not found. Please contact support.");
      }

      const userData = userDoc.data();
      const role = "player";

      toast({
        title: "Login Successful!",
        description: `Redirecting to your ${role} dashboard.`,
      });

      // Redirect based on role
      switch (role) {
        case "owner":
          router.push("/owner");
          break;
        case "organizer":
          router.push("/organizer/dashboard");
          break;
        case "player":
          router.push("/join");
          break;
        default:
          router.push("/");
          break;
      }

    } catch (error: any) {
      console.error("Login Error:", error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "Invalid email or password.",
      });
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen py-8 bg-background">
      <Card className="w-full max-w-sm mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to continue to Housie Empire</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField name="email" control={form.control} render={({ field }) => ( <FormItem><FormControl><Input type="email" placeholder="Email Address" {...field} /></FormControl><FormMessage /></FormItem> )} />
              <FormField name="password" control={form.control} render={({ field }) => ( <FormItem><FormControl><Input type="password" placeholder="Password" {...field} /></FormControl><FormMessage /></FormItem> )} />
              <Button type="submit" size="lg" className="w-full font-bold">LOGIN</Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="underline text-primary">
              Sign up
            </Link>
          </div>
           <Button asChild variant="link" className="w-full text-muted-foreground mt-2">
            <Link href="/">Back to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
