<template>
  <header class="text-white p-4 rounded flex justify-between items-center w-full colorBG">
    <h1 class="text-2xl font-bold">Header Bar</h1>
    <nav>
      <ul class="flex space-x-4">
        <li><a href="#" class="header-link">Home</a></li>
        <li><a href="#" class="header-link">About</a></li>
        <li><a href="#" class="header-link">Contact</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderBar",
};
</script>

<style scoped>
.colorBG {
  background-color: #000000;
}

/* สไตล์เพิ่มเติมสำหรับลิงก์ใน header */
.header-link {
  color: #ffffff;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

/* เอฟเฟกต์ hover */
.header-link:hover {
  background-color: #333333;
}
</style>
