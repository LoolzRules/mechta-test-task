<template>
  <div id="main">
    <PageHeader/>
    <CitySelector/>
    <DeliveryOptionsList
        :options="deliveryOptions"/>
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
  }),
  created() {
    this.getDeliveryOptions();
  },
  methods: {
    async getDeliveryOptions() {
      this.deliveryOptions = [];
      this.removeError();
      try {
        const response = await fetch("http://qvjgl.mocklab.io/delivery/check?" + new URLSearchParams({
          search: 'aktau',
        }));
        if (!response.ok) {
          this.raiseError();
          return;
        }
        const result = await response.json();
        this.deliveryOptions = result.map(opt => new ApiResponseItem(opt));
      } catch (e) {
        this.raiseError();
      }
    },
    raiseError() {
    },
    removeError() {
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/main";
</style>