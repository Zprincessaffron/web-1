import { useEffect } from 'react';
import { scroller } from 'react-scroll';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

  useEffect(() => {
    scroller.scrollTo('top', {
      duration: 200,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
