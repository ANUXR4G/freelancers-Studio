import clsx from 'clsx';
import { forwardRef } from 'react';

const Language = forwardRef<
  HTMLDivElement,
  { isDark?: boolean; className?: string; onClick?: () => void }
>(({ isDark, className, onClick }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('p3', isDark ? 'text-yellow' : 'text-blue', className)}
      onClick={onClick}
    ></div>
  );
});

Language.displayName = 'Language';

export default Language;
