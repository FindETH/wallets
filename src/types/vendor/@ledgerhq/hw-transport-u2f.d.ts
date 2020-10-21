declare module '@ledgerhq/hw-transport-u2f' {
  import { Buffer } from 'buffer';
  import Transport, { DescriptorEvent, Observer, Subscription } from '@ledgerhq/hw-transport';

  export default class TransportU2F extends Transport<null> {
    /**
     * This transport does not support the list method. This will return [null] if the transport is
     * supported, or [] otherwise.
     *
     * @return {Promise<null[]>} [null] if the transport is supported, or [] otherwise.
     */
    static list(): Promise<null[]>;

    /**
     * Listen to all device events for a given Transport. The method takes an Observer of
     * DescriptorEvent and returns a Subscription (according to Observable paradigm
     * https://github.com/tc39/proposal-observable). This transport does not support listening for
     * devices, so if a device is found, the descriptor is always `null`.
     *
     * @param {Observer} observer The observer object.
     * @return A Subcription object on which you can `.unsubscribe()`, to stop listening to
     *   descriptors.
     */
    static listen(observer: Observer<DescriptorEvent<USBDevice>>): Subscription;

    /**
     * Attempt to create an instance of the Transport with the available device.
     *
     * @return {Promise<Transport<TransportU2F>>} A Promise with the Transport instance.
     */
    static open(): Promise<TransportU2F>;

    readonly scrambleKey: Buffer;
    readonly unwrap: boolean;

    constructor();

    /**
     * Set the unwrap variable.
     *
     * @param {boolean} unwrap
     */
    setUnwrap(unwrap: boolean): void;

    /**
     * Not implemented in this specific Transport.
     *
     * @return {Promise<void>} A Promise that resolves immediately.
     */
    close(): Promise<void>;
  }
}
