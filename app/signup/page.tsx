"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useAuth, useFirestore } from "@/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string(),
  role: z.enum(["player", "organizer", "owner"], { required_error: "You must select a role."}),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function UniversalSignUp() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      await sendEmailVerification(user);

      // Add user to Firestore with selected role
      await setDoc(doc(firestore, "users", user.uid), {
        id: user.uid,
        email: user.email,
        role: values.role,
      });

      await auth.signOut();

      toast({
        title: "Account Created!",
        description: "A verification email has been sent. Please check your inbox and verify your account.",
      });
      router.push("/login");
    } catch (error: any)
{
      console.error("Sign Up Error:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message || "Could not create your account.",
      });
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen py-8 bg-background">
      <Card className="w-full max-w-sm mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
          <CardDescription>Join Housie Empire today!</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField name="email" control={form.control} render={({ field }) => ( <FormItem><FormControl><Input type="email" placeholder="Email Address" {...field} /></FormControl><FormMessage /></FormItem> )} />
              <FormField name="password" control={form.control} render={({ field }) => ( <FormItem><FormControl><Input type="password" placeholder="Password" {...field} /></FormControl><FormMessage /></FormItem> )} />
              <FormField name="confirmPassword" control={form.control} render={({ field }) => ( <FormItem><FormControl><Input type="password" placeholder="Confirm Password" {...field} /></FormControl><FormMessage /></FormItem> )} />
              <FormField name="role" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="player">I am a Player</SelectItem>
                            <SelectItem value="organizer">I am an Organizer</SelectItem>
                            <SelectItem value="owner">I am the App Owner</SelectItem>
                        </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" size="lg" className="w-full font-bold">SIGN UP</Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline text-primary">
              Login
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
