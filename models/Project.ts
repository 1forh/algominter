import { ProjectSchemaT, ProjectT } from 'lib/types';
import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const fields: ProjectSchemaT = {
  id: Number,
  owner: String,
  name: String,
  description: String,
  website: String,
  unitName: String,
  size: Number,
  imageWidth: Number,
  imageHeight: Number,
  layers: [
    {
      id: String,
      name: String,
      traits: [
        {
          id: String,
          name: String,
          size: Number,
          type: String,
          data: mongoose.Schema.Types.Mixed,
          alternatives: [mongoose.Schema.Types.Mixed],
          rarity: Number,
          sameAs: String,
          excludeTraitFromRandomGenerations: Boolean,
          rules: [
            {
              type: String,
              layer: String,
              trait: String,
            },
          ],
        },
      ],
      sameAs: String,
      excludeFromMetadata: Boolean,
    },
  ],
  previewItems: [
    {
      index: Number,
      traits: {
        // @ts-ignore
        [String]: {
          id: String,
          name: String,
          size: Number,
          type: String,
          data: mongoose.Schema.Types.Mixed,
          alternatives: [mongoose.Schema.Types.Mixed],
          rarity: Number,
          sameAs: String,
          excludeTraitFromRandomGenerations: Boolean,
          rules: [
            {
              type: String,
              layer: String,
              trait: String,
            },
          ],
        },
      },
    },
  ],
  customs: [
    {
      index: Number,
      traits: {
        // @ts-ignore
        [String]: {
          id: String,
          name: String,
          size: Number,
          type: String,
          data: mongoose.Schema.Types.Mixed,
          alternatives: [mongoose.Schema.Types.Mixed],
          rarity: Number,
          sameAs: String,
          excludeTraitFromRandomGenerations: Boolean,
          rules: [
            {
              type: String,
              layer: String,
              trait: String,
            },
          ],
        },
      },
    },
  ],
};

const ProjectSchema = new Schema(fields, {
  timestamps: true,
});

const Project = models?.Project || model('Project', ProjectSchema);

export default Project as mongoose.Model<ProjectT>;
