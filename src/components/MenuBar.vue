<template>
  <div class="menu-bar">
    <router-link 
      to="/instructors"
      class="menu-item"
      :class="{ active: $route.path === '/instructors' }"
    >
      จัดการข้อมูลอาจารย์
    </router-link>
    <router-link 
      to="/rooms"
      class="menu-item"
      :class="{ active: $route.path === '/rooms' }"
    >
      จัดการข้อมูลห้อง
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'MenuBar'
}
</script>

<style scoped>
.menu-bar {
  width: 250px;
  min-height: calc(100vh - 64px); /* ปรับตามความสูงของ HeaderBar */
  background-color: #f4f6ff;
  padding: 1rem;
}

.menu-item {
  display: block;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  color: #4a5568;
  text-decoration: none;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.menu-item:hover {
  background-color: #e2e8f0;
}

.menu-item.active {
  background-color: #2196f3;
  color: white;
}
</style>