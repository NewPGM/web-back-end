<template>
  <div class="flex-1 p-6">
    <div class="text-2xl font-bold text-center colorBG mb-6">
      หน้าจัดการฐานข้อมูล
    </div>
    <div v-if="loading" class="text-center text-gray-600">
      กำลังโหลดข้อมูล...
    </div>
    <div v-else class="p-6 colorBG text-black grid grid-cols-1 gap-6">
      <table-component
        :textHeader="textInstructors"
        :headers="instructorHeaders"
        :data="instructorData"
        :room-options="roomData"
        @add="handleAdd"
        @delete="handleDelete"
        @update="handleUpdate"
      />
    </div>
    <div v-if="error" class="text-red-600 text-center mt-4">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { instructorAPI, roomAPI } from '@/services/api'
import TableComponent from "@/components/TableComponent.vue"

export default defineComponent({
  name: "InstructorManagement",
  
  components: {
    TableComponent,
  },

  data() {
    return {
      textInstructors: "ข้อมูลอาจารย์",
      instructorHeaders: ["ID", "ชื่อ-นามสกุล", "Email", "ห้องพัก"],
      instructorData: [],
      roomData: [],
      loading: false,
      error: null,
    }
  },

  async created() {
    await this.fetchRoomData()
    await this.fetchInstructorData()
  },

  methods: {
    async fetchInstructorData() {
      this.loading = true
      this.error = null
      try {
        const { data } = await instructorAPI.getAll()
        this.instructorData = data.map((instructor) => [
          instructor.instructor_id,
          instructor.name,
          instructor.email,
          instructor.room_id,
        ])
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลอาจารย์:", error)
        this.error = "ไม่สามารถดึงข้อมูลอาจารย์ได้"
      } finally {
        this.loading = false
      }
    },

    async fetchRoomData() {
      try {
        const { data } = await roomAPI.getAll()
        this.roomData = data.map(room => ({
          room_id: room.room_id,
          room_name: room.room_name
        }))
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลห้อง:", error)
        this.error = "ไม่สามารถดึงข้อมูลห้องได้"
      }
    },

    async handleAdd(newRow) {
      const [name, email, room_id] = newRow
      if (!name || !email || !room_id) {
        this.error = "กรุณากรอกข้อมูลให้ครบถ้วน"
        return
      }

      try {
        await instructorAPI.create({ 
          name, 
          email, 
          room_id: parseInt(room_id) 
        })
        await this.fetchInstructorData()
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการเพิ่มข้อมูล:", error)
        this.error = error.response?.data || "ไม่สามารถเพิ่มข้อมูลได้"
      }
    },

    async handleDelete(id) {
      try {
        await instructorAPI.delete(id)
        await this.fetchInstructorData()
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการลบข้อมูล:", error)
        this.error = error.response?.data || "ไม่สามารถลบข้อมูลได้"
      }
    },

    async handleUpdate({ updatedRow }) {
      const [id, name, email, room_id] = updatedRow
      if (!id || !name || !email || !room_id) {
        this.error = "กรุณากรอกข้อมูลให้ครบถ้วน"
        return
      }
      try {
        await instructorAPI.update(id, { 
          name, 
          email, 
          room_id: parseInt(room_id)
        })
        await this.fetchInstructorData()
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", error)
        this.error = error.response?.data || "ไม่สามารถอัปเดตข้อมูลได้"
      }
    },
  },
})
</script>

<style scoped>
.colorBG {
  background-color: #f4f6ff;
}
</style>