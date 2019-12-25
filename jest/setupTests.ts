import '@babel/runtime/regenerator';

interface MockedNavigator {
  usb: object;
  hid: object;
  bluetooth: object;
}

// Required to mock `navigator` functions
(navigator as MockedNavigator) = navigator ?? {};
(navigator as MockedNavigator).usb = navigator.usb ?? {};
(navigator as MockedNavigator).hid = navigator.usb ?? {};
(navigator as MockedNavigator).bluetooth = navigator.usb ?? {};
