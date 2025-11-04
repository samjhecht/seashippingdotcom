# User Acceptance Test (UAT) Scenarios

**Project:** SeaShipping.com Website Redesign
**Version:** 1.0
**Last Updated:** October 29, 2025

## Overview
This document outlines comprehensive user acceptance test scenarios for the SeaShipping.com website. These scenarios represent real-world user journeys and should be tested before production launch.

## Test Scenario Format

Each scenario includes:
- **User Type:** The type of user performing the action
- **Goal:** What the user is trying to accomplish
- **Prerequisites:** What needs to be in place before starting
- **Steps:** Detailed step-by-step instructions
- **Expected Result:** What should happen if everything works correctly
- **Acceptance Criteria:** Specific criteria that must be met
- **Test Data:** Sample data to use during testing

---

## Scenario 1: New Visitor Requesting Rate Quote

### User Profile
**User Type:** First-time visitor, potential customer
**Device:** Desktop (Chrome)
**Context:** Business owner looking to ship ocean freight from LA to Shanghai

### Goal
Submit a rate request for ocean freight shipping and receive confirmation.

### Prerequisites
- Site is accessible
- Rate request form is functional
- Email service (SendGrid) is configured

### Test Steps

1. **Navigate to homepage**
   - Open browser
   - Go to https://seashipping.com
   - Wait for page to load completely

2. **Explore services**
   - Scroll down to view services section
   - Click "View All Services" button
   - Review list of available services

3. **Select Ocean Freight service**
   - Click on "Ocean Freight" service card
   - Read service description
   - View features and benefits
   - Note the service capabilities

4. **Navigate to rate request form**
   - Click "Request Rate" button (in hero or at bottom)
   - Verify redirected to rate request page
   - Form should be visible and ready

5. **Fill out rate request form**
   ```
   Name: John Smith
   Company: Smith Import/Export LLC
   Email: john.smith@example.com
   Phone: (555) 123-4567
   Service: Ocean Freight
   Message: I need a rate quote for shipping 2 x 40' containers
            from Los Angeles to Shanghai. Cargo is electronics
            equipment. Target ship date: December 15, 2025.
   ```

6. **Submit form**
   - Click "Send Request" button
   - Wait for submission to complete

7. **Verify success**
   - Success message should appear
   - Form should clear or show new state
   - No errors displayed

### Expected Result
- User successfully navigates through site
- Ocean Freight service information is clear and helpful
- Rate request form submits successfully
- User receives confirmation of submission
- Email notification sent to SeaShipping sales team

### Acceptance Criteria
- [ ] Homepage loads in <2 seconds
- [ ] All navigation links work
- [ ] Service information is clear and complete
- [ ] Rate request form is easy to find (<3 clicks)
- [ ] Form validates all required fields
- [ ] Success message displays after submission
- [ ] Email notification received within 1 minute
- [ ] Email contains all submitted information
- [ ] Form resets after successful submission
- [ ] No JavaScript errors in console

### Test Data for Email Verification
**Expected email recipient:** [RATE_REQUEST_EMAIL from env]
**Email subject:** "New Rate Request from John Smith"
**Email should contain:**
- Name: John Smith
- Company: Smith Import/Export LLC
- Email: john.smith@example.com
- Phone: (555) 123-4567
- Service: Ocean Freight
- Message content

---

## Scenario 2: Mobile User Finding Local Office

### User Profile
**User Type:** Existing customer needing immediate help
**Device:** iPhone 14 (iOS Safari)
**Context:** Customer at port needs to contact NYC office urgently

### Goal
Find NYC office contact information and initiate phone call.

### Prerequisites
- Site is accessible on mobile
- Network/offices page is complete
- Click-to-call functionality works

### Test Steps

1. **Navigate to site on mobile**
   - Open Safari on iPhone
   - Go to https://seashipping.com
   - Site should be mobile-optimized

2. **Open mobile navigation**
   - Tap hamburger menu icon (top right)
   - Mobile menu should slide in from right
   - Menu should be fully visible

3. **Navigate to Network page**
   - Tap "Network" in mobile menu
   - Menu should close automatically
   - Network page should load

4. **Find NYC office**
   - Scroll through list of offices
   - Locate "New York City" office card
   - Office should be clearly identifiable

5. **View contact information**
   - Read office address
   - View phone number
   - Note hours of operation

6. **Initiate phone call**
   - Tap phone number
   - iOS should prompt to call
   - Confirm call initiation (don't actually call in test)

### Expected Result
- Site renders correctly on mobile device
- Navigation is intuitive and easy to use
- Office information is clear and accessible
- Phone number is clickable (tel: link)
- User can quickly find and contact office

### Acceptance Criteria
- [ ] Site loads in <3 seconds on 4G
- [ ] Mobile menu opens smoothly
- [ ] All menu items visible and readable
- [ ] Touch targets are 44x44px minimum
- [ ] Network page renders correctly on mobile
- [ ] Office cards are easy to read
- [ ] Phone numbers are clickable (tel: links)
- [ ] Tapping phone number triggers dialer
- [ ] Email addresses are clickable (mailto: links)
- [ ] No horizontal scrolling required
- [ ] Text is readable without zooming

### Test Data
**Expected office information:**
```
New York City
123 Office Building
456 Main Street, Suite 789
New York, NY 10001
Phone: (212) 555-0123
Email: nyc@seashipping.com
```

---

## Scenario 3: Returning Visitor Subscribing to Newsletter

### User Profile
**User Type:** Returning visitor, familiar with site
**Device:** Desktop (Firefox)
**Context:** Regular customer wants to stay updated on news

### Goal
Subscribe to newsletter for industry updates and company news.

### Prerequisites
- Newsletter subscription form functional
- Email service configured
- Subscription confirmation email template ready

### Test Steps

1. **Navigate to homepage**
   - Open Firefox
   - Go to https://seashipping.com
   - Page loads fully

2. **Locate newsletter section**
   - Scroll to footer (newsletter form typically in footer)
   - Or navigate to News page
   - Find newsletter subscription form

3. **Review newsletter benefits**
   - Read description of newsletter content
   - Check frequency of emails
   - Review privacy policy link

4. **Fill out subscription form**
   ```
   Email: jane.doe@example.com
   Name: Jane Doe (if field exists)
   ```

5. **Submit subscription**
   - Click "Subscribe" button
   - Wait for response

6. **Verify confirmation**
   - Success message should appear
   - Form should clear or disable
   - Check email for confirmation

### Expected Result
- Newsletter form is easy to find
- Subscription process is simple (minimal fields)
- User receives immediate confirmation on-screen
- Confirmation email sent within minutes
- Email contains subscription confirmation and/or welcome message

### Acceptance Criteria
- [ ] Newsletter form is visible on homepage or footer
- [ ] Form has clear value proposition
- [ ] Email field validation works
- [ ] Form prevents duplicate subscriptions gracefully
- [ ] Success message is clear and friendly
- [ ] Confirmation email received within 5 minutes
- [ ] Confirmation email well-designed and branded
- [ ] Unsubscribe link present in email
- [ ] Privacy policy accessible
- [ ] No spam or unsolicited emails sent

---

## Scenario 4: Potential Customer Comparing Services

### User Profile
**User Type:** New visitor, researching options
**Device:** Tablet (iPad, Safari)
**Context:** Freight forwarder researching capabilities for client

### Goal
Compare different shipping services to determine best option for client needs.

### Prerequisites
- All service pages complete with detailed information
- Service comparison features clear

### Test Steps

1. **Navigate to Services overview**
   - Go to https://seashipping.com/services
   - Review all available services

2. **Explore Ocean Freight**
   - Click "Ocean Freight" service
   - Read full description
   - Note key features
   - Review equipment types
   - Check transit times

3. **Return and explore Air Freight**
   - Use back button or navigation
   - Click "Air Freight" service
   - Read full description
   - Note key features
   - Compare with Ocean Freight mentally

4. **Explore Customs Brokerage**
   - Navigate to "Customs Brokerage" page
   - Read about regulatory compliance
   - Note additional services

5. **Review all services quickly**
   - Return to services overview
   - Scan all 7 services
   - Get sense of full capabilities

6. **Request information**
   - Choose most relevant service
   - Click "Request Rate" or "Contact Us"
   - Submit inquiry with specific questions

### Expected Result
- User can easily navigate between services
- Service information is comprehensive and clear
- Comparisons are easy to make
- User feels informed about capabilities
- User can easily request more information

### Acceptance Criteria
- [ ] Services page loads quickly on tablet
- [ ] All 7 services clearly presented
- [ ] Navigation between services is intuitive
- [ ] Service pages have consistent structure
- [ ] Key features prominently displayed
- [ ] Equipment types clearly listed
- [ ] Breadcrumbs work for navigation
- [ ] "Back to Services" link available
- [ ] CTA buttons to request rates present
- [ ] Content is readable on tablet (no zoom needed)
- [ ] Images load and display correctly

---

## Scenario 5: Customer Downloading Resources

### User Profile
**User Type:** Existing customer, needs documentation
**Device:** Desktop (Chrome, Windows)
**Context:** Customer preparing shipment needs forms and regulations

### Goal
Find and download necessary shipping documents and regulatory information.

### Prerequisites
- Resources page complete
- All PDFs uploaded and accessible
- Download tracking in analytics

### Test Steps

1. **Navigate to Resources**
   - Go to https://seashipping.com
   - Click "Resources" in navigation
   - Resources page loads

2. **Review available documents**
   - Scan list of available documents
   - Note document categories
   - Check document descriptions

3. **Download Commercial Invoice template**
   - Locate "Commercial Invoice" document
   - Click download link
   - File should download to computer

4. **Open downloaded PDF**
   - Open file from downloads folder
   - Verify PDF is complete and readable
   - Check it's the correct document

5. **Access external trade tools**
   - Find ExportFile link
   - Click link
   - External site should open in new tab

6. **Return and bookmark page**
   - Return to resources page
   - Bookmark page for future reference

### Expected Result
- Resources are well-organized and easy to find
- Documents download successfully
- PDFs are complete and usable
- External links work correctly
- User can easily access needed information

### Acceptance Criteria
- [ ] Resources page loads quickly
- [ ] Documents clearly categorized
- [ ] Download links work correctly
- [ ] PDFs open without issues
- [ ] File sizes reasonable (<5MB)
- [ ] Documents are correct and complete
- [ ] External links open in new tab
- [ ] External links work (not broken)
- [ ] Download events tracked in analytics
- [ ] Page is easy to bookmark/share

---

## Scenario 6: Support Staff Testing Accessibility

### User Profile
**User Type:** Site administrator/QA tester
**Device:** Desktop (various browsers)
**Context:** Verifying site accessibility before launch

### Goal
Verify site is fully accessible via keyboard and screen reader.

### Prerequisites
- Screen reader installed (NVDA, VoiceOver, or JAWS)
- Accessibility testing tools available

### Test Steps

1. **Test keyboard navigation**
   - Start on homepage
   - Press Tab key repeatedly
   - Verify focus moves logically
   - All interactive elements should be accessible
   - Focus indicator visible at all times

2. **Test skip link**
   - Refresh page
   - Press Tab once
   - "Skip to main content" should be visible
   - Press Enter
   - Focus should jump to main content

3. **Navigate with keyboard only**
   - Use Tab to move forward
   - Use Shift+Tab to move backward
   - Use Enter/Space to activate buttons
   - Use Escape to close modals
   - Navigate entire site without mouse

4. **Test forms with keyboard**
   - Navigate to rate request form
   - Tab through all form fields
   - Fill out form using keyboard only
   - Submit form with Enter key
   - Verify error handling works

5. **Test with screen reader**
   - Enable screen reader (NVDA/VoiceOver)
   - Navigate homepage
   - Verify all content announced correctly
   - Verify landmarks announced
   - Verify form labels read correctly
   - Verify images have alt text

6. **Test mobile menu accessibility**
   - Tab to hamburger menu
   - Activate with Enter
   - Menu should open
   - Focus should move to menu
   - Tab through menu items
   - Press Escape to close
   - Focus should return to hamburger

### Expected Result
- Entire site is navigable via keyboard
- All interactive elements accessible
- Screen reader announces content correctly
- No keyboard traps
- Focus management works properly
- ARIA labels where appropriate

### Acceptance Criteria
- [ ] Skip link present and functional
- [ ] Focus indicator visible on all elements
- [ ] Tab order is logical
- [ ] Enter/Space activate buttons
- [ ] Escape closes modals/menus
- [ ] No keyboard traps
- [ ] Form labels properly associated
- [ ] Error messages announced
- [ ] All images have alt text
- [ ] Landmarks properly labeled
- [ ] Headings in proper hierarchy (h1, h2, h3...)
- [ ] ARIA attributes used correctly
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Content readable at 200% zoom

---

## Scenario 7: International User (Non-English Browser)

### User Profile
**User Type:** International visitor
**Device:** Desktop (Chrome with Chinese language settings)
**Context:** Chinese manufacturer looking for US freight forwarder

### Goal
Navigate site and understand services despite browser language difference.

### Prerequisites
- Site works with non-English browser settings
- Content is clear and uses international terminology

### Test Steps

1. **Navigate to site**
   - Set browser language to Chinese
   - Go to https://seashipping.com
   - Observe page rendering

2. **Navigate using visual cues**
   - Use navigation menu (English text but clear structure)
   - Click on service icons/images
   - Use visual hierarchy to understand content

3. **Use browser translation**
   - Right-click page
   - Select "Translate to Chinese"
   - Verify page still works after translation
   - Check if forms still function

4. **Submit inquiry**
   - Fill out form in English (or Chinese if translation used)
   - Submit successfully

### Expected Result
- Site works regardless of browser language
- Visual design helps international users navigate
- Content makes sense when translated
- Forms work after browser translation
- User can successfully complete tasks

### Acceptance Criteria
- [ ] Site loads regardless of browser language
- [ ] Layout doesn't break with translated text
- [ ] Icons and visual cues are clear
- [ ] Phone numbers use international format
- [ ] Date formats are clear
- [ ] Forms work after browser translation
- [ ] No language-specific JavaScript errors
- [ ] Content makes sense when machine-translated

---

## Additional Quick Test Scenarios

### Scenario 8: Error Handling - Invalid Form Input
**Steps:**
1. Go to rate request form
2. Submit without filling any fields
3. Fill only email with invalid format
4. Submit with very short message (<10 chars)

**Expected:**
- Clear error messages for each field
- Errors appear in context
- User can easily fix and resubmit

### Scenario 9: Performance - Slow Connection
**Steps:**
1. Use Chrome DevTools to throttle to "Slow 3G"
2. Navigate to homepage
3. Navigate to services pages
4. Submit form

**Expected:**
- Site still usable on slow connection
- Progressive loading of content
- No broken images
- Forms still functional

### Scenario 10: Social Sharing
**Steps:**
1. Copy URL of service page
2. Paste in LinkedIn or Twitter preview
3. Check preview image and text

**Expected:**
- Correct Open Graph image displays
- Title and description accurate
- Preview looks professional

---

## UAT Sign-Off Template

For each scenario, use this template to document testing:

```markdown
## UAT Test Record

**Scenario:** [Scenario Name]
**Tested by:** [Name]
**Date:** [YYYY-MM-DD]
**Device/Browser:** [Details]
**Environment:** Staging / Production

### Test Result
- [ ] PASS - All criteria met
- [ ] PASS WITH NOTES - Minor issues documented below
- [ ] FAIL - Critical issues prevent completion

### Notes
[Any observations, issues, or comments]

### Issues Found
1. [Issue description] - Severity: Critical/High/Medium/Low
2. [Issue description] - Severity: Critical/High/Medium/Low

### Recommendations
[Any suggestions for improvement]

**Sign-off:** [Name] [Date]
```

---

## UAT Completion Criteria

Before sign-off, verify:
- [ ] All 7 main scenarios tested successfully
- [ ] Tested on desktop (Chrome, Firefox, Safari)
- [ ] Tested on mobile (iOS Safari, Chrome Android)
- [ ] Tested on tablet (iPad)
- [ ] All critical issues resolved
- [ ] High priority issues resolved or documented
- [ ] Accessibility scenarios pass
- [ ] Performance acceptable across scenarios
- [ ] User feedback positive
- [ ] Stakeholder approval obtained

---

**Document History:**
- v1.0 - October 29, 2025 - Initial version

**Next Review:** After UAT completion, before each major release
