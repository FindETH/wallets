declare module 'trezor-connect' {
  export interface ConnectSettings {
    popup?: boolean;
    webusb?: boolean;
    manifest: {
      email: string;
      appUrl: string;
    };
  }

  export interface Data<Payload> {
    id: number;
    payload: Payload;
    success: boolean;
  }

  export interface GetPublicKeyPayload {
    serializedPath: string;
    chainCode: string;
    publicKey: string;
  }

  export interface Path {
    path: string | number[];
  }

  export interface EthereumGetAddressPayload {
    address: string;
    path: number[];
    serializedPath: string;
  }

  class TrezorConnect {
    static init(settings: ConnectSettings): Promise<void>;
    static manifest(manifest: { email: string; appUrl: string }): void;
    static getPublicKey(params: Path): Promise<Data<GetPublicKeyPayload>>;
    static getPublicKey(params: { bundle: Path[] }): Promise<Data<GetPublicKeyPayload[]>>;
    static ethereumGetAddress(params: { path: string | number[] }): Promise<Data<EthereumGetAddressPayload>>;
  }

  export default TrezorConnect;
}
