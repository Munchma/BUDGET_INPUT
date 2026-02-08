# Payment Tracker Website

A mobile-friendly web app for logging debt payments that automatically syncs to Google Sheets.

## Features

- ✅ Clean, mobile-optimized interface
- ✅ Log payments for 4 different accounts
- ✅ Automatic date/time stamping
- ✅ Real-time sync to Google Sheets
- ✅ No backend required - runs on GitHub Pages

## Setup Instructions

### Step 1: Create Google Form

1. Go to [Google Forms](https://forms.google.com)
2. Create a new form with these fields:
   - **Payment Type** (Multiple choice)
     - Options: TD VISA, MBNA, TD LOC, Tangerine LOC
   - **Amount** (Short answer)
   - **Date** (Short answer)

3. Link form to a Google Sheet:
   - Click "Responses" tab → Create Spreadsheet → Create

### Step 2: Get Form Configuration

1. In Google Forms, click the 3 dots (⋮) → **Get pre-filled link**
2. Fill in test data:
   - Payment Type: TD VISA
   - Amount: 10.00
   - Date: 2026-02-07 14:30:00
3. Click **Get Link** and copy the URL

4. Modify the URL:
   - Change `viewform` to `formResponse`
   - Your URL should look like:
     ```
     https://docs.google.com/forms/d/e/ABC123XYZ/formResponse?
     usp=pp_url&
     entry.123456789=TD%20VISA&
     entry.987654321=10.00&
     entry.555555555=2026-02-07%2014:30:00
     ```

5. Note down:
   - Base URL (everything before the `?`)
   - Entry IDs (the numbers after `entry.`)
     - Payment Type entry ID (e.g., `entry.123456789`)
     - Amount entry ID (e.g., `entry.987654321`)
     - Date entry ID (e.g., `entry.555555555`)

### Step 3: Configure the Website

1. Open `script.js` in a text editor
2. Replace the placeholder values:

```javascript
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';

const ENTRY_IDS = {
    paymentType: 'entry.123456789',  // Your payment type entry ID
    amount: 'entry.987654321',        // Your amount entry ID
    date: 'entry.555555555'           // Your date entry ID
};
```

### Step 4: Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g., `payment-tracker`)
2. Upload these files:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md` (this file)

3. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: main (or master) → `/root`
   - Click Save

4. Your site will be live at:
   `https://YOUR_USERNAME.github.io/payment-tracker/`

### Step 5: Test It!

1. Open your website on your phone
2. Enter a test payment amount
3. Click "Log Payments"
4. Check your Google Sheet - the data should appear!

## Usage

1. Open the website on your phone
2. Enter payment amounts (leave blank if not paying that account)
3. Click "Log Payments"
4. Data automatically saves to your Google Sheet with timestamp

## Mobile Features

- Large, easy-to-tap input fields
- Pressing Enter moves to next field
- Submit button optimized for thumbs
- Works great on any screen size

## Viewing Your Data

Your Google Sheet will have columns:
- Payment Type
- Amount
- Date/Time

You can then:
- Reference this data in your budget spreadsheet
- Create charts and visualizations
- Export to Excel if needed

## Troubleshooting

**Payments not appearing in Google Sheet:**
- Double-check your entry IDs match exactly
- Make sure form URL ends with `/formResponse`
- Verify the Google Form is set to "Accepting responses"

**Website not loading:**
- Wait a few minutes after enabling GitHub Pages
- Check that all files are in the root directory
- Ensure repository is public (or upgrade to GitHub Pro for private repos)

## Pro Tips

- Bookmark the site on your phone's home screen for quick access
- Use IMPORTRANGE in Excel to pull this data into your budget
- Set reminders to log payments on due dates

---

Built with ❤️ for easy expense tracking
