# Tally Form Hidden Fields Setup Guide

To make the form prefilling work, you need to add hidden fields to your Tally form at https://tally.so/r/wg8KXl

## Required Hidden Fields

Add these hidden fields to your Tally form (exact names required):

1. **name** - Will receive the user's name from the demo
2. **email** - Will receive the user's email from the demo  
3. **rating** - Will receive the star rating (1-5) from the demo
4. **source** - Will track which page the user came from

## How to Add Hidden Fields in Tally:

1. **Edit your form** at https://tally.so/r/wg8KXl
2. **Type `/hidden`** in the form editor to add a hidden field block
3. **Name the field** exactly as listed above (case-sensitive!)
4. **Repeat** for all 4 fields: name, email, rating, source

## Optional: Set Up Default Answers

To make the visible "Full Name" and "Email Address" fields auto-populate:

1. **Click the ⠿ icon** next to your "Full Name" field
2. **Enable "Default answer"** toggle  
3. **Select "name"** from the dropdown (the hidden field)
4. **Repeat for Email Address** field, selecting "email" hidden field

## Testing URLs

After setup, these URLs will prefill your form:

- **Example 1:** `https://tally.so/r/wg8KXl?name=John%20Doe&email=john@example.com&rating=5&source=thank_you_page`
- **Example 2:** `https://tally.so/r/wg8KXl?name=Jane%20Smith&email=jane@example.com&rating=3&source=feedback_page`

## Current Implementation

The demo generates URLs like this automatically:
```javascript
const qs = new URLSearchParams({
  name: sessionStorage.getItem('rr_name') || '',
  email: sessionStorage.getItem('rr_email') || '', 
  rating: sessionStorage.getItem('rr_rating') || '',
  source: 'thank_you_page' // or 'feedback_page'
}).toString();

document.getElementById('cta-link').href = `https://tally.so/r/wg8KXl?${qs}`;
```

## What Happens After Setup

1. User fills out name/email on demo main page
2. User rates their experience (1-5 stars)
3. User clicks "Get Started Today" button
4. Tally form opens with their info pre-filled
5. Hidden fields capture rating and source for analytics

## Troubleshooting

- **Fields not prefilling?** Check that hidden field names match exactly: `name`, `email`, `rating`, `source`
- **Case sensitive:** `name` ≠ `Name` ≠ `NAME`
- **Test the URLs above** directly to verify setup