import React from 'react';
import { View } from 'react-native';
// components
import PhotoField from 'src/components/Fields/PhotoField';
import TextField from 'src/components/Fields/TextField';
import ArrayField from 'src/modules/collaborationReview/components/CollaborationReviewForm/ArrayField';

export const fieldStatusMap = {
  UNDETERMINED: 'undetermined',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
};

export const fieldTypeMap = {
  TEXT: 'text',
  ARRAY: 'array',
  IMAGE: 'image',
};

export function getComponentByType(type) {
  switch (type) {
    case fieldTypeMap.TEXT: {
      return TextField;
    }

    case fieldTypeMap.IMAGE: {
      return PhotoField;
    }

    case fieldTypeMap.ARRAY: {
      return ArrayField;
    }

    default: {
      return null;
    }
  }
}

export function getDefaultPropsByType(type) {
  switch (type) {
    case fieldTypeMap.TEXT: {
      return {
        inputProps: {
          editable: false,
        },
      };
    }

    case fieldTypeMap.IMAGE: {
      return {
        standalone: true,
        imageStyle: {
          width: 97,
          height: 97,
        },
        imageContainerStyle: {
          width: 'auto',
          marginRight: 40,
          marginBottom: 0,
        },
        action: <View />,
      };
    }

    default: {
      return null;
    }
  }
}

export function getFieldDataLabel(type) {
  switch (type) {
    case fieldTypeMap.TEXT: {
      return 'text';
    }

    case fieldTypeMap.ARRAY: {
      return 'value';
    }

    case fieldTypeMap.IMAGE: {
      return 'image';
    }

    default: {
      return 'value';
    }
  }
}
