export const filterLabels = [
  {
    name: 'members',
    label: 'Members',
    type: 'number'
  },
  {
    name: 'companies',
    label: 'Companies',
    type: 'number'
  },
  {
    name: 'completion',
    label: 'Completion Percentage',
    type: 'number',
    values: [0, 100]
  },
  {
    name: 'position_name',
    label: 'Department',
    type: 'text'
  },
  {
    name: 'company_name',
    label: 'Company',
    type: 'text'
  },
  {
    name: 'first_name',
    label: 'Name',
    type: 'text'
  },
]

export const convertDataToFilters = (propData) => {
  if (typeof propData !== 'undefined') {
    const allowedFilters = filterLabels.filter((d) => Object.keys(propData).indexOf(d.name) !== -1);
    if (allowedFilters.length) {
      return allowedFilters;
    } else {
      return null;
    }
  } else {
    return null;
  }
}
