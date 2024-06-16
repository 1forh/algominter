import Icon from '@/components/Icon';
import { FREE_PLAN_MAX_TRAITS } from '@/config';
import { cn } from '@/lib/cn';
import { useProject } from '@/providers/ProjectProvider';
import Uppy from '@uppy/core';
import '@uppy/core/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import { DragDrop } from '@uppy/react';
import '@uppy/status-bar/dist/style.css';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

type Props = {
  name: string;
  limit?: number;
  fileTypes?: string[];
  disabled?: boolean;
};

function createUppy(id: string) {
  return new Uppy({
    id,
    autoProceed: true,
    locale: {
      strings: {
        // Text to show on the droppable area.
        // `%{browse}` is replaced with a link that opens the system file selection dialog.
        dropHereOr: '%{browse} or drag and drop',
        // Used as the label for the link that opens the system file selection dialog.
        browse: 'Upload Files',
      },
    },
    // @ts-ignore
    note: 'image/png, image/jpeg, image/gif up to 10MB',
    restrictions: {
      allowedFileTypes: ['image/*'],
    },
  });
}

const FileUpload = ({ name, limit, fileTypes, disabled }: Props) => {
  const form = useFormContext();
  const { formatTrait, resetOriginalProject } = useProject();
  const { append, update } = useFieldArray({
    control: form.control,
    name: name,
  });

  const uppy = React.useMemo(() => createUppy(name || 'uppy'), [name]);
  const [uploading, setUploading] = React.useState(false);
  const isInitialized = React.useRef(false);

  React.useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;
    uppy.setOptions({
      restrictions: {
        allowedFileTypes: fileTypes || ['image/*'],
      },
    });

    uppy.on('files-added', (files) => {
      if (disabled) {
        toast.error(`You need to upgrade to a paid plan to upload more than ${FREE_PLAN_MAX_TRAITS} traits.`);
        uppy.cancelAll({ reason: 'user' });
        return;
      }
      setUploading(true);

      const filesFromForm = form.getValues(name);

      files.forEach((file) => {
        const formattedFile = formatTrait(file);
        // @ts-ignore
        const existingFileIndex = filesFromForm.findIndex((field) => field.name === formattedFile.name);

        if (existingFileIndex !== -1) {
          // File with the same name exists, update its data property
          filesFromForm[existingFileIndex].data = formattedFile.data;
          update(existingFileIndex, filesFromForm[existingFileIndex]);
        } else {
          // File does not exist, append it
          append(formattedFile);
        }
      });

      toast.success(`${files.length} traits added`);

      setUploading(false);

      resetOriginalProject();

      // Reset uppy so the same file can be uploaded again if removed and re-added
      uppy.cancelAll({ reason: 'user' });
    });
  }, [limit, fileTypes]);

  return (
    <div
      className={cn('relative', {
        'pointer-events-none opacity-50': disabled,
      })}
    >
      {!uploading && <DragDrop uppy={uppy} />}
      {uploading && (
        <div className='flex h-[120px] w-full items-center justify-center rounded-lg border-2 border-dashed border-white/50 text-lg font-bold'>
          <Icon name='spinner' className='animate-spin text-3xl text-gray-500' />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
