require('@babel/runtime/regenerator');

/* global navigator:writable */

// Required to mock `navigator` functions
navigator = navigator ?? {};
navigator.usb = navigator.usb ?? {};
navigator.hid = navigator.usb ?? {};
navigator.bluetooth = navigator.usb ?? {};
