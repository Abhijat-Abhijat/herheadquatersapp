import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import * as linkify from 'linkifyjs';
import LinkPreview from 'react-native-link-preview';
// services
import { openLink } from './actions/utils';

const styles = StyleSheet.create({
  messageText: {
    lineHeight: 18,
    letterSpacing: 0,
    fontSize: 15,
  },
  link: {
    color: '#02BAC2',
    textDecorationLine: 'underline',
  },
});

const parseLinkInText = (text, link, key) => {
  const startIndexLink = text.indexOf(link.value);
  const endIndexLink = startIndexLink + link.value.length;
  const textBeforeLink = text.slice(0, startIndexLink);
  const textAfterLink = text.slice(endIndexLink, text.length);

  return {
    parts: [
      textBeforeLink,
      <Text
        key={key}
        onPress={() => openLink(link.href)}
        style={[styles.messageText, styles.link]}
      >
        {link.value}
      </Text>,
    ],
    textAfterLink,
  };
};

export const useLinkDetectionInText = (text) => {
  const [parts, setParts] = useState([]);
  const [firstLink, setFirstLink] = useState({});
  const [meta, setMeta] = useState({});

  useEffect(() => {
    const links = linkify.find(text, 'url');
    let currentParts = [];
    let currentText = text;

    links.forEach((link, index) => {
      const { parts: newParts, textAfterLink } = parseLinkInText(
        currentText,
        link,
        index,
      );

      currentText = textAfterLink;

      currentParts = [...currentParts, ...newParts];
    });

    setParts([...currentParts, currentText]);
    const firstLink = links.length ? links[0] : {};
    setFirstLink(firstLink);

    const getPreviewOfLink = async () => {
      if (firstLink.value) {
        const { title, description } = await LinkPreview.getPreview(
          firstLink.href,
        );

        setMeta({
          title,
          description,
        });
      }
    };

    getPreviewOfLink();
  }, [text]);

  return [
    <Text style={styles.messageText}>{parts}</Text>,
    {
      type: 'url',
      src: firstLink.href,
      displayName: firstLink.value,
      extra: meta,
    },
  ];
};
