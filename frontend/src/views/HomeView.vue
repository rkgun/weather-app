<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <ul class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]" v-if="mapboxResults">
        <p class="py-2" v-if="searchError">
          Sorry, something went wrong, please try again.
        </p>
        <p class="py-2" v-if="!searchError && mapboxResults.length === 0">
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li v-for="searchResult in mapboxResults" :key="searchResult.id" class="py-2 cursor-pointer" @click="previewCity(searchResult)" >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from "vue-router";

const router = useRouter();
const previewCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(",");
  router.push({
    name: "cityView",
    params: { state: state.replaceAll(" ", ""), city: city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });
};

const searchQuery = ref("")
const queryTimeOut = ref(null)
const mapboxResults = ref(null)
const searchError = ref(null);
const mapboxAPIKey = "pk.eyJ1IjoicmVkZGF5IiwiYSI6ImNsdjZkN215aDBjYngyanJ6aGc0cXpsMXMifQ.cSxcxFclmxisAXiSJu2cAw"
const getSearchResults = () => {
  clearTimeout(queryTimeOut);
  queryTimeOut.value = setTimeout(async () => {
    if(searchQuery !== ""){
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        );
        mapboxResults.value = (await result).data.features;
      } catch {
        searchError.value = true;
      }
        return;

    }
    mapboxResults.value = null;
  },300)
}

</script>
