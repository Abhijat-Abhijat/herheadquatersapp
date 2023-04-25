export const states = [
  { label: 'Alabama', value: 'Alabama' },
  { label: 'Alaska', value: 'Alaska' },
  { label: 'Arizona', value: 'Arizona' },
  { label: 'Arkansas', value: 'Arkansas' },
  { label: 'California', value: 'California' },
  { label: 'Colorado', value: 'Colorado' },
  { label: 'Connecticut', value: 'Connecticut' },
  { label: 'Delaware', value: 'Delaware' },
  { label: 'Florida', value: 'Florida' },
  { label: 'Georgia', value: 'Georgia' },
  { label: 'Hawaii', value: 'Hawaii' },
  { label: 'Idaho', value: 'Idaho' },
  { label: 'Illinois', value: 'Illinois' },
  { label: 'Indiana', value: 'Indiana' },
  { label: 'Iowa', value: 'Iowa' },
  { label: 'Kansas', value: 'Kansas' },
  { label: 'Kentucky', value: 'Kentucky' },
  { label: 'Louisiana', value: 'Louisiana' },
  { label: 'Maine', value: 'Maine' },
  { label: 'Maryland', value: 'Maryland' },
  { label: 'Massachusetts', value: 'Massachusetts' },
  { label: 'Michigan', value: 'Michigan' },
  { label: 'Minnesota', value: 'Minnesota' },
  { label: 'Mississippi', value: 'Mississippi' },
  { label: 'Missouri', value: 'Missouri' },
  { label: 'Montana', value: 'Montana' },
  { label: 'Nebraska', value: 'Nebraska' },
  { label: 'Nevada', value: 'Nevada' },
  { label: 'New Hampshire', value: 'New Hampshire' },
  { label: 'New Jersey', value: 'New Jersey' },
  { label: 'New Mexico', value: 'New Mexico' },
  { label: 'New York', value: 'New York' },
  { label: 'North Carolina', value: 'North Carolina' },
  { label: 'North Dakota', value: 'North Dakota' },
  { label: 'Ohio', value: 'Ohio' },
  { label: 'Oklahoma', value: 'Oklahoma' },
  { label: 'Oregon', value: 'Oregon' },
  { label: 'Pennsylvania', value: 'Pennsylvania' },
  { label: 'Rhode Island', value: 'Rhode Island' },
  { label: 'South Carolina', value: 'South Carolina' },
  { label: 'South Dakota', value: 'South Dakota' },
  { label: 'Tennessee', value: 'Tennessee' },
  { label: 'Texas', value: 'Texas' },
  { label: 'Utah', value: 'Utah' },
  { label: 'Vermont', value: 'Vermont' },
  { label: 'Virginia', value: 'Virginia' },
  { label: 'Washington', value: 'Washington' },
  { label: 'West Virginia', value: 'West Virginia' },
  { label: 'Wisconsin', value: 'Wisconsin' },
  { label: 'Wyoming', value: 'Wyoming' }
];

export const businessType = [
  { label: 'Service', value: 'Service' },
  { label: 'Product', value: 'Product' },
];

export const collaborationTypeOptions = [
  { label: 'Project', value: 'Project' },
  { label: 'Event', value: 'Event' },
  { label: 'Campaign', value: 'Campaign' },
];

export const industryList = [
  { value: 'Fashion', label: 'Fashion', field: 'fashion' },
  { value: 'Beauty', label: 'Beauty', field: 'beauty' },
  { value: 'Entertainment', label: 'Entertainment', field: 'entertainment' },
  { value: 'Events', label: 'Events', field: 'events' },
  { value: 'PR', label: 'PR', field: 'pr' },
  { value: 'Tech', label: 'Tech', field: 'tech' },
  {
    value: 'Photo/Video',
    label: 'Photography/Videography',
    field: 'photoVideo',
  },
  { value: 'Marketing', label: 'Marketing', field: 'marketing' },
  { value: 'Lifestyle', label: 'Lifestyle', field: 'lifestyle' },
  {
    value: 'Design & Creative',
    label: 'Design & Creative',
    field: 'designCreative',
  },
  {
    value: 'Website & Mobile Development',
    label: 'Website & Mobile Development',
    field: 'websiteMobileDevelopment',
  },
  {
    value: 'Health & Wellness',
    label: 'Health & Wellness',
    field: 'healthWellness',
  },
  { value: 'Food & Beverage', label: 'Food & Beverage', field: 'foodBeverage' },
  { value: 'Restaurant', label: 'Restaurant', field: 'restaurant' },
  {
    value: 'Business Services',
    label: 'Business Services',
    field: 'businessServices',
  },
  { value: 'Wine & Spirits', label: 'Wine & Spirits', field: 'wineSpirits' },
];

export const industryOptionList = industryList.map((industry) => {
  return {
    value: industry.value,
    label: industry.label,
  };
});

export const cities = [
  { value: 'Atlanta', label: 'Atlanta, GA' },
  { value: 'Austin', label: 'Austin, TX' },
  { value: 'Charlotte', label: 'Charlotte, NC' },
  { value: 'Chicago', label: 'Chicago, IL' },
  { value: 'Dallas', label: 'Dallas, TX' },
  { value: 'Denver', label: 'Denver, CO' },
  { value: 'Houston', label: 'Houston, TX' },
  { value: 'Los Angeles', label: 'Los Angeles, CA' },
  { value: 'Miami', label: 'Miami, FL' },
  { value: 'New York City', label: 'New York City, NY' },
  { value: 'Omaha', label: 'Omaha, NE' },
  { value: 'Philadelphia', label: 'Philadelphia, PA' },
  { value: 'San Francisco', label: 'San Francisco, CA' },
  { value: 'Seattle', label: 'Seattle, WA' },
  { value: 'Tampa', label: 'Tampa, FL' },
  { value: 'U.S. city', label: 'Other U.S. city' },
  { value: 'other', label: 'Outside the U.S' },
];

export const companyRoles = [
  { value: 'CEO', label: 'CEO' },
  { value: 'Founder', label: 'Founder' },
  { value: 'Owner', label: 'Owner' },
  { value: 'Chief Marketing Officer', label: 'Chief Marketing Officer' },
  { value: 'Marketing Director', label: 'Marketing Director' },
  { value: 'Head of Partnerships', label: 'Head of Partnerships' },
  { value: 'Marketing Coordinator', label: 'Marketing Coordinator' },
  { value: 'Publicist', label: 'Publicist' },
  { value: 'Manager', label: 'Manager' },
  { value: 'Associate', label: 'Associate' },
  { value: 'Contractor', label: 'Contractor' },
];

export const attachmentType = {
  library: 'library',
  camera: 'camera',
  file: 'file',
};

export const imageTypes = ['image/gif', 'image/jpeg', 'image/png'];

export const videoTypes = [
  'video/x-flv',
  'video/mp4',
  'application/x-mpegURL',
  'video/MP2T',
  'video/3gpp',
  'video/quicktime',
  'video/x-msvideo',
  'video/x-ms-wmv',
];

export const androidVideoTypes = ['video/mp4', 'video/3gpp'];

export const perks = [
  {
    value: 'Paid Partnership',
    label: 'Paid Partnership',
  },
  {
    value: 'Social Media Promotion',
    label: 'Social Media Promotion',
  },
  {
    value: 'Press Coverage',
    label: 'Press Coverage',
  },
  {
    value: 'Discounts and Special Offers',
    label: 'Discounts and Special Offers',
  },
  {
    value: 'Free Product',
    label: 'Free Product',
  },
  {
    value: 'Free services',
    label: 'Free services',
  },
  {
    value: 'Sponsorship Placement',
    label: 'Sponsorship Placement',
  },
];
