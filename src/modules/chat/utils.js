import { formatCollaborationDateToFull } from '../../actions/utils';

export function formatFirstMessage(message) {
  const {
    title,
    type,
    startDate: rawStartDate,
    endDate: rawEndDate,
    location,
    description,
  } = message;

  const startDate = formatCollaborationDateToFull(rawStartDate);
  const endDate = formatCollaborationDateToFull(rawEndDate);

  return `I'd like to discuss collaborating with you!
Title: ${title}
Type: ${type}
Dates: ${startDate} - ${endDate}
Location: ${location}
Details: ${description}`;
}
