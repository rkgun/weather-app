<template>
<div class="relative w-10/12 mx-auto px-8 py-8 my-8">
    <table class="sm:shadow-2xl border-collapse w-full">
        <thead class="sm:visible invisible absolute sm:relative bg-gray-100 w-full">
            <tr class="border-t-2 border-gray-400 flex w-full relative">
                <th class="text-center text-gray-700 capitalize px-4 py-4 w-1/3">City Name</th>
                <th class="text-center text-gray-700 capitalize px-4 py-4 w-1/3">City State</th>
                <th class="text-center text-gray-700 capitalize px-4 py-4 w-1/3">City Weather</th>
            </tr>
        </thead>
        <tbody class="w-full">
            <tr v-for="city in c.cities" :key="city.id" class="bg-white shadow-lg sm:shadow-none mb-6 sm:mb-0 flex flex-row flex-wrap cursor-pointer hover:bg-gray-100 sm:flex-no-wrap border-l-2 border-r-2 hover:border-gray-600" @click="previewCity(city)">
                <td class="pl-4 pt-8 sm:pt-0 pb-2 text-center relative w-1/3 border-t border-l sm:border-l-0 border-gray-400 sm:flex-1">
                    <span class="font-bold font-thin text-xs text-gray-700 uppercase sm:hidden absolute top-0 inset-x-0 p-1 bg-gray-300 pl-2"></span>
                    {{ city.city }}
                </td>
                <td class="pl-4 pt-8 sm:pt-0 pb-2 text-center text-gray-800 relative w-1/3 border-t border-l border-r sm:border-l-0 sm:border-r-0 border-gray-400">
                    <span class="font-bold font-thin text-xs text-gray-700 uppercase sm:hidden absolute top-0 inset-x-0 p-1 bg-gray-300 pl-2"></span>
                    {{ city.state }}
                </td>
                <td class="pl-4 sm:pl-0 pt-8 sm:pt-0 pb-2 sm:text-center text-center text-gray-800 relative w-1/3 border-t border-l sm:border-l-0 border-gray-400">
                    <span class="font-bold font-thin text-xs text-gray-700 uppercase sm:hidden absolute top-0 inset-x-0 p-1 bg-gray-300 pl-2"></span>
                    {{ city.temperature }}
                </td>
            </tr>
        </tbody>
    </table>
</div>


</template>

<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const c = reactive({
    cities: []
});

const router = useRouter();

const previewCity = (s) => {
    const city = s.city;
    const state = s.state;
    router.push({
        name: "cityView",
        params: { state: state.replace(/\s+/g, ""), city: city },
        query: {
            lat: s.lat,
            lng: s.long,
            preview: true,
        },
    });
};

const fetchCities = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/cities');
        const data = await response.json();
        c.cities = data;
        for (const city of c.cities) {
            try {
                const weatherData = await getWeatherData(city.lat, city.long);
                city.temperature = `${Math.round(weatherData.current.temp)}°`;
            } catch (error) {
                console.error('Error fetching weather:', error);
                city.temperature = 'N/A';
            }
        }

    } catch (error) {
        console.error('Error fetching cities:', error);
    }
};


const getWeatherData = async (lat, long) => {
    try {
      const weatherData = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
      );
  
      // cal current date & time
      const localOffset = new Date().getTimezoneOffset() * 60000;
      const utc = weatherData.data.current.dt * 1000 + localOffset;
      weatherData.data.currentTime =
        utc + 1000 * weatherData.data.timezone_offset;
  
      // cal hourly weather offset
      weatherData.data.hourly.forEach((hour) => {
        const utc = hour.dt * 1000 + localOffset;
        hour.currentTime =
          utc + 1000 * weatherData.data.timezone_offset;
      });
  
      return weatherData.data;
    } catch (err) {
      console.log(err);
    }
  };
fetchCities(); // fetchCities fonksiyonunu çağırarak şehir verilerini hemen yükleyin
</script>
