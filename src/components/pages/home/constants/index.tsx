import {PSlickArrow} from 'components/primitives/p-slick-arrow';

// TODO: disable next and prev arrows
let disablePrev = false;
let disableNext = false;

export const getListingCarouselSettings = ({slidesToShow}: {slidesToShow: number}) => ({
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow,
  slidesToScroll: 1,
  draggable: false,
  nextArrow: <PSlickArrow disabled={disableNext} type="next" position="center" />,
  prevArrow: <PSlickArrow disabled={disablePrev} type="prev" position="center" />,
});
