<template>
  <div class="searchBox__wrap" :class="{'searchBox--error':error}">
    <div class="searchBox">
      <div class="searchBox__field">
        <input type="text"
               v-model="inputText"
               name="search"
               placeholder="Enter name of the city"
               @keyup.enter="submit"
               autocomplete="off">
        <button v-if="!submitted"
                @click="submit"
                value="Enter">Enter
        </button>
        <button v-else
                type="button"
                class="button--icon"
                @click="inputText = ''; submitted=false"
                value="Erase">
          <img :src="cross" alt="Erase">
        </button>
      </div>
    </div>
    <span v-if="error" class="searchBox__error">{{ errorText }}</span>
  </div>
</template>

<script>
import cross from "@/assets/icons/cross.svg";

export default {
  name: "SearchBox",
  props: {
    validator: Function,
    errorText: String,
    suggestions: Array
  },
  data: () => ({
    error: false,
    inputText: "",
    submitted: false,
    cross
  }),
  methods: {
    validate() {
      if (!this.validator)
        return;

      const textIsValid = this.validator(this.inputText);
      this.error = !textIsValid;
    },
    submit() {
      if (!this.inputText)
        return;

      this.validate();
      this.submitted = true;

      if (!this.error) {
        this.$emit('inputSubmitted', this.inputText);
      }
    }
  },
  computed: {
    filteredSuggestions() {
      return this.inputText ? this.suggestions.filter(s => s.match(new RegExp(`^${this.inputText}`, "i"))) : [];
    }
  }
};
</script>