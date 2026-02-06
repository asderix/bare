import { showToast } from "@Service/message-service.js"

export class DataService {
    constructor() {
        this.isLoaded = false;
        this.data = null;
    }

    async fetchData(src) {
        if (this.isLoaded) {
            return this.data;
        } else {
            try {
                const response = await fetch(src);

                if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
                const data = await response.json();
                const checkedData = Array.isArray(data) ? data : [];
                this.data = checkedData;
                this.isLoaded = true;
                return this.data;

            } catch (error) {
                this.isLoaded = false;
                showToast("i18n:[data_load_error]", "error");
                return [];
            }
        }
    }
}

const dataService = new DataService();

document.addEventListener('app-di', (e) => {
    const { serviceName } = e.detail;
    if (serviceName == "app-data-service") {
        e.detail.serviceObj = dataService;
    }
});
