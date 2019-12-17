import { createTransportReplayer, RecordStore } from '@ledgerhq/hw-transport-mocker';
import { TransportWrapper } from './transport-wrapper';

jest.mock('@ledgerhq/hw-transport-webusb');

describe('TransportWrapper', () => {
  it('initialises the application', async () => {
    const Transport = createTransportReplayer(new RecordStore());
    const transport = new Transport();

    class TransportWrapperMock extends TransportWrapper<null> {
      getTransport = jest.fn(async () => transport);
    }

    const wrapper = new TransportWrapperMock();

    await wrapper.getApplication();
    expect(wrapper.getTransport).toHaveBeenCalledTimes(1);
  });

  it('initialises the application again on disconnect', async () => {
    const Transport = createTransportReplayer(new RecordStore());
    const transport = new Transport();

    // tslint:disable-next-line: max-classes-per-file
    class TransportWrapperMock extends TransportWrapper<null> {
      getTransport = jest.fn(async () => transport);
    }

    const wrapper = new TransportWrapperMock();

    await wrapper.getApplication();
    expect(wrapper.getTransport).toHaveBeenCalledTimes(1);

    await wrapper.getApplication();
    expect(wrapper.getTransport).toHaveBeenCalledTimes(1);

    transport.emit('disconnect');
    await wrapper.getApplication();
    expect(wrapper.getTransport).toHaveBeenCalledTimes(2);
  });
});
