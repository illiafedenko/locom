import {GOOGLE_REVIEW_BASE_URL} from '@env';

// Function to get google reviews
export const getReviews = async (accountId, locationId, token) => {
  try {
    const res = await fetch(
      `${GOOGLE_REVIEW_BASE_URL}/accounts/${accountId}/locations/${locationId}/reviews`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Fill your token
        },
      },
    );
    return res;
  } catch (error) {
    console.log('ERR:', error);
    return false;
  }
};

// Function to get specific google review
export const getSpecificReview = async (accountId, locationId, reviewId, token) => {
  try {
    const res = await fetch(
      `${GOOGLE_REVIEW_BASE_URL}/accounts/${accountId}/locations/${locationId}/reviews/${reviewId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Fill your token
        },
      },
    );
    return res;
  } catch (error) {
    console.log('ERR:', error);
    return false;
  }
};

// Function to reply to specific google review
export const putReview = async (accountId, locationId, reviewId, comment, token) => {
  try {
    const res = await fetch(
      `${GOOGLE_REVIEW_BASE_URL}/accounts/${accountId}/locations/${locationId}/reviews/${reviewId}/reply`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Fill your token
        },
        body: {
          comment,
        },
      },
    );
    return res;
  } catch (error) {
    console.log('ERR:', error);
    return false;
  }
};

// Function to delete reply to specific google review
export const deleteReply = async (accountId, locationId, reviewId, token) => {
  try {
    const res = await fetch(
      `${GOOGLE_REVIEW_BASE_URL}/accounts/${accountId}/locations/${locationId}/reviews/${reviewId}/reply`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Fill your token
        },
      },
    );
    return res;
  } catch (error) {
    console.log('ERR:', error);
    return false;
  }
};
