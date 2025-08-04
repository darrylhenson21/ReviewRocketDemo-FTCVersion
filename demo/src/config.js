export const config = {
  businessName: "[Your Business Name Here]",
  primaryColor: "#0ea5e9", // Tailwind sky-500 as default
  logoPath: "public/logo.svg",
  publicReviewUrl: "#demo-redirect",
  
  // Lead capture configuration (back to nodemailer via Vercel serverless)
  leadCaptureUrl: "/api/send-lead", // Vercel serverless function endpoint
  
  cta: {
    show: true,
    link: "lead-form.html", // Back to internal lead form
    headline: "Want this system running for your business?",
    subhead: "We'll set it up for you.",
    button: "Get Started Today"
  },
  
  flags: {
    showExplainers: true,
    showCTA: true
  },
  
  texts: {
    landingHeadline: "Tell Us How We Did",
    landingSubhead: "Your feedback helps us serve you better.",
    submitBtn: "Submit Review",
    leadCaptureLabel: "Send me details on setting this up for my business",
    lowHeader: "We're Sorry to Hear That…",
    lowBody: "Help us make things right. Tell us how we can improve.",
    lowSubmit: "Send Feedback",
    highHeader: "Thanks for the Kind Words!",
    highBody: "Would you be willing to leave this review on our public profile?",
    highCta: "Leave a Google Review",
    apologyHeading: "We're sorry we missed the mark.",
    apologyBlurb: "Tell us how we can make it right below — or leave a public review anyway:",
    successHeading: "Thank you!",
    successBlurb: "One more click to share your 5-star experience:"
  },
  

  
  formPrefillMap: {
    name: 'name',
    email: 'email'
  },
  
  explainers: {
    headline: "This is the exact page your customers see when you ask for feedback. We will customize this with your business name, logo, and branding colors.",
    starWidget: "All ratings can leave public reviews. Low ratings (1-3 stars) are shown an option for private feedback first, while high ratings (4-5 stars) are automatically redirected to public reviews."
  }
};
