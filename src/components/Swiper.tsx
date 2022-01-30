import { MouseEventHandler, PropsWithChildren, useEffect, useRef } from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import {
  Swiper as SwiperContainer,
  SwiperProps,
  SwiperSlide,
} from 'swiper/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Poster } from 'components/Poster';
import { useViewport } from 'hooks';
import useSWR from 'swr';
import { axiosFetcher } from 'utils';
import { Genres, MediaType } from 'const/data.config';
import { TitleData } from 'const/request-url';

/* Swiper */
SwiperCore.use([Pagination, Navigation]);

export interface MySwiperProps {
  genre: Genres;
  type: MediaType;
}

export const Swiper = ({ genre, type }: MySwiperProps) => {
  const { data } = useSWR<{ results: TitleData[] }>(
    `/api/titles/${type}/${genre}`,
    axiosFetcher
  );
  const { width } = useViewport();
  const swiperRef = useRef<HTMLDivElement>(null);
  const prevEl = useRef<HTMLDivElement>(null);
  const nextEl = useRef<HTMLDivElement>(null);
  const isLarge = genre === 'originals' ? true : false;

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

  const swiperProps: SwiperProps = {
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
    preventClicksPropagation: true,
    preventClicks: true,
    slideToClickedSlide: false,
    allowTouchMove: true,
    loop: false,
    navigation: {
      prevEl: prevEl?.current,
      nextEl: nextEl?.current,
    },
    pagination: { clickable: true },
    onSlideChangeTransitionEnd: (swiper: SwiperCore) => {
      const activeIndex = swiper.activeIndex;
      const slides = swiper.slides;
      const visibleSliders = slides.slice(activeIndex, activeIndex + groupNum);
      visibleSliders.forEach((slide, i, arr) => {
        slide.classList.remove('left', 'right', 'center');
        if (i === 0) slide.classList.add('left');
        else if (i === arr.length - 1) slide.classList.add('right');
        else slide.classList.add('center');
      });
    },
    draggable: false,
  };

  const onMouseOver: MouseEventHandler<HTMLElement> = (e) => {
    // e.currentTarget === 'swiper-slide', e.currentTarget.parentElement === 'swiper-wrapper
    // NOTE: 初回render時のclassName設定で .swiper-slide-active, .swiper-slide-next クラスのある要素に何故か .left, .center が付かないのでその対処 ↓
    if (
      e.currentTarget.classList.contains('swiper-slide-active') ||
      e.currentTarget.classList.contains('left')
    )
      e.currentTarget.parentElement?.classList.add('is-left');
    else if (e.currentTarget.classList.contains('right'))
      e.currentTarget.parentElement?.classList.add('is-right');
    else e.currentTarget.parentElement?.classList.add('is-center');
  };

  const onMouseLeave: MouseEventHandler<HTMLElement> = (e) => {
    e.currentTarget.parentElement?.classList.remove(
      'is-left',
      'is-right',
      'is-center'
    );
  };

  const insertPosClassName = (i: number) => {
    const index = i + 1;

    if (index === 1) return 'left';
    else if (index === groupNum) return 'right';
    else return 'center';
  };

  // NOTE: slider componentに直接classNameを設定するとserver, clientでclassNameが食い違ってしまいエラーがでるため、componentがrender後にjavascriptでclassNameを追加する。
  useEffect(() => {
    // swiperRef.current.children = HTMLCollection [ swiper-button, swiper-button ,swiper ]
    // swiperRef.current.children[0].children = HTMLCollection [ swiper-pagination ,swiper-wrapper ]
    // swiperRef.current.children[0].children[1].children = swiper-slider
    // NOTE: childrenやchildNodesのままだとarray methodが使えないのでArray.fromでiterable objectに変更 (childNodesの場合はforEach methodは使える)
    if (swiperRef.current) {
      const visibleSlides = Array.from(
        swiperRef.current.children[2].children[1].children
      ).slice(0, groupNum);

      visibleSlides.forEach((slide, i) => {
        const pos = insertPosClassName(i);
        slide.classList.add(pos);
      });
    }
  }, [swiperRef, groupNum]);

  return (
    <div ref={swiperRef} className="relative flex row">
      <div ref={prevEl} className="swiper-button prev">
        <FiChevronLeft />
      </div>
      <div ref={nextEl} className="swiper-button next">
        <FiChevronRight />
      </div>
      <SwiperContainer {...swiperProps}>
        {data &&
          data.results.map((movie, i) => {
            return (
              <SwiperSlide
                key={i}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
              >
                <Poster key={movie.title} data={movie} isLarge={isLarge} />
              </SwiperSlide>
            );
          })}
      </SwiperContainer>
    </div>
  );
};
