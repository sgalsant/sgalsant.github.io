import { BarcodeReader } from './barcode.js';
class App {
    constructor() {
        this._barcodeReader = new BarcodeReader();
    }
    changedVideoInputDevice() {
        this._barcodeReader.sourceDeviceId = this._sourceSelect.value;
        this._result.innerText = "cambiado video: " + this._sourceSelect.value;
        this._barcodeReader.decode();
    }
    showVideoInputDevices(devices) {
        const sourceSelect = document.getElementById('sourceSelect');
        if (devices.length == 0) {
            return;
        }
        let idx = 0;
        devices.forEach((element) => {
            const sourceOption = document.createElement('option');
            if (element.label.toUpperCase().indexOf('BACK') >= 0) {
                idx = element.deviceId;
            }
            sourceOption.text = element.label;
            sourceOption.value = element.deviceId;
            sourceSelect.appendChild(sourceOption);
        });
        this._sourceSelect.selectedIndex = idx;
        this._barcodeReader.sourceDeviceId = devices[idx].deviceId;
        this.decode();
    }
    decode() {
        this._barcodeReader.decode(this.decoded.bind(this));
        // this.decoded("12"+Math.trunc(Math.random()*3));
    }
    decoded(code) {
        console.log(code);
        let codigos = this._result.value.split("\n");
        if (codigos.indexOf(code) < 0) {
            if (this._result.value.length > 0) {
                this._result.value += "\n" + code;
            }
            else {
                this._result.value = code;
            }
        }
        this.decode();
    }
    init() {
        this._sourceSelect = document.getElementById('sourceSelect');
        this._result = document.getElementById('code');
        document.getElementById('decode').addEventListener('click', this.decode.bind(this));
        this._sourceSelect.addEventListener('cnange', this.changedVideoInputDevice.bind(this));
        this._barcodeReader.getVideoInputDevices(this.showVideoInputDevices.bind(this));
    }
    main() {
        document.addEventListener("DOMContentLoaded", this.init.bind(this));
    }
}
let app = new App();
app.main();
//# sourceMappingURL=app.js.map