<template>
  <div class="searchBox__wrap" :class="{'searchBox--error':error}">
    <div class="searchBox">
      <div class="searchBox__field" :class="{'active': enteringText}">
        <input type="text"
               v-model="inputText"
               name="search"
               ref="input"
               placeholder="Enter name of the city"
               @keyup.enter="submit"
               @focus="enteringText = true"
               @keyup.esc="handleEsc"
               autocomplete="off">
        <button v-if="!submitted || inputText.length === 0"
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
        <ul class="citiesList searchBox__field__suggestions">
          <template v-if="filteredSuggestions.length > 0">
            <li v-for="s in filteredSuggestions"
                :key="s"
                @click="() => setInputText(s)"
                class="citiesList__item">
              {{ s }}
            </li>
          </template>
          <li class="citiesList__item" v-else>No suggestions</li>
        </ul>
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
    enteringText: false,
    cross
  }),
  methods: {
    setInputText(text) {
      this.inputText = text;
      this.$refs.input.focus();
    },
    validate() {
      if (!this.validator)
        return;

      const textIsValid = this.validator(this.inputText);
      this.error = !textIsValid;
    },
    submit() {
      this.enteringText = false;
      if (!this.inputText)
        return;

      this.validate();
      this.submitted = true;

      if (!this.error) {
        this.$emit('inputSubmitted', this.inputText);
      }
    },
    handleEsc(event) {
      event.target.blur();
      this.enteringText = false;
    }
  },
  computed: {
    filteredSuggestions() {
      return this.inputText ? this.suggestions.filter(s => s.match(new RegExp(`^${this.inputText}`, "i"))) : [];
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/search_box";
</style>