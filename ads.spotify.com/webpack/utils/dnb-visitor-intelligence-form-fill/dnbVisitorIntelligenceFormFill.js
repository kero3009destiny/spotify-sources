import React from 'react';

const VISITOR_INTELLIGENCE_API_KEY = 'vff4471';

const DNB_VIFF_SNIPPET = `
  if (window.ActiveXObject) {
    window.ActiveXObject = null;
  }
`;

export const HeadSnippet = () => (
  <>
    <script
      type="text/javascript"
      src="//cdn-0.d41.co/tags/ff-2.min.js"
      charset="utf-8"
    />
    {/* eslint-disable-next-line react/no-danger */}
    <script dangerouslySetInnerHTML={{ __html: DNB_VIFF_SNIPPET }} />
  </>
);

const isRequired = val => {
  throw new Error(`${val} is required.`);
};

const PARDOT_MAPPINGS = {
  'dnb-duns': 'D&B DUNS Number',
  'dnb-company': '',
  'dnb-address1': 'Address One',
  'dnb-address2': 'Address Two',
  'dnb-city': 'City',
  'dnb-state': '',
  'dnb-postal': 'Zip',
  'dnb-country': '',
  'dnb-naicsCode': 'NAICS',
  'dnb-naicsDescription': 'NAICS Description',
  'dnb-sicCode': '',
  'dnb-sicDescription': '',
  'dnb-revenue': 'Annual Revenue',
  'dnb-employeeSiteCount': 'Employees - Number',
  'dnb-vanityTitle': 'Job Title',
  'dnb-globalUltimateDuns': '',
  'dnb-globalUltimatePrimaryName': '',
  'dnb-domesticUltimateDuns': 'Domestic Ultimate DUNS Number',
  'dnb-domesticUltimatePrimaryName': '',
  'dnb-parentDuns': 'Parent DUNS Number',
  'dnb-parentPrimaryName': '',
  'dnb-globalUltimateFamilyTreeMembersCount': '',
  'dnb-phoneField': 'Phone',
  'dnb-telephoneNumber': '',
  'dnb-domain': 'Website',
  'dnb-tradeStyleName': 'Industry',
  'dnb-currency': '',
};

export default class DNBVisitorIntelligenceFormFill {
  static attach({
    formId,
    contactEmailSearchFieldName = isRequired('contactEmailSearchFieldName'),
    companyCountrySearchFieldName = isRequired('companyCountrySearchFieldName'),
    companyNameSearchFieldName = isRequired('companyNameSearchFieldName'),
    companyNameFieldName = 'dnb-company',
    countryFieldName = 'dnb-country',
    stateFieldName = 'dnb-state',
    attachChangeListeners = [],
    onChange = () => {},
  }) {
    const dpa = new window.Fill.LeadFormApp({
      visitorIntelligenceApiKey: VISITOR_INTELLIGENCE_API_KEY,
      defaultCompanyCountry: 'United States',
      countryValueType: 'plaintext',
      // This should always be an ID attribute
      leadFormName: formId,

      // The following three fields must exist, but can be hidden
      contactEmailSearchFieldName,
      companyCountrySearchFieldName,
      companyNameSearchFieldName,

      useLIDropdowns: true,
      visitorIDEnabled: false,
      clearFieldsIfNoEmailSearchMatch: false,
      clearCompanyAfterCountryChange: false,
      liSelectedClass: 'CompanySearchResults__selected',
      // Determines mapping type; eligible values are "name" or "id", including quotation marks
      attributeForFieldLookup: 'name',
      // Leave as-is to disable automatic focus-stealing, or declare a field name in lieu of ""
      initialFocusFieldName: '',

      // Field mappings; value on right should match appropriate attribute from form (case-sensitive)
      dunsFieldName: 'dnb-duns',
      companyNameFieldName,
      address1FieldName: 'dnb-address1',
      address2FieldName: 'dnb-address2',
      cityFieldName: 'dnb-city',
      stateFieldName,
      postalFieldName: 'dnb-postal',
      countryFieldName,
      naicsCodeFieldName: 'dnb-naicsCode',
      naicsDescriptionFieldName: 'dnb-naicsDescription',
      sicCodeFieldName: 'dnb-sicCode',
      sicDescriptionFieldName: 'dnb-sicDescription',
      revenueFieldName: 'dnb-revenue',
      employeeSiteCountFieldName: 'dnb-employeeSiteCount',
      // firstNameFieldName,
      // lastNameFieldName,
      vanityTitleFieldName: 'dnb-vanityTitle',
      globalUltimateDunsFieldName: 'dnb-globalUltimateDuns',
      globalUltimatePrimaryNameFieldName: 'dnb-globalUltimatePrimaryName',
      domesticUltimateDunsFieldName: 'dnb-domesticUltimateDuns',
      domesticUltimatePrimaryNameFieldName: 'dnb-domesticUltimatePrimaryName',
      parentDunsFieldName: 'dnb-parentDuns',
      parentPrimaryNameFieldName: 'dnb-parentPrimaryName',
      globalUltimateFamilyTreeMembersCountFieldName:
        'dnb-globalUltimateFamilyTreeMembersCount',
      phoneFieldName: 'dnb-phoneField',
      telephoneNumberFieldName: 'dnb-telephoneNumber',
      domainFieldName: 'dnb-domain',
      tradeStyleNameFieldName: 'dnb-tradeStyleName',
      currencyFieldName: 'dnb-currency',
    });

    dpa.attach();

    const form = document.getElementById(formId);

    if (!form) return;

    const fieldsToListen = attachChangeListeners
      .map(fieldName => form.querySelector(`[name="${fieldName}"]`))
      .filter(element => !!element);

    fieldsToListen.forEach(element => {
      const elementDescriptor = Object.getOwnPropertyDescriptor(
        element.constructor.prototype,
        'value',
      );

      Object.defineProperty(element, 'value', {
        set(value) {
          elementDescriptor.set.call(this, value);
          onChange({ target: element });
        },
        get() {
          return elementDescriptor.get.call(this);
        },
      });
    });
  }

  static HiddenFields = React.forwardRef((props, ref) => (
    <div ref={ref}>
      <input type="hidden" name="dnb-duns" />
      <input type="hidden" name="dnb-company" />
      <input type="hidden" name="dnb-address1" />
      <input type="hidden" name="dnb-address2" />
      <input type="hidden" name="dnb-city" />
      <input type="hidden" name="dnb-state" />
      <input type="hidden" name="dnb-postal" />
      <input type="hidden" name="dnb-country" />
      <input type="hidden" name="dnb-naicsCode" />
      <input type="hidden" name="dnb-naicsDescription" />
      <input type="hidden" name="dnb-sicCode" />
      <input type="hidden" name="dnb-sicDescription" />
      <input type="hidden" name="dnb-revenue" />
      <input type="hidden" name="dnb-employeeSiteCount" />
      <input type="hidden" name="dnb-vanityTitle" />
      <input type="hidden" name="dnb-globalUltimateDuns" />
      <input type="hidden" name="dnb-globalUltimatePrimaryName" />
      <input type="hidden" name="dnb-domesticUltimateDuns" />
      <input type="hidden" name="dnb-domesticUltimatePrimaryName" />
      <input type="hidden" name="dnb-parentDuns" />
      <input type="hidden" name="dnb-parentPrimaryName" />
      <input type="hidden" name="dnb-globalUltimateFamilyTreeMembersCount" />
      <input type="hidden" name="dnb-phoneField" />
      <input type="hidden" name="dnb-telephoneNumber" />
      <input type="hidden" name="dnb-domain" />
      <input type="hidden" name="dnb-tradeStyleName" />
      <input type="hidden" name="dnb-currency" />
    </div>
  ));

  static GetHiddenFieldsData(container) {
    if (!container) return {};

    const fields = Array.from(container.querySelectorAll('input'));

    return fields.reduce((data, field) => {
      if (!field.value) return data;

      const key = PARDOT_MAPPINGS[field.name] || field.name;

      return { ...data, [key]: field.value };
    }, {});
  }
}
