export const rowTitleMap = {
  collaborationTab: 'Potential Partners',
  potentialPartnerTab: 'Partnerships',
};

function prepareRowListItem(rowRenderList) {
  if (rowRenderList.length === 0) {
    return null;
  }

  const numberOfItemsInRow = 7;

  return {
    id: rowRenderList[0].id,
    type: 'list',
    item: rowRenderList.slice(0, numberOfItemsInRow),
  };
}

export function prepareList(
  collaborationList,
  potentialPartnersList,
  listType,
) {
  const collaborationRenderList = collaborationList.map((collaboration) => {
    return {
      id: collaboration._id,
      type: 'collaboration',
      item: collaboration,
    };
  });

  const potentialPartnerRenderList = potentialPartnersList.map(
    (potentialPartner) => {
      return {
        id: potentialPartner._id,
        type: 'potentialPartner',
        item: potentialPartner,
      };
    },
  );

  const isSelectedCollaboration = listType === 'collaborationTab';

  const mainRenderList = isSelectedCollaboration
    ? collaborationRenderList
    : potentialPartnerRenderList;
  const secondaryRenderList = isSelectedCollaboration
    ? potentialPartnerRenderList
    : collaborationRenderList;

  const rowItem = prepareRowListItem(secondaryRenderList);

  const renderList = [];

  if (mainRenderList.length === 0) {
    const type = isSelectedCollaboration
      ? 'emptyCollaboration'
      : 'emptyPotentialPartner';

    renderList.push({
      id: type,
      type,
      item: null,
    });

    if (rowItem) {
      renderList.push(rowItem);
    }
  } else {
    const numberOfItemsBeforeRow = 3;

    const firstMainList = mainRenderList.slice(0, numberOfItemsBeforeRow);
    const secondMainList = mainRenderList.slice(numberOfItemsBeforeRow);

    renderList.push(...firstMainList);

    if (rowItem) {
      renderList.push(rowItem);
    }

    if (secondMainList.length > 0) {
      renderList.push(...secondMainList);
    }
  }

  return renderList;
}
