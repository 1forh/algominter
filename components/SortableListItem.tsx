import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';

type Props = {
  id: string;
  dragDisabled?: boolean;
  children: React.ReactNode;
  className?: string;
};

const SortableListItem = ({ id, children, dragDisabled, className }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className={clsx(className, isDragging && 'relative z-50')}>
      <div className='flex gap-3 w-full'>
        {!dragDisabled && (
          <button type='button' {...listeners} {...attributes}>
            <span className='sr-only'>Drag and sort</span>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 512' className='w-4 h-4 text-white/50'>
              <path d='M0 96C0 69.49 21.49 48 48 48C74.51 48 96 69.49 96 96C96 122.5 74.51 144 48 144C21.49 144 0 122.5 0 96zM0 256C0 229.5 21.49 208 48 208C74.51 208 96 229.5 96 256C96 282.5 74.51 304 48 304C21.49 304 0 282.5 0 256zM96 416C96 442.5 74.51 464 48 464C21.49 464 0 442.5 0 416C0 389.5 21.49 368 48 368C74.51 368 96 389.5 96 416zM160 96C160 69.49 181.5 48 208 48C234.5 48 256 69.49 256 96C256 122.5 234.5 144 208 144C181.5 144 160 122.5 160 96zM256 256C256 282.5 234.5 304 208 304C181.5 304 160 282.5 160 256C160 229.5 181.5 208 208 208C234.5 208 256 229.5 256 256zM160 416C160 389.5 181.5 368 208 368C234.5 368 256 389.5 256 416C256 442.5 234.5 464 208 464C181.5 464 160 442.5 160 416z' fill="currentColor" />
            </svg>
          </button>
        )}
        <div className='w-full'>{children}</div>
      </div>
    </div>
  );
};

export default SortableListItem;