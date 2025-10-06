import { useEffect, useState } from 'react';
import clsx from 'clsx';
import SafeNumberFlow from './SafeNumberFlow';

export const numberFormat = { notation: 'compact', minimumIntegerDigits: 2 };

const useISTTime = () => {
  const [time, setTime] = useState({
    hours: '00',
    minutes: '00',
    period: 'AM',
  });

  useEffect(() => {
    const updateTime = () => {
      // Get current time in IST (UTC+5:30)
      const now = new Date();
      const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      
      let hours = istTime.getHours();
      const minutes = istTime.getMinutes();
      const period = hours >= 12 ? 'PM' : 'AM';
      
      // Convert to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 should be 12
      
      setTime({
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        period,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
};

const Time = ({ isDark = false, className }: { isDark?: boolean; className?: string }) => {
  const { hours, minutes, period } = useISTTime();

  return (
    <p className={clsx(isDark ? 'text-white' : 'text-black', className)}>
      <span>{hours}</span>
      :
      <span>{minutes}</span>
      <span className={clsx('uppercase ml-1', isDark ? 'text-white-30' : 'text-black-30')}>
        {period}
      </span>
    </p>
  );
};

export default Time;
