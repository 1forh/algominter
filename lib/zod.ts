import { z } from 'zod';
import { ProjectSchemaT, UserSchemaT } from './types';

export const Project: ProjectSchemaT = {
  id: z.number().optional(),
  owner: z.string().optional(),
  name: z.string(),
  description: z.string(),
  website: z.string(),
  unitName: z.string(),
  size: z.number(),
  imageWidth: z.number(),
  imageHeight: z.number(),
  layers: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      traits: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          size: z.number(),
          type: z.string(),
          data: z.any(),
          alternatives: z.array(z.any()),
          rarity: z.number(),
          sameAs: z.string().optional(),
          excludeTraitFromRandomGenerations: z.boolean(),
          rules: z.array(
            z.object({
              type: z.string(),
              layer: z.string(),
              trait: z.string(),
            })
          ),
        })
      ),
      sameAs: z.string().optional(),
      excludeFromMetadata: z.boolean(),
    })
  ),
  previewItems: z.array(
    z.object({
      index: z.number(),
      traits: z.object({
        // @ts-ignore
        [z.string()]: z.object({
          id: z.string(),
          name: z.string(),
          size: z.number(),
          type: z.string(),
          data: z.any(),
          alternatives: z.array(z.any()),
          rarity: z.number(),
          sameAs: z.string().optional(),
          excludeTraitFromRandomGenerations: z.boolean(),
          rules: z.array(
            z.object({
              type: z.string(),
              layer: z.string(),
              trait: z.string(),
            })
          ),
        }),
      }),
    })
  ),
  customs: z.array(
    z.object({
      index: z.number(),
      traits: z.object({
        // @ts-ignore
        [z.string()]: z.object({
          id: z.string(),
          name: z.string(),
          size: z.number(),
          type: z.string(),
          data: z.any(),
          alternatives: z.array(z.any()),
          rarity: z.number(),
          sameAs: z.string().optional(),
          excludeTraitFromRandomGenerations: z.boolean(),
          rules: z.array(
            z.object({
              type: z.string(),
              layer: z.string(),
              trait: z.string(),
            })
          ),
        }),
      }),
    })
  ),
};
export const ProjectZ = z.object(Project);

export const User: UserSchemaT = {
  id: z.string(),
  address: z.string(),
  subscribedOn: z.date(),
};
export const UserZ = z.object(User);
