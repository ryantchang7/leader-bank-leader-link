
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SubmissionData {
  borrowerName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  companyHQ: string;
  businessStage: string;
  industry: string;
  seekingType: string;
  raiseAmount: string;
  useOfFunds: string;
  lastTwelveRevenue: string;
  productDescription: string;
  [key: string]: any;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const submissionData: SubmissionData = await req.json();
    
    console.log("Processing submission email for:", submissionData.borrowerName);

    // Format the submission data into a readable HTML email
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
          New ${submissionData.seekingType} Application Received
        </h1>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #374151; margin-top: 0;">Company Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 8px 0; font-weight: bold; width: 30%;">Company Name:</td>
              <td style="padding: 8px 0;">${submissionData.borrowerName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 8px 0; font-weight: bold;">Contact Name:</td>
              <td style="padding: 8px 0;">${submissionData.contactName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${submissionData.contactEmail}">${submissionData.contactEmail}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 8px 0;">${submissionData.contactPhone || 'Not provided'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 8px 0; font-weight: bold;">Location:</td>
              <td style="padding: 8px 0;">${submissionData.companyHQ}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 8px 0; font-weight: bold;">Business Stage:</td>
              <td style="padding: 8px 0;">${submissionData.businessStage}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 8px 0; font-weight: bold;">Industry:</td>
              <td style="padding: 8px 0;">${submissionData.industry}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #374151; margin-top: 0;">Funding Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 8px 0; font-weight: bold; width: 30%;">Seeking Type:</td>
              <td style="padding: 8px 0;">${submissionData.seekingType}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 8px 0; font-weight: bold;">Raise Amount:</td>
              <td style="padding: 8px 0;">${submissionData.raiseAmount || 'Not specified'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 8px 0; font-weight: bold;">Last 12 Months Revenue:</td>
              <td style="padding: 8px 0;">${submissionData.lastTwelveRevenue || 'Not provided'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 8px 0; font-weight: bold;">Use of Funds:</td>
              <td style="padding: 8px 0;">${submissionData.useOfFunds || 'Not specified'}</td>
            </tr>
          </table>
        </div>

        ${submissionData.productDescription ? `
        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #374151; margin-top: 0;">Business Description</h2>
          <p style="line-height: 1.6; color: #4b5563;">${submissionData.productDescription}</p>
        </div>
        ` : ''}

        <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-weight: bold; color: #92400e;">
            📅 Submitted: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
          </p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            This submission was automatically generated from the Leader Bank Leader Link application form.
          </p>
        </div>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: "Leader Link Submissions <onboarding@resend.dev>",
      to: ["techandvc@leaderbank.com"],
      subject: `New ${submissionData.seekingType} Application: ${submissionData.borrowerName}`,
      html: emailHTML,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending submission email:", error);
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
