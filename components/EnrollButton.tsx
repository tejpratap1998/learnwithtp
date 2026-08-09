"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import Script from "next/script";

interface EnrollButtonProps {
  courseId: string;
}

export default function EnrollButton({ courseId }: EnrollButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const handlePayment = async () => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    setIsLoading(true);
    try {
      // 1. Create order
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Failed to create order");
        setIsLoading(false);
        return;
      }

      const orderData = await res.json();

      // 2. Initialize Razorpay options
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "LearnWithTP",
        description: "Course Enrollment",
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                courseId,
              }),
            });

            if (verifyRes.ok) {
              router.push("/dashboard");
              router.refresh();
            } else {
              const errorData = await verifyRes.json();
              alert(errorData.message || "Payment verification failed");
            }
          } catch (err) {
            alert("An error occurred during verification");
          }
        },
        prefill: {
          name: session?.user?.name || "",
          email: session?.user?.email || "",
        },
        theme: {
          color: "#2563eb",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      
      rzp.on("payment.failed", function (response: any) {
        alert(response.error.description || "Payment failed");
      });

      rzp.open();
    } catch (error) {
      alert("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <button 
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mt-6 shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)] disabled:opacity-70"
      >
        {isLoading ? <Loader2 className="animate-spin" /> : "Enroll Now"}
      </button>
    </>
  );
}
