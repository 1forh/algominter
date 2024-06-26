import React from 'react';
import toast from 'react-hot-toast';
import { useMutation as tanMutation, UseMutationOptions } from '@tanstack/react-query';
import { randomId } from 'lib/helpers';

type Options = Omit<UseMutationOptions, 'mutationFn'> & {
  url: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
  showToast?: boolean;
  successMessage?: string;
};

export default function useMutation({ url, method, showToast = true, successMessage, onError, onSuccess, onSettled, onMutate, ...options }: Options) {
  return tanMutation({
    mutationFn: async (data?: any) => {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      let json: any = {};
      try {
        json = await res.json();
      } catch (error) { }
      if (!res.ok) {
        if (res.status === 404) throw new Error('Route not found');
        if (res.status === 405) throw new Error('Method not allowed');
        if (res.status === 504) throw new Error('Operation timed out. Please try again.');
        throw new Error(json.message || 'An error ocurred');
      }

      return json;
    },
    onError: (err: any, variables, context) => {
      if (onError) onError(err, variables, context);
    },
    onSuccess: (data, variables, context) => {
      if (onSuccess) onSuccess(data, variables, context);
    },
    onMutate: (variables) => {
      if (onMutate) onMutate(variables);
    },
    onSettled: (data, error, variables, context) => {
      if (onSettled) onSettled(data, error, variables, context);
    },
    ...options,
  });
}
