import axios from 'src/axios';

const defaultReviewPopulate = [
  'collaboration',
  'collaboration.photo',
  'recommendation[photo]',
  'admin',
  'author',
  'author.avatar',
];

class CollaborationReviewApi {
  async getCollaborationReviewList({
    page,
    limit,
    status,
    populate = ['collaboration', 'admin', 'author'],
  }) {
    const result = await axios({
      url: '/reviews',
      method: 'GET',
      params: {
        page,
        limit,
        status,
        populate,
      },
    });

    return result.data;
  }

  async getCollaborationReview(id) {
    const result = await axios({
      url: `/reviews/${id}`,
      method: 'GET',
      params: {
        populate: defaultReviewPopulate,
      },
    });

    return result.data;
  }

  async submitCollaborationReview(id) {
    const result = await axios({
      url: `/reviews/${id}/submit`,
      method: 'POST',
    });

    return result.data;
  }
}

export const collaborationReviewApi = new CollaborationReviewApi();
