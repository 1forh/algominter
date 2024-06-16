import { NftMetadataT } from './types';

export default function calculateNftRating(nft: NftMetadataT, allNfts: NftMetadataT[]) {
  const rarityScore = getTraitRarityScore(nft, allNfts);
  return Math.round(rarityScore);
}

// rarityScore = 1 ÷([Number of Items With That Trait Value] /[Total. Number of Items in Collection])
function getTraitRarityScore(nft: NftMetadataT, allNfts: NftMetadataT[]) {
  if (!nft?.metadata?.properties || Object.keys(nft.metadata.properties).length === 0) return 0;

  const total = allNfts.length;
  const traitFrequencies = getTraitFrequencies(allNfts);
  const rarityScore = Object.entries(nft.metadata.properties).reduce((acc, [trait, value]) => {
    // @ts-ignore
    const traitFrequency = traitFrequencies[`${trait}:${value}`];
    const rarity = 1 / (traitFrequency / total);
    return acc + rarity;
  }, 0);
  return rarityScore;
}

function getTraitFrequencies(allNfts: any[]) {
  const formattedCities = allNfts.map((c) => {
    if (!c.metadata?.properties) {
      return {};
    }
    return {
      ...c.metadata?.properties,
    };
  });

  const traitFrequencies = {};
  formattedCities.forEach((nft) => {
    Object.entries(nft).forEach(([trait, value]) => {
      // @ts-ignore
      traitFrequencies[`${trait}:${value}`] = (traitFrequencies[`${trait}:${value}`] || 0) + 1;
    });
  });
  return traitFrequencies;
}
