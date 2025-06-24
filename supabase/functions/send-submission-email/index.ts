
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

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
  vertical: string;
  seekingType: string;
  raiseAmount: string;
  plannedValuation: string;
  useOfFunds: string;
  lastTwelveRevenue: string;
  growthRate: string;
  customersUsers: string;
  grossMargin: string;
  burnRate: string;
  foundersInfo: string;
  headcount: string;
  existingInvestors: string;
  totalEquityRaised: string;
  productDescription: string;
  competitiveLandscape: string;
  debtType: string[];
  debtDescription: string;
  debtSize: string;
  debtUseOfFunds: string;
  monthsInBusiness: string;
  priorYearRevenue: string;
  projectedRevenue: string;
  hasRecurringRevenue: string;
  annualRecurringRevenue: string;
  isEbitdaPositive: string;
  monthsToEbitda: string;
  ventureBacked: string;
  totalPEVCFunding: string;
  hasVCBoard: string;
  cashRunway: string;
  hasCollateral: string;
  collateralType: string;
  personalGuarantee: string;
  acceptCovenants: string;
  pledgeWarrants: string;
  pastAccelerator: string;
  acceleratorNames: string;
  acceleratorLocation: string;
  programCohort: string;
  programDates: string;
  acceleratorFunding: string;
  equityStake: string;
  keyResources: string;
  currentlyApplying: string;
  applyingTo: string;
  applicationDeadlines: string;
  soughtBenefits: string[];
  top3Goals: string;
  wantConnections: string;
  finalFullName: string;
  titleRole: string;
  agreeTerms: string;
  agreePrivacy: string;
  [key: string]: any;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Edge function invoked - checking environment variables");
    
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY environment variable is not set");
      throw new Error("RESEND_API_KEY is not configured");
    }
    console.log("RESEND_API_KEY found:", resendApiKey.substring(0, 10) + "...");

    const resend = new Resend(resendApiKey);
    
    const submissionData: SubmissionData = await req.json();
    console.log("Processing comprehensive submission email for:", submissionData.borrowerName);
    console.log("Submission data received:", JSON.stringify(submissionData, null, 2));

    const addField = (label: string, value: string | string[] | null | undefined) => {
      if (Array.isArray(value)) {
        const arrayText = value.length > 0 ? value.join(', ') : 'None selected';
        return `
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 8px 0; font-weight: bold; width: 30%; vertical-align: top;">${label}:</td>
            <td style="padding: 8px 0;">${arrayText}</td>
          </tr>
        `;
      } else if (value && value.trim() !== '') {
        return `
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 8px 0; font-weight: bold; width: 30%; vertical-align: top;">${label}:</td>
            <td style="padding: 8px 0;">${value}</td>
          </tr>
        `;
      }
      return '';
    };

    // Format the submission data into a comprehensive HTML email
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 900px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #dc2626; border-bottom: 3px solid #dc2626; padding-bottom: 15px; margin-bottom: 30px;">
          Leader Bank - Leader Link Application
        </h1>
        
        <div style="background-color: #fee2e2; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #dc2626;">
          <h2 style="color: #dc2626; margin: 0; font-size: 18px;">
            ${submissionData.seekingType.toUpperCase()} APPLICATION - COMPREHENSIVE REPORT
          </h2>
        </div>

        <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #374151; margin-top: 0; margin-bottom: 20px; font-size: 20px; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">BASIC INFORMATION</h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${addField('Company Name', submissionData.borrowerName)}
            ${addField('Contact Name', submissionData.contactName)}
            ${addField('Contact Email', submissionData.contactEmail)}
            ${addField('Contact Phone', submissionData.contactPhone)}
            ${addField('Company Headquarters', submissionData.companyHQ)}
            ${addField('Business Stage', submissionData.businessStage)}
            ${addField('Industry', submissionData.industry)}
            ${addField('Vertical', submissionData.vertical)}
          </table>
        </div>

        <div style="background-color: #f0f9ff; padding: 25px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #374151; margin-top: 0; margin-bottom: 20px; font-size: 20px; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">FUNDING INFORMATION</h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${addField('Seeking Type', submissionData.seekingType)}
            ${addField('Raise Amount', submissionData.raiseAmount)}
            ${addField('Use of Funds', submissionData.useOfFunds)}
          </table>
        </div>

        ${submissionData.seekingType === 'equity' ? `
        <div style="background-color: #f0fdf4; padding: 25px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #374151; margin-top: 0; margin-bottom: 20px; font-size: 20px; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">EQUITY INVESTMENT DETAILS</h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${addField('Planned Valuation', submissionData.plannedValuation)}
            ${addField('Last 12 Months Revenue', submissionData.lastTwelveRevenue)}
            ${addField('Growth Rate', submissionData.growthRate)}
            ${addField('Customers/Users', submissionData.customersUsers)}
            ${addField('Gross Margin', submissionData.grossMargin)}
            ${addField('Burn Rate', submissionData.burnRate)}
            ${addField('Founders Information', submissionData.foundersInfo)}
            ${addField('Headcount', submissionData.headcount)}
            ${addField('Existing Investors', submissionData.existingInvestors)}
            ${addField('Total Equity Raised', submissionData.totalEquityRaised)}
            ${addField('Product Description', submissionData.productDescription)}
            ${addField('Competitive Landscape', submissionData.competitiveLandscape)}
            ${addField('Pitch Deck', submissionData.pitchDeck ? 'File uploaded' : 'Not provided')}
            ${addField('Financial Model', submissionData.financialModel ? 'File uploaded' : 'Not provided')}
          </table>
        </div>
        ` : ''}

        ${submissionData.seekingType === 'debt' ? `
        <div style="background-color: #fef3c7; padding: 25px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #374151; margin-top: 0; margin-bottom: 20px; font-size: 20px; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">DEBT FINANCING DETAILS</h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${addField('Debt Type', submissionData.debtType)}
            ${addField('Debt Description', submissionData.debtDescription)}
            ${addField('Debt Size', submissionData.debtSize)}
            ${addField('Debt Use of Funds', submissionData.debtUseOfFunds)}
            ${addField('Months in Business', submissionData.monthsInBusiness)}
            ${addField('Prior Year Revenue', submissionData.priorYearRevenue)}
            ${addField('Projected Revenue', submissionData.projectedRevenue)}
            ${addField('Has Recurring Revenue', submissionData.hasRecurringRevenue)}
            ${addField('Annual Recurring Revenue', submissionData.annualRecurringRevenue)}
            ${addField('Is EBITDA Positive', submissionData.isEbitdaPositive)}
            ${addField('Months to EBITDA', submissionData.monthsToEbitda)}
            ${addField('Venture Backed', submissionData.ventureBacked)}
            ${addField('Total PE/VC Funding', submissionData.totalPEVCFunding)}
            ${addField('Has VC Board', submissionData.hasVCBoard)}
            ${addField('Cash Runway', submissionData.cashRunway)}
            ${addField('Has Collateral', submissionData.hasCollateral)}
            ${addField('Collateral Type', submissionData.collateralType)}
            ${addField('Personal Guarantee', submissionData.personalGuarantee)}
            ${addField('Accept Covenants', submissionData.acceptCovenants)}
            ${addField('Pledge Warrants', submissionData.pledgeWarrants)}
            ${addField('Financial Statements', submissionData.financialStatements ? 'Files uploaded' : 'Not provided')}
            ${addField('Business Plan', submissionData.businessPlan ? 'File uploaded' : 'Not provided')}
          </table>
        </div>
        ` : ''}

        ${submissionData.seekingType === 'accelerator' ? `
        <div style="background-color: #f3e8ff; padding: 25px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #374151; margin-top: 0; margin-bottom: 20px; font-size: 20px; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">ACCELERATOR PROGRAM DETAILS</h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${addField('Past Accelerator Experience', submissionData.pastAccelerator)}
            ${addField('Accelerator Names', submissionData.acceleratorNames)}
            ${addField('Accelerator Location', submissionData.acceleratorLocation)}
            ${addField('Program/Cohort', submissionData.programCohort)}
            ${addField('Program Dates', submissionData.programDates)}
            ${addField('Accelerator Funding', submissionData.acceleratorFunding)}
            ${addField('Equity Stake Given', submissionData.equityStake)}
            ${addField('Key Resources/Benefits', submissionData.keyResources)}
            ${addField('Currently Applying', submissionData.currentlyApplying)}
            ${addField('Applying To', submissionData.applyingTo)}
            ${addField('Application Deadlines', submissionData.applicationDeadlines)}
            ${addField('Sought Benefits', submissionData.soughtBenefits)}
            ${addField('Top 3 Goals', submissionData.top3Goals)}
            ${addField('Want Connections', submissionData.wantConnections)}
          </table>
        </div>
        ` : ''}

        <div style="background-color: #ecfdf5; padding: 25px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #374151; margin-top: 0; margin-bottom: 20px; font-size: 20px; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">FINAL STEPS & AGREEMENTS</h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${addField('Full Name', submissionData.finalFullName)}
            ${addField('Title/Role', submissionData.titleRole)}
            ${addField('Agree to Terms', submissionData.agreeTerms)}
            ${addField('Agree to Privacy', submissionData.agreePrivacy)}
          </table>
        </div>

        <div style="background-color: #fffbeb; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #f59e0b;">
          <h2 style="color: #374151; margin-top: 0; margin-bottom: 15px; font-size: 18px;">SUBMISSION DETAILS</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 8px 0; font-weight: bold; width: 30%;">Submission Date:</td>
              <td style="padding: 8px 0;">${new Date().toLocaleDateString()}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 8px 0; font-weight: bold;">Submission Time:</td>
              <td style="padding: 8px 0;">${new Date().toLocaleTimeString()}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 8px 0; font-weight: bold;">Form Type:</td>
              <td style="padding: 8px 0;">${submissionData.seekingType} Application</td>
            </tr>
          </table>
        </div>

        <div style="text-align: center; margin-top: 40px; padding-top: 25px; border-top: 2px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            This comprehensive submission was automatically generated from the Leader Bank Leader Link application system.
          </p>
        </div>
      </div>
    `;

    console.log("Attempting to send email with Resend...");
    console.log("Email recipients: vitaliy.schafer@leaderbank.com, alex.guinta@leaderbank.com, Summer.Hutchison@leaderbank.com");

    const emailResponse = await resend.emails.send({
      from: "Leader Link Submissions <onboarding@resend.dev>",
      to: ["vitaliy.schafer@leaderbank.com", "alex.guinta@leaderbank.com", "Summer.Hutchison@leaderbank.com"],
      subject: `New ${submissionData.seekingType} Application: ${submissionData.borrowerName}`,
      html: emailHTML,
    });

    console.log("Resend API response:", emailResponse);

    if (emailResponse.error) {
      console.error("Resend API error:", emailResponse.error);
      throw new Error(`Resend API error: ${emailResponse.error.message}`);
    }

    console.log("Email sent successfully with ID:", emailResponse.data?.id);

    return new Response(JSON.stringify({ 
      success: true, 
      emailId: emailResponse.data?.id,
      message: "Email sent successfully"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-submission-email function:", error);
    console.error("Error stack:", error.stack);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
