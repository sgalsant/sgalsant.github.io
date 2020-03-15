class BarcodeReader {
    constructor() {
        this._codeReader = new ZXing.BrowserBarcodeReader();
    }
    set sourceDeviceId(value) {
        this._sourceDeviceId = value;
        this.reset();
    }
    decode(event) {
        this._codeReader.decodeOnceFromVideoDevice(this._sourceDeviceId, 'video').then((result) => {
            console.log(result);
            event(result.text);
        }).catch((err) => {
            console.error(err);
        });
    }
    reset() {
        this._codeReader.reset();
    }
    getVideoInputDevices(event) {
        this._codeReader.getVideoInputDevices().then(result => event(result));
    }
}
export { BarcodeReader };
//# sourceMappingURL=barcode.js.map