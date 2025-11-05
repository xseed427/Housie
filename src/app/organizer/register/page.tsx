"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";


const formSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters."),
  phone: z.string().regex(/^\d{10}$/, "Please enter a valid 10-digit mobile number."),
  email: z.string().email("Please enter a valid email address."),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Please enter a valid PAN number (e.g., ABCDE1234F).").toUpperCase(),
  aadhaar: z.string().regex(/^\d{4}$/, "Please enter the last 4 digits of your Aadhaar."),
  bankAccount: z.string().min(8, "Bank account number seems too short.").max(18, "Bank account number seems too long."),
  ifsc: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Please enter a valid IFSC code."),
  city: z.string().min(2, "City name must be at least 2 characters."),
});

export default function OrganizerRegistration() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", email: "", pan: "", aadhaar: "", bankAccount: "", ifsc: "", city: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Organizer KYC Submitted:", values);
    toast({
        title: "KYC Done! You are LIVE 🎉",
        description: "You can now create and host games.",
      });
    router.push("/organizer/dashboard");
  }

  return (
    <main className="flex items-center justify-center min-h-screen py-8 bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Organizer KYC</CardTitle>
          <CardDescription>Takes about 45 seconds to complete</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField name="name" control={form.control} render={({ field }) => ( <FormItem><FormControl><Input placeholder="Full Name" {...field} /></FormControl><FormMessage /></FormItem> )} />
              <FormField name="phone" control={form.control} render={({ field }) => ( <FormItem><FormControl><Input type="tel" placeholder="Mobile (e.g., 9876543210)" {...field} /></FormControl><FormMessage /></FormItem> )} />
              <FormField name="email" control={form.control} render={({ field }) => ( <FormItem><FormControl><Input type="email" placeholder="Email Address" {...field} /></FormControl><FormMessage /></FormItem> )} />
              <FormField name="pan" control={form.control} render={({ field }) => ( <FormItem><FormControl><Input placeholder="PAN (e.g., ABCDE1234F)" {...field} onChange={(e) => field.onChange(e.target.value.toUpperCase())} /></FormControl><FormMessage /></FormItem> )} />
              <FormField name="aadhaar" control={form.control} render={({ field }) => ( <FormItem><FormControl><Input placeholder="Aadhaar (Last 4 digits)" {...field} /></FormControl><FormMessage /></FormItem> )} />
              <FormField name="bankAccount" control={form.control} render={({ field }) => ( <FormItem><FormControl><Input placeholder="Bank Account Number" {...field} /></FormControl><FormMessage /></FormItem> )} />
              <FormField name="ifsc" control={form.control} render={({ field }) => ( <FormItem><FormControl><Input placeholder="IFSC Code" {...field} onChange={(e) => field.onChange(e.target.value.toUpperCase())} /></FormControl><FormMessage /></FormItem> )} />
              <FormField name="city" control={form.control} render={({ field }) => ( <FormItem><FormControl><Input placeholder="City" {...field} /></FormControl><FormMessage /></FormItem> )} />

              <Button type="submit" size="lg" className="w-full font-bold mt-4 !mb-2">SUBMIT → START EARNING <ArrowRight className="ml-2 h-5 w-5" /></Button>
            </form>
          </Form>
           <Button asChild variant="link" className="w-full text-muted-foreground">
            <Link href="/">Back to Role Selection</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
