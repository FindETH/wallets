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
            serializedPath: "m/44'/60'/0'/0",
            chainCode: '7968ee36e0b6d94da4551bac811e7816115d4ebb9e15a6f4068bbc29736d4576',
            publicKey: '034d7509b2ddb7179364109b16ea95c8282ff05c6866ae760b22eca20b8e66dc9a'
          },
          {
            serializedPath: "m/44'/60'/0'",
            chainCode: 'f34046e410a060091825436065aa12e074c6c8f348e3528578e902777789d0b5',
            publicKey: '02d54226ceac221f494aa1888252f47220e9d4cf0ddc11a651433bcad6364ee2af'
          },
          {
            serializedPath: "m/44'/1'/0'/0",
            chainCode: '11b7f3ec2cd7738edb803a21c2d5df3ed21902dc1f072325634d7fe9b8a6d61e',
            publicKey: '02f5ff7dd9ee74985c7018bfa3aac65f3892a2ca47d002d3bccb8a6e5ed80008db'
          },
          {
            serializedPath: "m/44'/1'/0'",
            chainCode: 'ca2f3de968b1832ab13039cd1fabcdd10274723b51d9ce1ac47561b09d4f7984',
            publicKey: '0339ab36253d28dcfdb7f55bb2cf7628374fba6738f80500e4f3f5a83a14769ba6'
          }
        ];
      } else {
        switch (params.path.path) {
          case "m/44'/60'/0'/0":
            payload = {
              serializedPath: "m/44'/60'/0'/0",
              chainCode: 'f34046e410a060091825436065aa12e074c6c8f348e3528578e902777789d0b5',
              publicKey:
                '04d54226ceac221f494aa1888252f47220e9d4cf0ddc11a651433bcad6364ee2af9862e1c78d56331267a95c660b182ea47e8dd0cedb231a2a1de59e8c3031bf22'
            };
            break;
          case "m/44'/60'/0'":
          default:
            payload = {
              serializedPath: "m/44'/60'/0'/0",
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

    if (params.path === "m/44'/60'/10'/0/0") {
      payload = {
        address: '0x0719f46C96047A4f8A791394E338c8108E56F246',
        path: [2147483692, 2147483708, 2147483658, 0, 0],
        serializedPath: "m/44'/60'/10'/0/0"
      };
    } else {
      payload = {
        address: '0xA900c74246933B5F447C96581C5554Ac1bf36A92',
        path: [2147483692, 2147483708, 2147483663, 0, 0],
        serializedPath: "m/44'/60'/15'/0/0"
      };
    }

    return {
      id: 0,
      payload,
      success: true
    };
  };
}
