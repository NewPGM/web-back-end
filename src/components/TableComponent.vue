<template>
  <div>
    <h2>{{ textHeader }}</h2>
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in displayedData" :key="rowIndex">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex">
            <div v-if="editRowIndex === rowIndex">
              <input
                v-model="editRow[cellIndex]"
                :placeholder="'แก้ไข ' + headers[cellIndex]"
                :disabled="cellIndex === 0"
              />
            </div>
            <div v-else>
              {{ cell }}
            </div>
          </td>
          <td>
            <button v-if="editRowIndex === rowIndex" @click="saveRow(rowIndex)">Save</button>
            <button v-else @click="editRowData(row, rowIndex)">Edit</button>
            <button @click="deleteRow(rowIndex)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="showAddForm" class="add-form">
      <h3>เพิ่มข้อมูลใหม่</h3>
      <div v-for="(header, index) in headers.slice(1)" :key="index">
        <label>{{ header }}</label>
        <input v-model="newRow[index]" :placeholder="'กรอก ' + header" />
      </div>
      <button @click="addRow">เพิ่ม</button>
      <button @click="cancelAddRow">ยกเลิก</button>
    </div>
    <button @click="toggleAddRow" class="add-button">เพิ่มข้อมูล</button>
  </div>
</template>

<script>
export default {
  props: ['textHeader', 'headers', 'data'],
  data() {
    return {
      internalData: [...this.data],
      editRowIndex: null,
      editRow: [],
      showAddForm: false,
      newRow: Array(this.headers.length - 1).fill(""), // ไม่รวม ID
      errorMessage: "", // เพิ่มการแจ้งเตือนข้อผิดพลาด
    };
  },
  watch: {
    data(newData) {
      this.internalData = [...newData];
    }
  },
  methods: {
    toggleAddRow() {
      this.showAddForm = !this.showAddForm;
      this.newRow = Array(this.headers.length - 1).fill("");
      this.errorMessage = ""; // ล้างข้อความแจ้งเตือนเมื่อเริ่มการเพิ่มข้อมูลใหม่
    },
    addRow() {
      if (this.newRow.some(field => !field)) {
        this.errorMessage = "กรุณากรอกข้อมูลให้ครบถ้วน";
        return;
      }
      this.$emit("add", this.newRow);
      this.showAddForm = false;
      this.errorMessage = ""; // ล้างข้อความแจ้งเตือนหลังการเพิ่มข้อมูลสำเร็จ
    },
    editRowData(row, index) {
      this.editRowIndex = index;
      this.editRow = [...row];
      this.errorMessage = ""; // ล้างข้อความแจ้งเตือนเมื่อเริ่มแก้ไขข้อมูล
    },
    saveRow() {
      if (this.editRow.some((field, index) => !field && index !== 0)) {
        this.errorMessage = "กรุณากรอกข้อมูลให้ครบถ้วน";
        return;
      }
      this.$emit("update", { updatedRow: this.editRow });
      this.editRowIndex = null;
      this.errorMessage = ""; // ล้างข้อความแจ้งเตือนหลังการบันทึกข้อมูลสำเร็จ
    },
    deleteRow(index) {
      const id = this.internalData[index][0];
      this.$emit("delete", id);
    },
    cancelAddRow() {
      this.showAddForm = false;
      this.errorMessage = ""; // ล้างข้อความแจ้งเตือนเมื่อยกเลิกการเพิ่มข้อมูล
    },
  },
  computed: {
    displayedData() {
      return this.internalData.slice().sort((a, b) => a[0] - b[0]);
    },
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f4f4f4;
}
button {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 4px;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #1976d2;
}
.add-button {
  margin-top: 1rem;
  background-color: #4caf50;
}
.add-button:hover {
  background-color: #388e3c;
}
.add-form {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}
.error-message {
  color: red;
  margin-top: 1rem;
}
</style>
