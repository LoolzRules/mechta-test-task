<template>
  <div class="searchBox">
    <div class="searchBox__field">
      <input type="text"
             v-model="inputText"
             name="search"
             placeholder="Enter name of the city"
             autocomplete="off">
      <input type="button" @click="submit"
              value="Enter">
    </div>
    <span v-if="error" class="error">{{ errorText }}</span>
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  props: {
    validator: Function,
    errorText: String,
  },
  data: () => ({
    error: false,
    inputText: "",
  }),
  methods: {
    validate(event) {
      if (!this.validator) {
        return true;
      }

      if (!this.validator(this.inputText)) {
        this.error = true;
        event.preventDefault();
      }

      this.error = false;
      return true;
    },
    submit() {}
  }
};
</script>