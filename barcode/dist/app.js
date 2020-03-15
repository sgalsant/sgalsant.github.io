import { BarcodeReader } from './barcode.js';
class App {
    constructor() {
        this._barcodeReader = new BarcodeReader();
        this._audio = new AudioContext();
    }
    changedVideoInputDevice() {
        this._barcodeReader.sourceDeviceId = this._sourceSelect.value;
        this._result.innerText = "cambiado video: " + this._sourceSelect.value;
        this.decode();
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
        setTimeout(this.decode.bind(this), 1500);
    }
    decode() {
        this._barcodeReader.decode(this.decoded.bind(this));
        //  this.decoded("12"+Math.trunc(Math.random()*3));
    }
    beep(vol = 60, freq = 520, duration = 200) {
        let v = this._audio.createOscillator();
        let u = this._audio.createGain();
        v.connect(u);
        v.frequency.value = freq;
        v.type = "square";
        u.connect(this._audio.destination);
        u.gain.value = vol * 0.01;
        v.start(this._audio.currentTime);
        v.stop(this._audio.currentTime + duration * 0.001);
    }
    decoded(code) {
        console.log(code);
        let codigos = this._result.value.split("\n");
        if (codigos.indexOf(code) < 0) {
            if (this._result.value.length > 0) {
                this._result.value = code + "\n" + this._result.value;
            }
            else {
                this._result.value = code;
            }
        }
        this.beep();
        navigator.vibrate(200);
        setTimeout(this.decode.bind(this), 1500);
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
