// src/views/RoomManagement.vue
<template>
  <div class="flex-1 p-6">
    <div class="text-2xl font-bold text-center colorBG mb-6">
      หน้าจัดการฐานข้อมูล
    </div>
    <div v-if="loading" class="text-center text-gray-600">
      กำลังโหลดข้อมูล...
    </div>
    <div v-else class="p-6 colorBG text-black grid grid-cols-1 gap-6">
      <TableComponent
        :textHeader="textRooms"
        :headers="roomHeaders"
        :data="roomData"
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
import { roomAPI } from '@/services/api'
import TableComponent from "@/components/TableComponent.vue"

export default {
  name: "RoomManagement",
  components: {
    TableComponent,
  },

  data() {
    return {
      textRooms: "ข้อมูลห้อง",
      roomHeaders: ["ID", "ชื่อห้อง"],
      roomData: [],
      loading: false,
      error: null,
    }
  },

  created() {
    this.fetchRoomData()
  },

  methods: {
    async fetchRoomData() {
      this.loading = true
      this.error = null
      try {
        const { data } = await roomAPI.getAll()
        this.roomData = data.map((room) => [
          room.room_id,
          room.room_name,
        ])
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลห้อง:", error)
        this.error = "ไม่สามารถดึงข้อมูลห้องได้"
      } finally {
        this.loading = false
      }
    },

    async handleAdd(newRow) {
      const [room_name] = newRow
      if (!room_name) {
        this.error = "กรุณากรอกชื่อห้อง"
        return
      }

      try {
        await roomAPI.create({ room_name })
        await this.fetchRoomData()
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการเพิ่มข้อมูล:", error)
        this.error = error.response?.data || "ไม่สามารถเพิ่มข้อมูลได้"
      }
    },

    async handleDelete(id) {
      try {
        await roomAPI.delete(id)
        await this.fetchRoomData()
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการลบข้อมูล:", error)
        this.error = error.response?.data || "ไม่สามารถลบข้อมูลได้"
      }
    },

    async handleUpdate({ updatedRow }) {
      const [id, room_name] = updatedRow
      if (!room_name) {
        this.error = "กรุณากรอกชื่อห้อง"
        return
      }

      try {
        await roomAPI.update(id, { room_name })
        await this.fetchRoomData()
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", error)
        this.error = error.response?.data || "ไม่สามารถอัปเดตข้อมูลได้"
      }
    },
  },
}
</script>

<style scoped>
.colorBG {
  background-color: #f4f6ff;
}
</style>