<template>
  <div>
    <CityListItem v-for="city in cities" :key="city"/>
  </div>
</template>

<script>
import CityListItem from "@/components/Common/CityListItem";

export default {
name: "CityList",
  components: { CityListItem },
  props: {
    cities: {
      default: () => [],
      type: Array,
      validator: prop => prop.every(e => typeof e === "string")
    }
  }

}
</script>

<style scoped>

</style>