<template>
  <HeaderBar />
  <div class="flex">
    <MenuBar />
    <div class="flex-1 p-6">
      <div class="text-2xl font-bold text-center colorBG mb-6">
        หน้าจัดการฐานข้อมูล
      </div>
      <div v-if="loading" class="text-center text-gray-600">
        กำลังโหลดข้อมูล...
      </div>
      <div v-else class="p-6 colorBG text-black grid grid-cols-1 gap-6">
        <TableComponent
          :textHeader="textInstructors"
          :headers="instructorHeaders"
          :data="instructorData"
          @add="handleAdd"
          @delete="handleDelete"
          @update="handleUpdate"
        />
      </div>
      <div v-if="error" class="text-red-600 text-center mt-4">
        {{ error }}
      </div>
    </div>
  </div>
  <FTBarContent />
</template>

<script>
import axios from "axios";
import TableComponent from "./components/TableComponent.vue";
import HeaderBar from "./components/HeaderBar.vue";
import MenuBar from "./components/MenuBar.vue";
import FTBarContent from "./components/FTBarContent.vue";

export default {
  name: "App",
  components: {
    TableComponent,
    HeaderBar,
    MenuBar,
    FTBarContent,
  },
  data() {
    return {
      textInstructors: "ข้อมูลอาจารย์",
      instructorHeaders: ["ID", "ชื่อ-นามสกุล", "Email",  "ห้องพัก"],
      instructorData: [],
      loading: false,
      error: null,
    };
  },
  created() {
    this.fetchInstructorData();
  },
  methods: {
  // ฟังก์ชันที่มีอยู่แล้ว
  async fetchInstructorData() {
    // ใส่โค้ดที่แท้จริงของฟังก์ชันนี้
    this.loading = true;
    this.error = null;
    try {
      const response = await axios.get("http://localhost:3000/api/instructors");
      this.instructorData = response.data.map((instructor) => [
        instructor.instructor_id,
        instructor.name,
        instructor.email,
        instructor.room_name,
      ]);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูลอาจารย์:", error);
      this.error = "ไม่สามารถดึงข้อมูลอาจารย์ได้";
    } finally {
      this.loading = false;
    }
  },

  handleAdd(newRow) {
    const [name, email, room_id] = newRow;
    console.log("ข้อมูลที่กำลังส่ง:", { name, email, room_id });

    if (!name || !email || !room_id) {
      console.error("ข้อมูลไม่ครบถ้วน");
      this.error = "กรุณากรอกข้อมูลให้ครบถ้วน";
      return;
    }

    axios
      .post("http://localhost:3000/api/instructors", {
        name,
        email,
        room_id,
      })
      .then(() => {
        this.fetchInstructorData();
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการเพิ่มข้อมูล:", error);
        if (error.response && error.response.data) {
          console.error("ข้อความจากเซิร์ฟเวอร์:", error.response.data);
        }
        this.error = "ไม่สามารถเพิ่มข้อมูลได้";
      });
  },

  async handleDelete(id) {
    try {
      await axios.delete(`http://localhost:3000/api/instructors/${id}`);
      this.fetchInstructorData();
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลบข้อมูล:", error);
      this.error = "ไม่สามารถลบข้อมูลได้";
    }
  },

  async handleUpdate({ updatedRow }) {
    const [id, name, email, room_id] = updatedRow;
    if (!id || !name || !email || !room_id) {
      this.error = "กรุณากรอกข้อมูลให้ครบถ้วน";
      return;
    }
    try {
      await axios.put(`http://localhost:3000/api/instructors/${id}`, {
        name,
        email,
        room_id,
      });
      this.fetchInstructorData();
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", error);
      this.error = "ไม่สามารถอัปเดตข้อมูลได้";
    }
  },
},

  }
</script>

<style>
.colorBG {
  background-color: #F4F6FF;
}
.flex-1 {
  flex: 1;
}
.mb-6 {
  margin-bottom: 1.5rem;
}
.p-6 {
  padding: 1.5rem;
}
.gap-6 {
  gap: 1.5rem;
}
.text-center {
  text-align: center;
}
.text-red-600 {
  color: #e3342f;
}
.text-gray-600 {
  color: #718096;
}
.mt-4 {
  margin-top: 1rem;
}
</style>
