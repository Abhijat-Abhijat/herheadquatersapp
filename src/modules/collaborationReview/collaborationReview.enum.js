export const collaborationReviewStatusMap = {
  wait: {
    value: 'wait',
    label: 'Waiting for Review',
  },
  reviewed: {
    value: 'reviewed',
    label: 'Reviewed',
  },
  closed: {
    value: 'closed',
    label: 'Closed',
  },
};

export const allCollaborationReviewStatusList = [
  collaborationReviewStatusMap.wait,
  collaborationReviewStatusMap.reviewed,
  collaborationReviewStatusMap.closed,
];
