import { allCollaborationReviewStatusList } from 'src/modules/collaborationReview/collaborationReview.enum';

export function getCollaborationReviewStatusLabel(status) {
  const statusObj = allCollaborationReviewStatusList.find(
    (colReview) => colReview.value === status,
  );

  if (!statusObj) {
    return 'Unknown';
  }

  return statusObj.label;
}
