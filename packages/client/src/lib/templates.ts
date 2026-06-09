export interface Template {
  id: string;
  title: string;
  category: string;
  description: string;
  previewType: 'lease' | 'tax' | 'invoice' | 'checklist' | 'notice' | 'application' | 'nda' | 'intake' | 'hr' | 'legal' | 'medical' | 'education';
  content: string;
}

export const TEMPLATE_CATEGORIES = [
  'All Templates',
  'Real Estate',
  'Business',
  'Finance',
  'Legal',
  'HR',
  'Medical',
  'Education',
];

export const templates: Template[] = [
  {
    id: 'residential-lease',
    title: 'Residential Lease Agreement',
    category: 'Real Estate',
    description: 'Standard residential rental agreement between landlord and tenant.',
    previewType: 'lease',
    content: `# Residential Lease Agreement

**LANDLORD:** ___________________________  
**TENANT:** ___________________________  
**PROPERTY ADDRESS:** ___________________________

## LEASE TERMS

<div class="grid grid-cols-12 gap-0 border border-black">
  <field type="date" label="Lease Start Date" cols="6" />
  <field type="date" label="Lease End Date" cols="6" />
  <field type="number" label="Monthly Rent ($)" cols="6" />
  <field type="number" label="Security Deposit ($)" cols="6" />
</div>

## TERMS AND CONDITIONS

By signing below, both parties agree to the terms of this lease agreement.

<div class="grid grid-cols-12 gap-0 border border-black">
  <signature label="Landlord Signature" cols="6" />
  <field type="date" label="Date" cols="6" />
  <signature label="Tenant Signature" cols="6" />
  <field type="date" label="Date" cols="6" />
</div>
`
  },
  {
    id: 'client-intake',
    title: 'Client Intake Form',
    category: 'Business',
    description: 'Collect new client information for onboarding.',
    previewType: 'intake',
    content: `# Client Intake Form

**INSTRUCTIONS:** Please fill out all fields accurately.

## PERSONAL INFORMATION

<div class="grid grid-cols-12 gap-0 border border-black">
  <field type="text" label="Full Name" cols="8" />
  <field type="date" label="Date of Birth" cols="4" />
  <field type="email" label="Email Address" cols="6" />
  <field type="tel" label="Phone Number" cols="6" />
  <field type="text" label="Street Address" cols="12" />
  <field type="text" label="City" cols="5" />
  <field type="text" label="State" cols="3" />
  <field type="text" label="ZIP Code" cols="4" />
</div>

## SERVICES REQUESTED

<div class="grid grid-cols-12 gap-0 border border-black">
  <field type="textarea" label="How can we help you?" cols="12" />
</div>

## CONSENT

<div class="grid grid-cols-12 gap-0 border border-black">
  <signature label="Client Signature" cols="8" />
  <field type="date" label="Date" cols="4" />
</div>
`
  },
  {
    id: 'simple-invoice',
    title: 'Simple Invoice',
    category: 'Finance',
    description: 'Professional invoice template for freelancers and small businesses.',
    previewType: 'invoice',
    content: `# INVOICE

**FROM:**  
<div class="grid grid-cols-12 gap-0 border border-black">
  <field type="text" label="Your Name / Business" cols="8" />
  <field type="text" label="Invoice #" cols="4" />
  <field type="email" label="Email" cols="6" />
  <field type="date" label="Invoice Date" cols="6" />
</div>

**BILL TO:**  
<div class="grid grid-cols-12 gap-0 border border-black">
  <field type="text" label="Client Name" cols="8" />
  <field type="date" label="Due Date" cols="4" />
  <field type="email" label="Client Email" cols="12" />
</div>

## LINE ITEMS

<div class="grid grid-cols-12 gap-0 border border-black">
  <field type="text" label="Description" cols="7" />
  <field type="number" label="Qty" cols="2" />
  <field type="number" label="Rate ($)" cols="3" />
  <field type="text" label="Description" cols="7" />
  <field type="number" label="Qty" cols="2" />
  <field type="number" label="Rate ($)" cols="3" />
  <field type="text" label="TOTAL" cols="9" />
  <field type="number" label="Amount ($)" cols="3" />
</div>
`
  },
  {
    id: 'standard-nda',
    title: 'Standard NDA',
    category: 'Legal',
    description: 'Non-Disclosure Agreement between two parties.',
    previewType: 'nda',
    content: `# NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into as of the date signed below.

**DISCLOSING PARTY:** ___________________________  
**RECEIVING PARTY:** ___________________________

## 1. CONFIDENTIAL INFORMATION

The Receiving Party agrees to keep confidential all information disclosed by the Disclosing Party.

## 2. OBLIGATIONS

The Receiving Party shall:
- Protect the confidential information with at least the same degree of care it uses for its own
- Not disclose the information to third parties without prior written consent

## 3. TERM

This agreement shall remain in effect for **2 years** from the date of signing.

<div class="grid grid-cols-12 gap-0 border border-black">
  <signature label="Disclosing Party Signature" cols="6" />
  <field type="date" label="Date" cols="6" />
  <signature label="Receiving Party Signature" cols="6" />
  <field type="date" label="Date" cols="6" />
</div>
`
  },
  {
    id: 'employment-offer',
    title: 'Employment Offer Letter',
    category: 'HR',
    description: 'Official job offer letter with compensation details.',
    previewType: 'hr',
    content: `# Employment Offer Letter

Dear ___________________________,

We are pleased to offer you the position of **[Position Title]** at our company.

## OFFER DETAILS

<div class="grid grid-cols-12 gap-0 border border-black">
  <field type="text" label="Candidate Full Name" cols="8" />
  <field type="date" label="Start Date" cols="4" />
  <field type="text" label="Position / Title" cols="8" />
  <field type="select" label="Employment Type" cols="4" options="Full-Time,Part-Time,Contract" />
  <field type="number" label="Annual Salary ($)" cols="6" />
  <field type="text" label="Department" cols="6" />
  <field type="text" label="Reporting To" cols="12" />
</div>

## ACCEPTANCE

Please sign below to accept this offer.

<div class="grid grid-cols-12 gap-0 border border-black">
  <signature label="Candidate Signature" cols="8" />
  <field type="date" label="Date" cols="4" />
</div>
`
  },
  {
    id: 'patient-intake',
    title: 'Patient Intake Form',
    category: 'Medical',
    description: 'Collect patient information before a medical appointment.',
    previewType: 'medical',
    content: `# Patient Intake Form

## PATIENT INFORMATION

<div class="grid grid-cols-12 gap-0 border border-black">
  <field type="text" label="Patient Full Name" cols="8" />
  <field type="date" label="Date of Birth" cols="4" />
  <field type="text" label="Address" cols="12" />
  <field type="tel" label="Phone" cols="6" />
  <field type="email" label="Email" cols="6" />
  <field type="select" label="Sex" cols="4" options="Male,Female,Other,Prefer not to say" />
  <field type="text" label="Emergency Contact Name" cols="5" />
  <field type="tel" label="Emergency Contact Phone" cols="3" />
</div>

## MEDICAL HISTORY

<div class="grid grid-cols-12 gap-0 border border-black">
  <field type="textarea" label="Current Medications" cols="12" />
  <field type="textarea" label="Known Allergies" cols="12" />
  <field type="textarea" label="Reason for Visit" cols="12" />
</div>

## CONSENT

<div class="grid grid-cols-12 gap-0 border border-black">
  <signature label="Patient Signature" cols="8" />
  <field type="date" label="Date" cols="4" />
</div>
`
  },
  {
    id: 'student-enrollment',
    title: 'Student Enrollment Form',
    category: 'Education',
    description: 'Course or school enrollment form for students.',
    previewType: 'education',
    content: `# Student Enrollment Form

## STUDENT INFORMATION

<div class="grid grid-cols-12 gap-0 border border-black">
  <field type="text" label="Student Full Name" cols="8" />
  <field type="date" label="Date of Birth" cols="4" />
  <field type="text" label="Parent/Guardian Name" cols="8" />
  <field type="tel" label="Contact Phone" cols="4" />
  <field type="email" label="Email Address" cols="12" />
</div>

## ENROLLMENT DETAILS

<div class="grid grid-cols-12 gap-0 border border-black">
  <field type="text" label="Course / Program" cols="8" />
  <field type="date" label="Enrollment Date" cols="4" />
  <field type="select" label="Grade / Level" cols="6" options="Kindergarten,Grade 1,Grade 2,Grade 3,Grade 4,Grade 5,Grade 6,Grade 7,Grade 8,High School,College" />
</div>

## AGREEMENT

<div class="grid grid-cols-12 gap-0 border border-black">
  <signature label="Parent/Guardian Signature" cols="8" />
  <field type="date" label="Date" cols="4" />
</div>
`
  },
  {
    id: 'contractor-agreement',
    title: 'Independent Contractor Agreement',
    category: 'Legal',
    description: 'Define the working relationship with an independent contractor.',
    previewType: 'legal',
    content: `# Independent Contractor Agreement

This agreement is between:

**CLIENT:** ___________________________  
**CONTRACTOR:** ___________________________

## SCOPE OF WORK

<div class="grid grid-cols-12 gap-0 border border-black">
  <field type="textarea" label="Description of Services" cols="12" />
  <field type="date" label="Project Start Date" cols="6" />
  <field type="date" label="Project End Date" cols="6" />
  <field type="number" label="Compensation Rate ($)" cols="6" />
  <field type="select" label="Payment Frequency" cols="6" options="Weekly,Bi-Weekly,Monthly,Upon Completion" />
</div>

## TERMS

The Contractor is an independent professional and not an employee of the Client.

<div class="grid grid-cols-12 gap-0 border border-black">
  <signature label="Client Signature" cols="6" />
  <field type="date" label="Date" cols="6" />
  <signature label="Contractor Signature" cols="6" />
  <field type="date" label="Date" cols="6" />
</div>
`
  },
  {
    id: 'business-registration',
    title: 'Business Registration Form',
    category: 'Business',
    description: 'Register a new business entity or organization.',
    previewType: 'application',
    content: `# Business Registration Form

## BUSINESS INFORMATION

<div class="grid grid-cols-12 gap-0 border border-black">
  <field type="text" label="Legal Business Name" cols="8" />
  <field type="date" label="Founding Date" cols="4" />
  <field type="select" label="Business Type" cols="6" options="LLC,Corporation,Sole Proprietorship,Partnership,Nonprofit" />
  <field type="text" label="Tax ID / EIN" cols="6" />
  <field type="text" label="Business Address" cols="12" />
  <field type="text" label="City" cols="5" />
  <field type="text" label="State" cols="3" />
  <field type="text" label="ZIP" cols="4" />
  <field type="tel" label="Business Phone" cols="6" />
  <field type="email" label="Business Email" cols="6" />
</div>

## AUTHORIZED PERSON

<div class="grid grid-cols-12 gap-0 border border-black">
  <field type="text" label="Owner / Representative Name" cols="8" />
  <field type="text" label="Title" cols="4" />
  <signature label="Authorized Signature" cols="8" />
  <field type="date" label="Date" cols="4" />
</div>
`
  },
  {
    id: 'w9-form',
    title: 'W-9 Request Form',
    category: 'Finance',
    description: 'Request for taxpayer identification number and certification.',
    previewType: 'tax',
    content: `# W-9 REQUEST FOR TAXPAYER INFORMATION

## PART I — TAXPAYER INFORMATION

<div class="grid grid-cols-12 gap-0 border border-black">
  <field type="text" label="Name (as shown on tax return)" cols="12" />
  <field type="text" label="Business Name (if different)" cols="12" />
  <field type="select" label="Federal Tax Classification" cols="6" options="Individual/Sole Proprietor,C Corporation,S Corporation,Partnership,Trust/Estate,LLC,Other" />
  <field type="text" label="Tax ID / SSN / EIN" cols="6" />
  <field type="text" label="Address" cols="12" />
  <field type="text" label="City, State, ZIP" cols="12" />
</div>

## PART II — CERTIFICATION

I certify that all information provided is accurate and complete.

<div class="grid grid-cols-12 gap-0 border border-black">
  <signature label="Signature" cols="8" />
  <field type="date" label="Date" cols="4" />
</div>
`
  },
  {
    id: 'event-registration',
    title: 'Event Registration Form',
    category: 'Business',
    description: 'Register attendees for conferences, workshops, or events.',
    previewType: 'checklist',
    content: `# Event Registration Form

## ATTENDEE INFORMATION

<div class="grid grid-cols-12 gap-0 border border-black">
  <field type="text" label="Full Name" cols="8" />
  <field type="text" label="Job Title" cols="4" />
  <field type="text" label="Organization / Company" cols="8" />
  <field type="email" label="Email Address" cols="4" />
  <field type="tel" label="Phone Number" cols="6" />
  <field type="text" label="City, State" cols="6" />
</div>

## REGISTRATION OPTIONS

<div class="grid grid-cols-12 gap-0 border border-black">
  <field type="select" label="Session / Track" cols="6" options="Morning Session,Afternoon Session,Full Day,Workshop A,Workshop B" />
  <field type="select" label="Dietary Restrictions" cols="6" options="None,Vegetarian,Vegan,Gluten-Free,Kosher,Halal" />
  <field type="textarea" label="Special Accommodations Needed" cols="12" />
</div>
`
  },
  {
    id: 'property-inspection',
    title: 'Property Inspection Checklist',
    category: 'Real Estate',
    description: 'Document property condition during move-in or move-out.',
    previewType: 'notice',
    content: `# Property Inspection Checklist

**Property Address:** ___________________________  
**Inspection Date:** ___________________________

<div class="grid grid-cols-12 gap-0 border border-black">
  <field type="text" label="Inspector Name" cols="8" />
  <field type="select" label="Inspection Type" cols="4" options="Move-In,Move-Out,Annual" />
</div>

## ROOM-BY-ROOM CONDITION

<div class="grid grid-cols-12 gap-0 border border-black">
  <field type="select" label="Living Room" cols="6" options="Excellent,Good,Fair,Poor" />
  <field type="text" label="Notes" cols="6" />
  <field type="select" label="Kitchen" cols="6" options="Excellent,Good,Fair,Poor" />
  <field type="text" label="Notes" cols="6" />
  <field type="select" label="Bedroom 1" cols="6" options="Excellent,Good,Fair,Poor" />
  <field type="text" label="Notes" cols="6" />
  <field type="select" label="Bathroom" cols="6" options="Excellent,Good,Fair,Poor" />
  <field type="text" label="Notes" cols="6" />
  <field type="textarea" label="Additional Comments" cols="12" />
</div>

<div class="grid grid-cols-12 gap-0 border border-black">
  <signature label="Inspector Signature" cols="6" />
  <field type="date" label="Date" cols="6" />
</div>
`
  },
];
