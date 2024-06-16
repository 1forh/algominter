import { RarityType } from './enums';
import calculateNftRating from './nft-rating';
import { LayerT, PreviewItemT, TraitT } from './types';

export function addRatings(items: PreviewItemT[], allLayers: LayerT[]) {
  items.forEach((item) => {
    const formattedItem = {
      metadata: {
        properties: {},
      },
    };
    Object.values(item.traits).forEach((trait) => {
      if (trait.excludeFromMetadata) return;

      const layer = allLayers.find((l) => l.id === trait.layerId);
      const traitDetails = layer?.traits?.find((t) => t.name === trait.value);
      const sameAs = traitDetails?.sameAs;
      const sameAsDetails = layer?.traits?.find((t) => t.id === sameAs);
      if (sameAsDetails) {
        // @ts-ignore
        formattedItem.metadata.properties[trait.trait_type] = sameAsDetails.name;
      } else {
        // @ts-ignore
        formattedItem.metadata.properties[trait.trait_type] = trait.value;
      }
    });
    const formattedItems = items.map((item) => {
      const formattedItem = {
        metadata: {
          properties: {},
        },
      };
      Object.values(item.traits).forEach((trait) => {
        if (trait.excludeFromMetadata) return;
        // @ts-ignore
        const layer = allLayers.find((l) => l.id === trait.layerId);
        const traitDetails = layer?.traits?.find((t) => t.name === trait.value);
        const sameAs = traitDetails?.sameAs;
        const sameAsDetails = layer?.traits?.find((t) => t.id === sameAs);
        if (sameAsDetails) {
          // @ts-ignore
          formattedItem.metadata.properties[trait.trait_type] = sameAsDetails.name;
        } else {
          // @ts-ignore
          formattedItem.metadata.properties[trait.trait_type] = trait.value;
        }
      });
      return formattedItem;
    });
    const rating = calculateNftRating(formattedItem, formattedItems);
    item.rating = rating;
  });
}

export function addRankings(items: PreviewItemT[]) {
  const sortedItems = [...items].sort((a, b) => b.rating - a.rating);
  sortedItems.forEach((item, index) => {
    item.ranking = index + 1;
  });
}

export function getTraitsFromTraitStore(traitStore: { [key: string]: string[] }, layer: LayerT) {
  const availableTraitNames = traitStore[layer.name];
  const availableTraits = availableTraitNames.map((name) => layer.traits.find((f) => f.name === name)!);
  return availableTraits;
}

export function createTraitStore(layers: LayerT[], size: number) {
  const traitStore: { [key: string]: string[] } = {};

  for (const layer of layers) {
    const availableTraits = layer.traits.filter((trait) => !trait.sameAs && trait.excludeTraitFromRandomGenerations !== true);
    const traitRarityArray: string[] = [];
    for (const trait of availableTraits) {
      if (trait.rarityType === RarityType.PERCENT) {
        for (let i = 0; i < size * (trait.rarity / 100); i++) {
          traitRarityArray.push(trait.name);
        }
      } else {
        traitRarityArray.push(...Array(trait.rarity).fill(trait.name));
      }
    }
    traitStore[layer.name] = traitRarityArray;
  }
  return traitStore;
}

export function getRandomTrait(traits: TraitT[]) {
  const trait = traits[Math.floor(Math.random() * traits.length)];
  return trait;
}

export function handleForceTraits(previewItem: PreviewItemT, layers: LayerT[]) {
  Object.values(previewItem.traits).forEach((trait) => {
    const layer = layers.find((f) => f.name === trait.trait_type);
    const traitDetails = layer?.traits.find((f) => f.name === trait.value)!;
    const traitRules = traitDetails.rules || [];
    for (const rule of traitRules) {
      const ruleLayerDetails = layers.find((f) => f.id === rule.layer)!;
      const ruleTraitDetails = ruleLayerDetails?.traits.find((f) => f.id === rule.trait)!;
      if (ruleTraitDetails === undefined) continue;
      if (rule.type === 'force') {
        previewItem.traits[ruleLayerDetails.name] = {
          trait_type: ruleLayerDetails.name,
          value: ruleTraitDetails.name,
          image: ruleTraitDetails.data,
          excludeFromMetadata: ruleLayerDetails.excludeFromMetadata,
          layerId: ruleLayerDetails.id,
          traitId: ruleTraitDetails.id,
        };
      }
    }
  });

  return previewItem;
}

export function handleBlockTraits(previewItem: PreviewItemT, layers: LayerT[]) {
  Object.values(previewItem.traits).forEach((trait) => {
    const layer = layers.find((f) => f.name === trait.trait_type);
    const traitDetails = layer?.traits.find((f) => f.name === trait.value)!;
    const traitRules = traitDetails.rules || [];
    for (const rule of traitRules) {
      const ruleLayerDetails = layers.find((f) => f.id === rule.layer)!;
      const ruleTraitDetails = ruleLayerDetails?.traits.find((f) => f.id === rule.trait)!;
      if (ruleTraitDetails === undefined) continue;
      if (rule.type === 'block') {
        const targetLayer = layers.find((f) => f.name === ruleLayerDetails.name);
        const hasTargetTrait = Object.values(previewItem.traits).find((f) => f.trait_type === targetLayer?.name && f.value === ruleTraitDetails.name);
        if (hasTargetTrait) {
          const availableTraits = ruleLayerDetails.traits
            .filter((trait) => !trait.sameAs && trait.excludeTraitFromRandomGenerations !== true)
            .filter((f) => f.name !== ruleTraitDetails.name);
          const newTrait = getRandomTrait(availableTraits);
          previewItem.traits[ruleLayerDetails.name] = {
            trait_type: ruleLayerDetails.name,
            value: newTrait.name,
            image: newTrait.data,
            excludeFromMetadata: ruleLayerDetails.excludeFromMetadata,
            layerId: ruleLayerDetails.id,
            traitId: newTrait.id,
          };
        }
      }
    }
  });

  return previewItem;
}
