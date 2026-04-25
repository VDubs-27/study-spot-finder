import { useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import { Paper, Title } from '@mantine/core';
import classes from './Demo.module.css';
import Autoplay from 'embla-carousel-autoplay';

const data = [
  {
    image:
      'src/assets/library.jpg',
    title: 'Want quiet? These libraries are the best',
  },
  {
    image:
      'src/assets/group.jpg',
    title: 'Need to talk? Find spaces for discussion',
  },
  {
    image:
      'src/assets/outdoor.jpg',
    title: 'Need some air? Go study outside',
  },
];

function Card({ image, title }) {
  return (
    <Paper
      shadow="md"
      p="xl"
      style={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
    </Paper>
  );
}

export default function CarouselDemo() {
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize="100%"
      slideGap="xs"
      emblaOptions={{ align: 'start', slidesToScroll: 1 }}
      withIndicators
      // eslint-disable-next-line react-hooks/refs
      plugins={[autoplay.current]}
      // eslint-disable-next-line react-hooks/refs
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={() => autoplay.current.play()}
      loop
      className="w-5/8 max-w-5xl"
    >
      {slides}
    </Carousel>
  );
}