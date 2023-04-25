import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
// components
import Section from 'src/components/Collaboration/Section';
import Icon from 'src/components/Icons/HerHeadquartersIcon';
// utils
import { openLink } from 'src/actions/utils';
// styles
import { styles, itemHorizontalMargin } from './ProfileInfoSlider.styled';

const renderData = {
  companyInfo: (profile) => {
    const socialLinksKeys = profile.socialLinks
      ? Object.keys(profile.socialLinks)
      : [];

    return (
      <Section title={'COMPANY INFO'} style={styles.slide}>
        <View style={styles.slideContent}>
          {profile.companyWebsite && (
            <View style={styles.website}>
              <TouchableWithoutFeedback
                onPress={() => openLink(profile.companyWebsite)}
              >
                <Text style={styles.linkText}>{profile.companyWebsite}</Text>
              </TouchableWithoutFeedback>
            </View>
          )}
          {socialLinksKeys.length > 0 && (
            <View style={styles.iconsContainer}>
              {socialLinksKeys.map((name, key) => (
                <TouchableWithoutFeedback
                  key={key}
                  onPress={() => openLink(profile.socialLinks[name])}
                >
                  <Icon
                    name={`logo-${name}`}
                    size={25}
                    color="#234A5D"
                    style={styles.icon}
                  />
                </TouchableWithoutFeedback>
              ))}
            </View>
          )}
          <Text>{profile.aboutCompany}</Text>
        </View>
      </Section>
    );
  },
  seeking: (profile) => (
    <Section title={'DREAM BRAND PARTNERSHIP'} style={styles.slide}>
      <View style={styles.slideContent}>
        <Text>{profile.seeking}</Text>
      </View>
    </Section>
  ),
  industry: (profile) => (
    <Section title={'INDUSTRY'} style={styles.slide}>
      <View style={styles.slideContent}>
        <Text>{profile.industry}</Text>
      </View>
    </Section>
  ),
};

const cards = ['companyInfo', 'seeking', 'industry'];

function ProfileInfoSlider(props) {
  const { profile, style } = props;

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const sliderRef = useRef(null);

  const { width: viewportWidth } = useWindowDimensions();

  const itemWidth = viewportWidth - itemHorizontalMargin * 2;

  const renderItem = useCallback(
    ({ item }) => {
      const renderFunction = renderData[item];

      return renderFunction ? renderFunction(profile) : null;
    },
    [profile],
  );

  return (
    <View style={[styles.container, style]}>
      <Carousel
        ref={sliderRef}
        data={cards}
        renderItem={renderItem}
        sliderWidth={viewportWidth}
        itemWidth={itemWidth}
        activeSlideAlignment={'center'}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        onSnapToItem={(index) => setActiveSlideIndex(index)}
        removeClippedSubviews={false}
      />
      <Pagination
        dotsLength={cards.length}
        activeDotIndex={activeSlideIndex}
        tappableDots={true}
        carouselRef={sliderRef}
        inactiveDotColor={'#A1A6A6'}
        inactiveDotScale={1}
        dotColor={'#02BAC2'}
        dotStyle={styles.paginationDot}
        animatedDuration={200}
      />
    </View>
  );
}

export default ProfileInfoSlider;
