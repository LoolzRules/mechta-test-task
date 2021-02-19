<template>
  <div id="main">
    <PageHeader/>
    <CitySelector
        ref="citySelector"
        @citySelected="getDeliveryOptions"/>
    <DeliveryOptionsList
        :options="deliveryOptions"
        :loading="loading"/>
    <PageFooter/>
  </div>
</template>

<script>
import PageHeader from "@/components/Common/PageHeader";
import PageFooter from "@/components/Common/PageFooter";
import CitySelector from "@/components/Main/CitySelector";
import DeliveryOptionsList from "@/components/Main/DeliveryOptionsList";
import ApiResponseItem from "@/models/ApiResponseItem";

export default {
  name: "Main",
  components: {
    PageHeader,
    PageFooter,
    CitySelector,
    DeliveryOptionsList
  },
  data: () => ({
    deliveryOptions: [],
    loading: false,
  }),
  methods: {
    async getDeliveryOptions(city) {
      city = city.toLowerCase();
      this.deliveryOptions = [];
      this.$refs.citySelector.setSearchBoxError(false);
      try {
        this.loading = true;
        const response = await fetch("https://qvjgl.mocklab.io/delivery/check?" + new URLSearchParams({
          search: city,
        }));
        if (!response.ok) {
          this.$refs.citySelector.setSearchBoxError(true);
          this.loading = false;
          return;
        }
        const result = await response.json();
        this.deliveryOptions = result.map(opt => new ApiResponseItem(opt));
        this.loading = false;
      } catch (e) {
        this.$refs.citySelector.setSearchBoxError(true);
        this.loading = false;
      }
    },
  }
};
</script>

<style lang="scss">
@import "@/styles/main";
</style>