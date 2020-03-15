import { BarcodeReader } from './barcode.js';
class App {
    constructor() {
        this._barcodeReader = new BarcodeReader();
    }
    changedVideoInputDevice() {
        this._barcodeReader.sourceDeviceId = this._sourceSelect.value;
        this._barcodeReader.decode();
    }
    showVideoInputDevices(devices) {
        const sourceSelect = document.getElementById('sourceSelect');
        if (devices.length == 0) {
            return;
        }
        let id = 0;
        devices.forEach((element) => {
            const sourceOption = document.createElement('option');
            if (element.label.toUpperCase().indexOf('BACK')) {
                id = element.deviceId;
            }
            sourceOption.text = element.label;
            sourceOption.value = element.deviceId;
            sourceSelect.appendChild(sourceOption);
        });
        this._barcodeReader.sourceDeviceId = devices[id].deviceId;
    }
    decode() {
        this._barcodeReader.decode(this.decoded.bind(this));
    }
    decoded(code) {
        console.log(code);
        this._result.innerText = code;
        this.decode();
    }
    init() {
        this._sourceSelect = document.getElementById('sourceSelect');
        this._barcodeReader.getVideoInputDevices(this.showVideoInputDevices.bind(this));
        this._sourceSelect.addEventListener('cnange', this.changedVideoInputDevice.bind(this));
        this._result = document.getElementById('code');
        document.getElementById('decode').addEventListener('click', this.decode.bind(this));
    }
    main() {
        document.addEventListener("DOMContentLoaded", this.init.bind(this));
    }
}
let app = new App();
app.main();
//# sourceMappingURL=app.js.map