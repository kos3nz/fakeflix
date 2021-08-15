import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import RowPoster from 'components/poster/row-poster';
import { useViewport, useSwiperRef } from 'hooks';

/* Swiper */
SwiperCore.use([Pagination, Navigation]);

const RowSwiper = ({ movies, isLarge }) => {
  const { width } = useViewport();
  const [prevEl, prevElRef] = useSwiperRef();
  const [nextEl, nextElRef] = useSwiperRef();

  const groupNum =
    width >= 1650
      ? 6
      : width >= 1350
      ? 5
      : width >= 1024
      ? 4
      : width >= 640
      ? 3
      : 2;

  const swiperProps = {
    spaceBetween: 8,
    breakpoints: {
      1650: { slidesPerView: 6, slidesPerGroup: 6 },
      1350: { slidesPerView: 5, slidesPerGroup: 5 },
      1024: { slidesPerView: 4, slidesPerGroup: 4 },
      640: { slidesPerView: 3, slidesPerGroup: 3 },
      0: { slidesPerView: 2, slidesPerGroup: 2 },
    },
    grabCursor: false,
    freeMode: true,
    freeModeSticky: true,
    preventClicksPropagation: true,
    preventClicks: true,
    slideToClickedSlide: false,
    allowTouchMove: true,
    loop: false,
    navigation: {
      prevEl,
      nextEl,
    },
    pagination: { clickable: true },
    onSlideChangeTransitionEnd: (swiper) => {
      // console.log('onSlideChangeTransitionEnd fired');
      // console.log(swiper);
      const activeIndex = swiper.activeIndex;
      const slides = swiper.slides;
      const visibleSliders = slides.slice(activeIndex, activeIndex + groupNum);
      visibleSliders.forEach((element, i, arr) => {
        element.classList.remove('left', 'right', 'center');
        if (i === 0) element.classList.add('left');
        else if (i === arr.length - 1) element.classList.add('right');
        else element.classList.add('center');
      });
    },
    draggable: false,
    // observer: true,
    // observeParents: true,
    // touchRatio: 0.03,
    // onSwiper: (swiper) => setSwiperInstance(swiper),
    // ↓ use case
    // const[swiperInstance, setSwiperInstance] = useState(null)
    // const slideTo = (index) => {
    // if (!swiperInstance) return;
    // swiperInstance.slideTo(index);
    // };
  };

  const insertPosClassName = (i) => {
    const index = i + 1;

    if (index === 1) return 'left';
    else if (index === groupNum) return 'right';
    else return 'center';
  };

  const onMouseOver = (e) => {
    // e.currentTarget === 'swiper-slide', e.currentTarget.parentElement === 'swiper-wrapper
    if (e.currentTarget.classList.contains('left'))
      e.currentTarget.parentElement.classList.add('is-left');
    else if (e.currentTarget.classList.contains('right'))
      e.currentTarget.parentElement.classList.add('is-right');
    else e.currentTarget.parentElement.classList.add('is-center');
  };

  const onMouseLeave = (e) => {
    e.currentTarget.parentElement.classList.remove(
      'is-left',
      'is-right',
      'is-center'
    );
  };

  return (
    <div className="relative flex row">
      <div ref={prevElRef} className="swiper-button prev">
        <FiChevronLeft />
      </div>
      <div ref={nextElRef} className="swiper-button next">
        <FiChevronRight />
      </div>
      <Swiper {...swiperProps}>
        {movies.map((movie, i) => {
          return (
            <SwiperSlide
              key={i}
              className={insertPosClassName(i)}
              onMouseOver={onMouseOver}
              onMouseLeave={onMouseLeave}
            >
              <RowPoster key={movie.title} movie={movie} isLarge={isLarge} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default RowSwiper;
