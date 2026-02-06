import { sanitize, di } from "@Utils"
import { showToast } from "@Service/message-service.js"

export class EditableTable extends HTMLElement {
    async connectedCallback() {
        /**        
        this.data = [
            { id: 1, text: "Entry One" },
            { id: 2, text: "Entry Two" },
            { id: 3, text: "Entry Threee" }
        ];
        */
        const dataUrl = this.getAttribute('data-src');
        const ds = di('app-data-service');
        this.data = await ds.fetchData(dataUrl);
        this.render();
    }

    render() {
        this.innerHTML = `
            <table>
                <thead>
                    <tr><th>Content</th><th>Action</th></tr>
                </thead>
                <tbody id="table-body"></tbody>
            </table>
            <app-btn id="add-record-to-table" variant="safe" title="i18n:[add_record_title]" data-i18n-d="i18n:[add_record]">Add Record</app-btn>
        `;

        const tbody = this.querySelector('#table-body');

        this.querySelector('#add-record-to-table').onclick = () => {
            const newItem = { id: `${Math.floor(Math.random() * (10000 - 100 + 1)) + 100}`, text: "" }; // Don't use this id 'generator' in production!
            this.data.push(newItem);
            tbody.appendChild(this.createRow(newItem));
        };

        this.data.forEach(item => {
            const row = this.createRow(item);
            tbody.appendChild(row);
        });
    }

    createRow(item) {
        const tr = document.createElement('tr');
        let isEditing = false;

        const updateRowContent = () => {
            if (isEditing) {
                tr.innerHTML = `
                    <td><input type="text" class="edit-input" value="${sanitize(item.text)}" autofocus></td> 
                    <td><app-btn variant="safe" class="save-btn" title="i18n:[save_entry_title]" data-i18n-d="i18n:[save]">Save</app-btn></td>
                `;

                tr.querySelector('.save-btn').onclick = () => {
                    item.text = tr.querySelector('.edit-input').value;
                    isEditing = false;
                    updateRowContent();
                    showToast("i18n:[data_success_updated].", "success");
                };

                const input = tr.querySelector('.edit-input');

                setTimeout(() => {
                    input.focus();
                    input.setSelectionRange(input.value.length, input.value.length);
                }, 0);

            } else {
                tr.innerHTML = `
                    <td><span class="text-display">${sanitize(item.text)}</span></td>
                    <td>
                        <div class="actions-td">
                            <app-btn class="edit-btn" title="i18n:[save_change_title]" data-i18n-d="i18n:[change]">Change</app-btn>
                            <app-btn class="del-btn" variant="danger" title="i18n:[save_delete_title]" data-i18n-d="i18n:[delete]">Delete</app-btn>
                        </div>
                    </td>                    
                `;

                tr.querySelector('.edit-btn').onclick = () => {
                    isEditing = true;
                    updateRowContent();
                };

                tr.querySelector('.del-btn').onclick = () => {
                    const index = this.data.indexOf(item);
                    this.data.splice(index, 1);
                    tr.remove();
                    showToast("i18n:[data_success_removed].", "info");
                };
            }
        };

        updateRowContent();
        return tr;
    }

    get dataForMother() {
        return this.data;
    }
}

customElements.define('app-editable-table', EditableTable);