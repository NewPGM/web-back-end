<template>
  <div>
    <HeaderBar />
    <div class="flex">
      <MenuBar />
      <router-view />
    </div>
    <FTBarContent />
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar.vue";
import MenuBar from "@/components/MenuBar.vue";
import FTBarContent from "@/components/FTBarContent.vue";

export default {
  name: "App",
  components: {
    HeaderBar,
    MenuBar,
    FTBarContent,
  },
};
</script>

<style>
.flex {
  display: flex;
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