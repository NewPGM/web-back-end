<template>
  <footer class="footer-bar bg-black text-white p-4 flex flex-col items-center mt-auto w-full">
    <div>Footer Bar</div>
  </footer>
</template>

<script>
export default {
  name: "FTBarContent",
};
</script>

<style scoped>
.footer-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  border-top: 1px solid #444;
}

/* เพิ่ม padding ด้านบนในกรณีที่เนื้อหาเยอะ */
.footer-bar div {
  padding: 10px 0;
}
</style>
