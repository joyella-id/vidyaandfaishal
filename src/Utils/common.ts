import { useEffect, useRef, useState } from "react";
import moment from "moment";

export function useWindowSize() {
  const isClient = typeof window === "object";
  const [windowSize, setWindowSize] = useState({
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined,
  });

  function handleResize() {
    setWindowSize({
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    });
  }

  useEffect(() => {
    if (!isClient) {
      console.error("no client");
    } else {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [isClient]);

  return windowSize;
}

export function useMobile() {
  return (useWindowSize()?.width || 0) <= 480;
}

export function useTablet() {
  return (useWindowSize()?.width || 0) <= 600;
}

export function useCustomScreenSize(size: number) {
  return (useWindowSize()?.width || 0) <= size;
}

export const useCheckOverflow = <T>() => {
  const elRef = useRef<HTMLElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (elRef.current) {
      var curOverflow = elRef.current.style.overflow;
      if (!curOverflow || curOverflow === "visible")
        elRef.current.style.overflow = "hidden";
      var isOverflowing =
        elRef.current.clientWidth < elRef.current.scrollWidth ||
        elRef.current.clientHeight < elRef.current.scrollHeight;
      elRef.current.style.overflow = curOverflow;
      setIsOverflowing(isOverflowing);
    }
  }, [elRef]);

  const newRef = elRef as React.RefObject<T>;

  return { ref: newRef, isOverflowing };
};

export const createDuration = (endDate: Date) => {
  const eventTime = moment(endDate).unix();
  const currentTime = moment().unix();
  const diffTime = eventTime - currentTime;
  if (!endDate) {
    return moment.duration(-1);
  }
  return moment.duration(diffTime * 1000);
};

type UserTimerParameter = {
  endDate: Date;
};

export const useTimer = ({ endDate }: UserTimerParameter) => {
  const currentDate = new Date();
  const newEndDate = endDate || currentDate;
  const [timeLeft, setTimeLeft] = useState(createDuration(newEndDate));

  useEffect(() => {
    if (timeLeft.asMilliseconds() >= 0 && newEndDate !== currentDate) {
      const timer = setTimeout(() => {
        setTimeLeft(createDuration(newEndDate));
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
    return () => {};
  });

  if (timeLeft.asMilliseconds() < 0) {
    return {
      ...timeLeft,
      asMilliseconds: () => {
        return 0;
      },
      asSeconds: () => {
        return 0;
      },
      hours: () => {
        return 0;
      },
      minutes: () => {
        return 0;
      },
      seconds: () => {
        return 0;
      },
    };
  }
  return timeLeft;
};

export function useDebounce(val: string, delay: number, callback?: () => void) {
  const [debouncedVal, setDebouncedVal] = useState(val);
  useEffect(() => {
    const timeOutHandler = setTimeout(() => {
      if (callback) {
        callback();
      }
      setDebouncedVal(val);
    }, delay);
    return () => clearTimeout(timeOutHandler);
  }, [delay, val]);

  if (typeof debouncedVal === "string") {
    return debouncedVal?.toLowerCase();
  }

  return debouncedVal;
}
