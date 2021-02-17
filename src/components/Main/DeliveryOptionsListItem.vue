<template>
  <li class="deliveryOptionsList__item" :class="{'deliveryOptionsList__item--unavailable': !opt.available}">
    <div class="wrapper">
      <div class="text_wrapper">
        <h4 class="item__name">{{deliveryOptionName}}</h4>
        <p v-if="!opt.available" class="item__isUnavailable">Not available in that city</p>
        <h4 class="item__price">{{deliveryOptionPrice}}</h4>
      </div>
      <img :src="deliveryOptionImage" alt="delivery option logo" class="item__type">
    </div>
    <img v-if="selected"
         :src="check"
         alt="selected"
         class="item__isSelected" />
  </li>
</template>

<script>
import ApiResponseItem from "@/models/ApiResponseItem";
import option_pickup from "@/assets/DeliveryOptionsList/option_pickup.svg";
import option_courier from "@/assets/DeliveryOptionsList/option_courier.svg";
import option_post from "@/assets/DeliveryOptionsList/option_post.svg";
import check from "@/assets/icons/check.svg";

export default {
  name: "DeliveryOptionsListItem",
  props: {
    opt: ApiResponseItem,
    selected: Boolean
  },
  data: () => ({
    check,
  }),
  computed: {
    deliveryOptionImage() {
      switch (this.opt.type) {
        case "pickup":
          return option_pickup;
        case "courier":
          return option_courier;
        case "post":
          return option_post;
        default:
          return null;
      }
    },
    deliveryOptionName() {
      switch (this.opt.type) {
        case "pickup":
          return "Pick Up";
        case "courier":
          return "Courier";
        case "post":
          return "Post";
        default:
          return null;
      }
    },
    deliveryOptionPrice() {
      return `$${this.opt.price.toFixed(2)}`;
    },
  }
};
</script>

<style lang="scss">

</style>