<template>
  <aside class="colorBG text-black p-4 rounded bottom-0 w-1/6 overflow-y-auto left-0">
    <h1 class="text-2xl font-bold text-white text-center mb-4">Menu</h1>
    <nav class="ConfigMenu">
      <ul class="flex flex-col gap-2">
        <!-- ปรับให้ ul ครอบ li อย่างถูกต้อง -->
        <li><a href="#" class="menu-link">Home</a></li>
        <li><a href="#" class="menu-link">About</a></li>
        <li><a href="#" class="menu-link">Contact</a></li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "MenuBar",
};
</script>

<style scoped>
.colorBG {
  background-color: #2f2f30;
}

.ConfigMenu {
  color: #ffffff;
  margin: 10px 1px;
  font-size: 15px;
  padding: 10px;
}

/* ปรับการจัดสไตล์ของลิงก์ในเมนู */
.menu-link {
  display: block;
  padding: 10px;
  color: #ffffff;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

/* เพิ่มเอฟเฟกต์ hover */
.menu-link:hover {
  background-color: #494948;
}
</style>
