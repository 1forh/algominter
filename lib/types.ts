import { IconName } from '@/components/Icon';

export type KeyValueT = {
  [key: string]: any;
};

export type NavItemT = {
  label: string;
  href?: string;
  icon?: IconName;
  children?: NavItemT[];
  disabled?: boolean;
};

// * Algo Types
export type Network = 'MainNet' | 'TestNet' | 'BetaNet';

export type AssetFromIndexerT = {
  amount: number;
  'asset-id': number;
  deleted: boolean;
  'is-frozen': boolean;
  'opted-in-at-round': number;
};

export type AssetT = {
  'created-at-round': number;
  deleted: boolean;
  index: number;
  params: {
    clawback: string;
    creator: string;
    decimals: number;
    'default-frozen': boolean;
    freeze: string;
    manager: string;
    name: string;
    'name-b64': string;
    reserve: string;
    total: number;
    'unit-name': string;
    'unit-name-b64': string;
    url: string;
    'url-b64': string;
  };
};

export type NftMetadataT = {
  // TODO: define type
  metadata: MetadataT;
};

export type MetadataT = {
  properties: {
    [key: string]: string;
  };
};

export type ProjectT = {
  id?: number;
  owner?: string; // wallet address
  name: string;
  unitName: string;
  description: string;
  website: string;
  size: number;
  imageWidth: number;
  imageHeight: number;
  layers: LayerT[];
  customs: PreviewItemT[];
  previewItems: PreviewItemT[];
};
export type ProjectSchemaT = Record<keyof ProjectT, any>;

export type LayerT = {
  id: string;
  name: string;
  traits: TraitT[];
  sameAs?: string;
  excludeFromMetadata: boolean;
};

export type TraitT = {
  id: string;
  name: string;
  size: number;
  type: string;
  data: any; // TODO: define type
  alternatives: any[]; // TODO: define type
  rarity: number;
  rarityType: string;
  sameAs?: string;
  excludeTraitFromRandomGenerations: boolean;
  rules: RuleT[];
};

export type RuleT = {
  type: 'force' | 'block';
  layer: string;
  trait: string;
};

export type PreviewItemT = {
  index: number;
  id: string;
  traits: {
    [key: string]: {
      layerId: string;
      traitId: string;
      trait_type: string;
      value: string;
      image: any;
      excludeFromMetadata: boolean;
    };
  };
  rating: number;
  ranking: number;
};

// * API TYPES
export type UserT = {
  id: string;
  address: string;
  subscribedOn: Date;
};
export type UserSchemaT = Record<keyof UserT, any>;
