<template>
  <div class="deliveryOptionsList">
    <ul v-if="options.length > 0">
      <DeliveryOptionsListItem
          v-for="(option, idx) of options"
          :selected="idx === selectedIdx"
          :key="option.type"
          @click.native="() => toggleIfAvailable(option, idx)"
          :opt="option"/>
    </ul>
    <img v-else class="deliveryOptionsList__placeholder" src="@/assets/DeliveryOptionsList/placeholder.svg">
  </div>
</template>

<script>
import DeliveryOptionsListItem from "@/components/Main/DeliveryOptionsListItem";
import ApiResponseItem from "@/models/ApiResponseItem";

export default {
  name: "DeliveryOptions",
  components: { DeliveryOptionsListItem },
  props: {
    options: {
      type: Array,
      validator: prop => prop.every(e => e instanceof ApiResponseItem)
    }
  },
  data: () => ({
    selectedIdx: -1,
  }),
  methods: {
    toggleIfAvailable(option, idx) {
      console.log("here");
      if (!option.available) return;
      this.selectedIdx = this.selectedIdx === idx ? -1 : idx;
    }
  }
};
</script>