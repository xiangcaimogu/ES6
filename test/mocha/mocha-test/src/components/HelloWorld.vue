<template>
  <div class="hello">
    <date-picker :value="now"></date-picker>
  </div>
</template>

<script>
import DatePicker from "@/components/DatePicker";
export default {
  name: "HelloWorld",
  components: {
    DatePicker
  },
  data() {
    return {
      now: new Date()
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
