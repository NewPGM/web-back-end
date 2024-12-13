<!-- src/components/TableComponent.vue -->
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
              <template v-if="headers[cellIndex] === 'ห้องพัก'">
                <select v-model="editRow[cellIndex]">
                  <option value="" disabled>เลือกห้องพัก</option>
                  <option v-for="room in roomOptions" 
                          :key="room.room_id" 
                          :value="room.room_id">
                    {{ room.room_name }}
                  </option>
                </select>
              </template>
              <template v-else>
                <input
                  v-model="editRow[cellIndex]"
                  :placeholder="'แก้ไข ' + headers[cellIndex]"
                  :disabled="cellIndex === 0"
                />
              </template>
            </div>
            <div v-else>
              <template v-if="headers[cellIndex] === 'ห้องพัก'">
                {{ getRoomName(cell) }}
              </template>
              <template v-else>
                {{ cell }}
              </template>
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
        <template v-if="header === 'ห้องพัก'">
          <select v-model="newRow[index]">
            <option value="" disabled selected>เลือกห้องพัก</option>
            <option v-for="room in roomOptions" 
                    :key="room.room_id" 
                    :value="room.room_id">
              {{ room.room_name }}
            </option>
          </select>
        </template>
        <template v-else>
          <input v-model="newRow[index]" :placeholder="'กรอก ' + header" />
        </template>
      </div>
      <button @click="addRow">เพิ่ม</button>
      <button @click="cancelAddRow">ยกเลิก</button>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
    <button @click="toggleAddRow" class="add-button">เพิ่มข้อมูล</button>
  </div>
</template>

<script>
export default {
  props: {
    textHeader: String,
    headers: Array,
    data: Array,
    roomOptions: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  
  data() {
    return {
      internalData: [...this.data],
      editRowIndex: null,
      editRow: [],
      showAddForm: false,
      newRow: Array(this.headers.length - 1).fill(""),
      errorMessage: "",
    };
  },

  watch: {
    data(newData) {
      this.internalData = [...newData];
    }
  },

  methods: {
    // เพิ่มฟังก์ชัน getRoomName
    getRoomName(roomId) {
      if (!this.roomOptions) return roomId;
      const room = this.roomOptions.find(room => room.room_id === parseInt(roomId));
      return room ? room.room_name : roomId;
    },

    toggleAddRow() {
      this.showAddForm = !this.showAddForm;
      this.newRow = Array(this.headers.length - 1).fill("");
      this.errorMessage = "";
    },

    addRow() {
      if (this.newRow.some(field => !field)) {
        this.errorMessage = "กรุณากรอกข้อมูลให้ครบถ้วน";
        return;
      }
      
      this.$emit("add", this.newRow);
      this.showAddForm = false;
      this.errorMessage = "";
    },

    editRowData(row, index) {
      this.editRowIndex = index;
      this.editRow = [...row];
      this.errorMessage = "";
    },

    saveRow() {
      if (this.editRow.some((field, index) => !field && index !== 0)) {
        this.errorMessage = "กรุณากรอกข้อมูลให้ครบถ้วน";
        return;
      }
      
      this.$emit("update", { updatedRow: this.editRow });
      this.editRowIndex = null;
      this.errorMessage = "";
    },

    deleteRow(index) {
      const id = this.internalData[index][0];
      this.$emit("delete", id);
    },

    cancelAddRow() {
      this.showAddForm = false;
      this.errorMessage = "";
    },
  },

  computed: {
    displayedData() {
      return this.internalData.slice().sort((a, b) => a[0] - b[0]);
    }
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

select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 4px;
}

.error-message {
  color: red;
  margin-top: 1rem;
}
</style>