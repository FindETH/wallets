import Transport, { DescriptorEvent, Observer, Subscription } from '@ledgerhq/hw-transport';
import { createTransportReplayer, RecordStore } from '@ledgerhq/hw-transport-mocker';

const store = RecordStore.fromString(`
    => e00200010d038000002c8000003c80000000
    <= 4104d54226ceac221f494aa1888252f47220e9d4cf0ddc11a651433bcad6364ee2af9862e1c78d56331267a95c660b182ea47e8dd0cedb231a2a1de59e8c3031bf222863643137353661664437334531663937423166393266334633614131303532456334374235333532f34046e410a060091825436065aa12e074c6c8f348e3528578e902777789d0b59000
    => e002000109028000002c8000003c
    <= 41041e31e8432aab932fe18b5f9798b7252394ff0b943920b40c50a79301062df5ece2b884a45c456241e35000137e6dbd92c9119ccd5f46cc92ba9568ca661b994b2833376561363734634539383842324236313139363066374661393343633862363236333730393862c4d424c253ca0eab92de6d8c819a37889e15a11bbf1cb6a48ffca2faef1f4d4d9000
    => e002000111048000002c8000003c8000000000000000
    <= 41044d7509b2ddb7179364109b16ea95c8282ff05c6866ae760b22eca20b8e66dc9ab32d17a73231de3bbb46696084155f8a7f6be29408a70fc3103112cefccc4ce328333134393746343930323933434635613435343062383163394635393931304636323531396236337968ee36e0b6d94da4551bac811e7816115d4ebb9e15a6f4068bbc29736d45769000
    => e00200010d038000002c8000003c80000000
    <= 4104d54226ceac221f494aa1888252f47220e9d4cf0ddc11a651433bcad6364ee2af9862e1c78d56331267a95c660b182ea47e8dd0cedb231a2a1de59e8c3031bf222863643137353661664437334531663937423166393266334633614131303532456334374235333532f34046e410a060091825436065aa12e074c6c8f348e3528578e902777789d0b59000
    => e002000015058000002c8000003c8000000a0000000000000000
    <= 4104e3886d3d6907e5fd16a9924a0d1b74a92404de81521621c04e39a1ee99122521ded363ab5f6853ffbc6d59291fad5d11bfa8f6bbb4b45c02f245f0fe3854397b28466135393245616131393135303031313438666364303437643134346662393135613839463533389000
    => e002000015058000002c8000003c8000000f0000000000000000
    <= 4104038cf4487d0b3305ab112fcdf97569ba72666fd9266e243919e5d4ab779e7668a8aa64fe7bb636e1f85138751ae1a6cf1c6728b9a6f94d19d5c16064d1d1e78a28334239386365313137343938353535374433363043313733383632626462393933463230366436439000
`);

const Replayer = createTransportReplayer(store);

export default {
  isSupported: jest.fn(async (): Promise<boolean> => true),

  listen(observer: Observer<DescriptorEvent<BluetoothDevice>>): Subscription {
    setTimeout(() => {
      observer.next({
        type: 'add',
        descriptor: ('foo' as unknown) as BluetoothDevice
      });
    });

    return {
      unsubscribe: () => undefined
    };
  },

  open: jest.fn(
    async (): Promise<Transport<BluetoothDevice>> => {
      return new Replayer();
    }
  )
};
