import { Data, EthereumGetAddressPayload, GetPublicKeyPayload, Path } from 'trezor-connect';

export default class TrezorConnect {
  static init = jest.fn();

  static getPublicKey = jest.fn(
    async (
      params: { path: Path; bundle: undefined } | { path: undefined; bundle: Path[] }
    ): Promise<Data<GetPublicKeyPayload | GetPublicKeyPayload[]>> => {
      let payload;

      if (params.bundle) {
        payload = [
          {
            serializedPath: `m/44'/60'/0'/0`,
            chainCode: '51f696d1838ec2986b979577cc43c1098e26fe34d9abaf319df00a7eb20e0311',
            publicKey: '021c3e866ccb8f158431f5036319dc16f0409bd385d796fbc122a22819f0ec9017'
          },
          {
            serializedPath: `m/44'/1'/0'/0`,
            chainCode: '9d73a228d784f361eed3910b1d49750b33bc8aea09180b78abb71a09a17ae689',
            publicKey: '02bc7ab0a01997363ba548279abf8302ecc50ed376fe74ba3133f1678346ce0c5d'
          }
        ];
      } else {
        switch (params.path.path) {
          case `m/44'/60'/0'/0`:
            payload = {
              serializedPath: `m/44'/60'/0'/0`,
              chainCode: 'f34046e410a060091825436065aa12e074c6c8f348e3528578e902777789d0b5',
              publicKey:
                '04d54226ceac221f494aa1888252f47220e9d4cf0ddc11a651433bcad6364ee2af9862e1c78d56331267a95c660b182ea47e8dd0cedb231a2a1de59e8c3031bf22'
            };
            break;
          case `m/44'/60'/0'`:
          default:
            payload = {
              serializedPath: `m/44'/60'/0'/0`,
              chainCode: 'c4d424c253ca0eab92de6d8c819a37889e15a11bbf1cb6a48ffca2faef1f4d4d',
              publicKey:
                '041e31e8432aab932fe18b5f9798b7252394ff0b943920b40c50a79301062df5ece2b884a45c456241e35000137e6dbd92c9119ccd5f46cc92ba9568ca661b994b'
            };
            break;
        }
      }

      return {
        id: 0,
        payload,
        success: true
      };
    }
  );

  static ethereumGetAddress = async (params: Path): Promise<Data<EthereumGetAddressPayload>> => {
    let payload;

    if (params.path === `m/44'/60'/10'/0/0`) {
      payload = {
        address: '0x0719f46C96047A4f8A791394E338c8108E56F246',
        path: [2147483692, 2147483708, 2147483658, 0, 0],
        serializedPath: `m/44'/60'/10'/0/0`
      };
    } else {
      payload = {
        address: '0xA900c74246933B5F447C96581C5554Ac1bf36A92',
        path: [2147483692, 2147483708, 2147483663, 0, 0],
        serializedPath: `m/44'/60'/15'/0/0`
      };
    }

    return {
      id: 0,
      payload,
      success: true
    };
  };
}
