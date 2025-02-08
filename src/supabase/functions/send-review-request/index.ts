// @ts-nocheck - Supabase Edge Functions use Deno
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ReviewRequestEmailData {
  customerName: string;
  customerEmail: string;
  productName: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerName, customerEmail, productName }: ReviewRequestEmailData = await req.json();

    console.log("Sending review request email to:", customerEmail);

    const emailResponse = await resend.emails.send({
      from: "Your Store <onboarding@resend.dev>",
      to: [customerEmail],
      subject: "How was your experience?",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Hi ${customerName},</h2>
          <p>We hope you're enjoying your ${productName}!</p>
          <p>We'd love to hear about your experience. Would you mind taking a moment to share your thoughts?</p>
          <p>Your feedback helps us improve and helps other customers make informed decisions.</p>
          <div style="margin: 30px 0;">
            <a href="#" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px;">
              Leave a Review
            </a>
          </div>
          <p>Thank you for choosing us!</p>
          <p>Best regards,<br>Your Store Team</p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-review-request function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);