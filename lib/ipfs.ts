export const getIpfsImageUrl = (hash: string, { width, quality } = { width: 1000, quality: 70 }) => {
  hash = hash.replace('ipfs://', '');
  return `https://ipfs.algonode.xyz/ipfs/${hash}?optimizer=image&width=${width}&quality=${quality}`;
};
