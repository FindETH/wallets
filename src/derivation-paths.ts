import { Network } from '@findeth/networks';

interface RegularDerivationPath {
  name: string;
  path: string;
  isHardened?: false;
}

interface HardenedDerivationPath {
  name: string;
  path: string;
  isHardened: true;
}

export type DerivationPath = RegularDerivationPath | HardenedDerivationPath;

export const DEFAULT_ETH: DerivationPath = {
  name: 'Default (ETH)',
  path: "m/44'/60'/0'/0/<account>"
};

export const LEDGER_ETH: DerivationPath = {
  name: 'Ledger (ETH)',
  path: "m/44'/60'/0'/<account>"
};

export const LEDGER_ETC: DerivationPath = {
  name: 'Ledger (ETC)',
  path: "m/44'/60'/160720'/0'/<account>"
};

export const DEFAULT_ETC: DerivationPath = {
  name: 'Default (ETC)',
  path: "m/44'/61'/0'/0/<account>"
};

export const TESTNET_ETH: DerivationPath = {
  name: 'Testnet (ETH)',
  path: "m/44'/1'/0'/0/<account>"
};

export const DEFAULT_EXP: DerivationPath = {
  name: 'Default (EXP)',
  path: "m/44'/40'/0'/0/<account>"
};

export const DEFAULT_UBQ: DerivationPath = {
  name: 'Default (UBQ)',
  path: "m/44'/108'/0'/0/<account>"
};

export const DEFAULT_TOMO: DerivationPath = {
  name: 'Default (TOMO)',
  path: "m/44'/889'/0'/0/<account>"
};

export const DEFAULT_ELLA: DerivationPath = {
  name: 'Default (ELLA)',
  path: "m/44'/163'/0'/0/<account>"
};

export const DEFAULT_MUSIC: DerivationPath = {
  name: 'Default (MUSIC)',
  path: "m/44'/184'/0'/0/<account>"
};

export const DEFAULT_ETSC: DerivationPath = {
  name: 'Default (ETSC)',
  path: "m/44'/1128'/0'/0/<account>"
};

export const DEFAULT_EGEM: DerivationPath = {
  name: 'Default (EGEM)',
  path: "m/44'/1987'/0'/0/<account>"
};

export const DEFAULT_CLO: DerivationPath = {
  name: 'Default (CLO)',
  path: "m/44'/820'/0'/0/<account>"
};

export const TESTNET_RSK: DerivationPath = {
  name: 'Testnet (RSK)',
  path: "m/44'/37310'/0'/0/<account>"
};

export const MAINNET_RSK: DerivationPath = {
  name: 'Mainnet (RSK)',
  path: "m/44'/137'/0'/0/<account>"
};

export const DEFAULT_GO: DerivationPath = {
  name: 'Default (GO)',
  path: "m/44'/6060'/0'/0/<account>"
};

export const DEFAULT_EOSC: DerivationPath = {
  name: 'Default (EOSC)',
  path: "m/44'/2018'/0'/0/<account>"
};

export const DEFAULT_ESN: DerivationPath = {
  name: 'Default (ESN)',
  path: "m/44'/31102'/0'/0/<account>"
};

export const DEFAULT_AKA: DerivationPath = {
  name: 'Default (AKA)',
  path: "m/44'/200625'/0'/0/<account>"
};

export const DEFAULT_PIRL: DerivationPath = {
  name: 'Default (PIRL)',
  path: "m/44'/164'/0'/0/<account>"
};

export const DEFAULT_ATH: DerivationPath = {
  name: 'Default (ATH)',
  path: "m/44'/1620'/0'/0/<account>"
};

export const DEFAULT_ETHO: DerivationPath = {
  name: 'Default (ETHO)',
  path: "m/44'/1313114'/0'/0/<account>"
};

export const DEFAULT_MIX: DerivationPath = {
  name: 'Default (MIX)',
  path: "m/44'/76'/0'/0/<account>"
};

export const DEFAULT_REOSC: DerivationPath = {
  name: 'Default (REOSC)',
  path: "m/44'/2894'/0'/0/<account>"
};

export const DEFAULT_THUNDERCORE: DerivationPath = {
  name: 'Default (THUNDERCORE)',
  path: "m/44'/1001'/0'/0/<account>"
};

export const DEFAULT_WEB: DerivationPath = {
  name: 'Default (WEB)',
  path: "m/44'/227'/0'/0/<account>"
};

export const DEFAULT_METADIUM: DerivationPath = {
  name: 'Default (METADIUM)',
  path: "m/44'/916'/0'/0/<account>"
};

export const DEFAULT_SOLIDUM: DerivationPath = {
  name: 'Default (SOLIDUM)',
  path: "m/44'/997'/0'/0/<account>"
};

export const DEFAULT_DEXON: DerivationPath = {
  name: 'Default (DEXON)',
  path: "m/44'/237'/0'/0/<account>"
};

export const DEFAULT_ASK: DerivationPath = {
  name: 'Default (ASK)',
  path: "m/44'/2221'/0'/0/<account>"
};

export const DEFAULT_AUX: DerivationPath = {
  name: 'Default (AUX)',
  path: "m/44'/344'/0'/0/<account>"
};

export const DEFAULT_ERE: DerivationPath = {
  name: 'Default (ERE)',
  path: "m/44'/466'/0'/0/<account>"
};

export const DEFAULT_EWC: DerivationPath = {
  name: 'Default (EWC)',
  path: "m/44'/246'/0'/0/<account>"
};

export const DEFAULT_VOLTA: DerivationPath = {
  name: 'Default (VOLTA)',
  path: "m/44'/73799'/0'/0/<account>"
};

export const LEDGER_LIVE_ETH: DerivationPath = {
  name: 'Ledger Live (ETH)',
  path: "m/44'/60'/<account>'/0/0",
  isHardened: true
};

export const LEDGER_LIVE_ETC: DerivationPath = {
  name: 'Ledger Live (ETC)',
  path: "m/44'/61'/<account>'/0/0",
  isHardened: true
};

/**
 * All available derivation paths.
 */
export const ALL_DERIVATION_PATHS: DerivationPath[] = [
  DEFAULT_ETH,
  LEDGER_ETH,
  LEDGER_ETC,
  DEFAULT_ETC,
  TESTNET_ETH,
  DEFAULT_EXP,
  DEFAULT_UBQ,
  DEFAULT_TOMO,
  DEFAULT_ELLA,
  DEFAULT_MUSIC,
  DEFAULT_ETSC,
  DEFAULT_EGEM,
  DEFAULT_CLO,
  TESTNET_RSK,
  MAINNET_RSK,
  DEFAULT_GO,
  DEFAULT_EOSC,
  DEFAULT_ESN,
  DEFAULT_AKA,
  DEFAULT_PIRL,
  DEFAULT_ATH,
  DEFAULT_ETHO,
  DEFAULT_MIX,
  DEFAULT_REOSC,
  DEFAULT_THUNDERCORE,
  DEFAULT_WEB,
  DEFAULT_METADIUM,
  DEFAULT_SOLIDUM,
  DEFAULT_DEXON,
  DEFAULT_ASK,
  DEFAULT_AUX,
  DEFAULT_ERE,
  DEFAULT_EWC,
  DEFAULT_VOLTA,
  LEDGER_LIVE_ETH,
  LEDGER_LIVE_ETC
];

/**
 * Due to limitations in the Ledger ETH application, only derivation paths starting with
 * `m/44'/60'` and `m/44'/1'` can be checked.
 */
export const LEDGER_DERIVATION_PATHS: DerivationPath[] = [
  DEFAULT_ETH,
  LEDGER_ETH,
  LEDGER_ETC,
  TESTNET_ETH,
  LEDGER_LIVE_ETH
];

/**
 * While Trezor does support hardened paths, it'd be very tedious for the user to check all the
 * paths currently, since the user would have to confirm each address individually.
 */
export const TREZOR_DERIVATION_PATHS: DerivationPath[] = [...ALL_DERIVATION_PATHS.filter((path) => !path.isHardened)];

/**
 * Get a derivation path from a network. Returns a standard derivation path, and "hardened" version.
 *
 * @param {Network} network
 * @return {DerivationPath[]}
 */
export const getDerivationPaths = (network: Network): DerivationPath[] => {
  return [
    {
      name: `Default (${network.chain})`,
      path: `m/44'/${network.slip44}'/0'/0/<account>`
    },
    {
      name: `Ledger Live (${network.chain})`,
      path: `m/44'/${network.slip44}'/<account>'/0/0`,
      isHardened: true
    }
  ];
};
