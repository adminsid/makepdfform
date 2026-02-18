export interface Template {
  id: string;
  title: string;
  category: string;
  previewType: 'lease' | 'tax' | 'invoice' | 'checklist' | 'notice' | 'application';
  content: string;
}

export const templates: Template[] = [
  {
    id: 'buyer-registration',
    title: 'Buyer Registration Agreement',
    category: 'Real Estate',
    previewType: 'application',
    content: `# Buyer Registration Agreement

**INSTRUCTIONS:** A good match of business and acquirer is one of the keys to success.

## PERSONAL INFORMATION
*Please type or print*

<div class="grid grid-cols-12 gap-0 border border-black">

  <field type="text"      label="NAME"            cols="6"  />
  <field type="number"    label="AGE"             cols="2"  />
  <field type="select"    label="MARITAL STATUS"  cols="2" options="Single,Married" />
  <field type="number"    label="NO. IN FAMILY"   cols="2"  />
  <field type="text"      label="ADDRESS"         cols="4"  />
  <field type="text"      label="CITY"            cols="3"  />
  <field type="text"      label="STATE"           cols="1"  />
  <field type="text"      label="ZIP"             cols="2"  />
  <field type="text"      label="PHONE (H)"       cols="2"  />

</div>

<section title="Agreements">
  <p>By signing below, I agree to the terms.</p>
  <div class="grid grid-cols-12 gap-0 border border-black">
     <signature label="Signature of Buyer" cols="8" />
     <field type="date" label="Date" cols="4" />
  </div>
</section>
`
  }
];
