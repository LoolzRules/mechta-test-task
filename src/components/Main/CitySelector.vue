<template>
  <div class="citySelector">
    <h1>Delivery cost</h1>
    <p>Enter the name of the city to count&nbsp;delivery&nbsp;cost</p>
    <SearchBox/>
    <h3>Most popular cities</h3>
    <ul class="citiesList">
      <li v-for="city in cities"
            :key="city"
            class="citiesList__item">{{ city }}</li>
    </ul>
  </div>
</template>

<script>
import SearchBox from "@/components/Common/SearchBox";

export default {
  name: "CitySelector",
  components: { SearchBox },
  data: () => ({
    cities: ["Nur-Sultan", "Almaty", "Shymkent", "Atyrau", "Aktau", "Zhana Turmis", "Karaganda", "Kentau", "Aitei", "Pavlodar"]
  })
};
</script>