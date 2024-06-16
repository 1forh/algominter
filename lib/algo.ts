import 'server-only';

import { ALGO_INDEXER_BASE_URL } from '@/config';
import algosdk, { Algodv2 } from 'algosdk';
import axios from 'axios';
import { getActiveNetworkApiUrl } from './network';
import { getActiveNetwork } from './network-server';
import { AssetFromIndexerT } from './types';

export const algodClient = () => {
  const activeNetwork = getActiveNetwork();
  return new Algodv2('', getActiveNetworkApiUrl(activeNetwork), '');
};

export async function getCreatedAssets(address: string) {
  const apiUrl = `${ALGO_INDEXER_BASE_URL}/v2/accounts/${address}/created-assets`;
  const { data } = await axios.get(apiUrl);
  const assets = data.assets;
  let next = data['next-token'];

  while (next) {
    const { data } = await axios.get(apiUrl, {
      params: {
        next,
      },
    });
    assets.push(...data.assets);
    next = data['next-token'];
  }

  return assets;
}

export async function getAssetsByAddress(address: string, minBalance?: number): Promise<AssetFromIndexerT[]> {
  const apiUrl = `${ALGO_INDEXER_BASE_URL}/v2/accounts/${address}/assets`;
  const { data } = await axios.get(apiUrl);
  const assets = data.assets;
  let next = data['next-token'];

  while (next) {
    const { data } = await axios.get(apiUrl, {
      params: {
        next,
      },
    });
    assets.push(...data.assets);
    next = data['next-token'];
  }

  if (minBalance) {
    return assets.filter((asset: any) => asset.amount >= minBalance);
  }

  return assets;
}

export function encodeNote(input: any) {
  const enc = new TextEncoder();
  const secretNoteStr = JSON.stringify(input);
  const secretNoteEncoded = Buffer.from(secretNoteStr).toString('base64');
  const note = enc.encode(secretNoteEncoded);
  return note;
}

export async function waitForConfirmation(txnId: string) {
  await algosdk.waitForConfirmation(algodClient(), txnId, 10);
}

export async function getTxn(txnId: string) {
  const { data } = await axios.get(`${ALGO_INDEXER_BASE_URL}/v2/transactions/${txnId}`);
  return data;
}
