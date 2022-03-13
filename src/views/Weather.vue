<template>
  <div class="main-div">
    <div class="main-div-child"></div>
    <div class="weather-main">
      <div v-if="geoData != null" class="geodata-format">
        <p>
          {{ geoData.results[0].components.country }} |
          {{ geoData.results[0].components.city }} |
          {{ geoData.results[0].components.state }}
        </p>
      </div>
      <div class="input-group-format">
        <b-input-group>
          <b-input-group-prepend>
            <span class="input-group-text">
              <b-icon icon="map"></b-icon>
              &nbsp; Enter Zip:
            </span>
          </b-input-group-prepend>
          <b-form-input
            class="text-gradient"
            v-model="weatherZip"
            placeholder="Enter Zip"
            @keyup.enter="getZip()"
          ></b-form-input>
          <b-button @click="locateMe">Get location</b-button>
          <b-input-group-prepend>
            <b-form-select
              class="icon-select"
              v-model="selected"
              :options="weatherIconSelect"
            ></b-form-select>
          </b-input-group-prepend>
        </b-input-group>
      </div>
      <weather-current
        class="weather-current-area"
        v-if="geoData != null"
        v-model="formatCurrentData"
      />
      <weather-daily v-if="geoData != null" v-model="formatDailyData" />
      <weather-minutely v-if="geoData != null" v-model="formatMinutelyData" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as d3 from "d3";
import WeatherAlert from "../components/weather/WeatherAlert.vue";
import WeatherCurrent from "../components/weather/WeatherCurrent.vue";
import WeatherDaily from "../components/weather/WeatherDaily.vue";
import WeatherHourly from "../components/weather/WeatherHourly.vue";
import WeatherMinutely from "../components/weather/WeatherMinutely.vue";
import WeatherThermometer from "../components/weather/WeatherThermometer.vue";
import threejs from "../components/backgrounds/threejs.vue";
export default {
  components: {
    WeatherAlert,
    WeatherCurrent,
    WeatherDaily,
    WeatherHourly,
    WeatherMinutely,
    WeatherThermometer,
    threejs,
  },
  data: function () {
    return {
      openWeatherData: [],
      openWeatherZip: [],
      weatherZip: "",
      iconsize: 2,
      location: null,
      gettingLocation: false,
      errorStr: null,
      geoData: null,
      newIconFile: null,
      weatherIconSelect: [
        "light",
        "dark",
        "colorful",
        "flat_white",
        "flat_black",
        "flat_colorful",
      ],
      selected: "dark",
      weatherIconTable: [
        {
          TimeofDay: "Day",
          Icon: "01d",
          DayIcon: "01d.png",
          NewIcon: "32",
          NewIconFile: "32.svg",
          Description: "clear sky",
        },
        {
          TimeofDay: "Day",
          Icon: "02d",
          DayIcon: "02d.png ",
          NewIcon: "34",
          NewIconFile: "34.svg",
          Description: "few clouds",
        },
        {
          TimeofDay: "Day",
          Icon: "03d",
          DayIcon: "03d.png ",
          NewIcon: "28",
          NewIconFile: "28.svg",
          Description: "scattered clouds",
        },
        {
          TimeofDay: "Day",
          Icon: "04d",
          DayIcon: "04d.png ",
          NewIcon: "26",
          NewIconFile: "26.svg",
          Description: "broken clouds",
        },
        {
          TimeofDay: "Day",
          Icon: "09d",
          DayIcon: "09d.png ",
          NewIcon: "40",
          NewIconFile: "40.svg",
          Description: "shower rain",
        },
        {
          TimeofDay: "Day",
          Icon: "10d",
          DayIcon: "10d.png ",
          NewIcon: "39",
          NewIconFile: "39.svg",
          Description: "rain",
        },
        {
          TimeofDay: "Day",
          Icon: "11d",
          DayIcon: "11d.png ",
          NewIcon: "00",
          NewIconFile: "00.svg",
          Description: "thunderstorm",
        },
        {
          TimeofDay: "Day",
          Icon: "13d",
          DayIcon: "13d.png ",
          NewIcon: "14",
          NewIconFile: "14.svg",
          Description: "snow",
        },
        {
          TimeofDay: "Day",
          Icon: "50d",
          DayIcon: "50d.png ",
          NewIcon: "19",
          NewIconFile: "19.svg",
          Description: "mist",
        },
        {
          TimeofDay: "Night",
          Icon: "01n",
          DayIcon: "01n.png ",
          NewIcon: "31",
          NewIconFile: "31.svg",
          Description: "clear sky",
        },
        {
          TimeofDay: "Night",
          Icon: "02n",
          DayIcon: "02n.png ",
          NewIcon: "33",
          NewIconFile: "33.svg",
          Description: "few clouds",
        },
        {
          TimeofDay: "Night",
          Icon: "03n",
          DayIcon: "03n.png ",
          NewIcon: "29",
          NewIconFile: "29.svg",
          Description: "scattered clouds",
        },
        {
          TimeofDay: "Night",
          Icon: "04n",
          DayIcon: "04n.png ",
          NewIcon: "26",
          NewIconFile: "26.svg",
          Description: "broken clouds",
        },
        {
          TimeofDay: "Night",
          Icon: "09n",
          DayIcon: "09n.png ",
          NewIcon: "40",
          NewIconFile: "40.svg",
          Description: "shower rain",
        },
        {
          TimeofDay: "Night",
          Icon: "10n",
          DayIcon: "10n.png ",
          NewIcon: "45",
          NewIconFile: "45.svg",
          Description: "rain",
        },
        {
          TimeofDay: "Night",
          Icon: "11n",
          DayIcon: "11n.png ",
          NewIcon: "00",
          NewIconFile: "00.svg",
          Description: "thunderstorm",
        },
        {
          TimeofDay: "Night",
          Icon: "13n",
          DayIcon: "13n.png ",
          NewIcon: "14",
          NewIconFile: "14.svg",
          Description: "snow",
        },
        {
          TimeofDay: "Night",
          Icon: "50n",
          DayIcon: "50n.png ",
          NewIcon: "21",
          NewIconFile: "21.svg",
          Description: "mist",
        },
      ],
    };
  },
  mounted: function () {},
  methods: {
    getNewIcon(input) {
      for (var i = 0; i < this.weatherIconTable.length; i++) {
        if (this.weatherIconTable[i].Icon == input) {
          return this.weatherIconTable[i].NewIconFile;
        }
      }
    },
    async getLocation() {
      return new Promise((resolve, reject) => {
        if (!("geolocation" in navigator)) {
          reject(new Error("Geolocation is not available."));
        }

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            resolve(pos);
          },
          (err) => {
            reject(err);
          }
        );
      });
    },
    async locateMe() {
      this.gettingLocation = true;
      try {
        this.gettingLocation = false;
        this.location = await this.getLocation();
        this.getWeather(
          this.location.coords.latitude,
          this.location.coords.longitude
        );
        this.getGeoData(
          this.location.coords.latitude,
          this.location.coords.longitude
        );
      } catch (e) {
        this.gettingLocation = false;
        this.errorStr = e.message;
      }
    },
    getZip: function () {
      const api_key = process.env.VUE_APP_OPEN_WEATHER_MAP_API_KEY;
      axios
        .get(
          `https://api.openweathermap.org/geo/1.0/zip?zip=${this.weatherZip},US&appid=${api_key}`
        )
        .then((response) => {
          this.getWeather(response.data.lat, response.data.lon),
            (this.openWeatherZip = response.data);
        })
        .catch((error) => console.log(error));
    },

    getWeather: function (varlat, varlon) {
      const api_key = process.env.VUE_APP_OPEN_WEATHER_MAP_API_KEY;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${varlat}&lon=${varlon}&units=imperial&appid=${api_key}`
        )
        .then((response) => (this.openWeatherData = response.data));
      this.getGeoData(varlat, varlon);
      this.getNewIcon();
    },
    getGeoData: function (geolat, geolon) {
      const api_key = process.env.VUE_APP_OPEN_CAGE_DATA_API_KEY;
      axios
        .get(
          `https://api.opencagedata.com/geocode/v1/json?key=${api_key}&q=${geolat}%2C+${geolon}&pretty=1&no_annotations=1`
        )
        .then((response) => (this.geoData = response.data));
    },
    toTimestamp: function (strDate) {
      var datum = Date.parse(strDate);

      return datum;
    },

    formatDate: function (date) {
      var dateTime = new Date(date * 1000);
      var month = parseInt(dateTime.getMonth()) + 1;
      var day = dateTime.getDate();
      var year = dateTime.getFullYear();
      //var fullDate = month + "-" + day + "-" + year;
      var localDate = dateTime.toDateString();
      var fullDate = localDate;
      return fullDate;
    },
    toTitleCase: function (str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    },
    formatTime: function (date) {
      var dateTime = new Date(date * 1000);
      var fullTime = dateTime.toLocaleTimeString();
      var fullDate = fullTime;
      return fullDate;
    },

    formatDateTime: function (date) {
      var dateTime = new Date(date * 1000);
      var fullTime =
        dateTime.toLocaleDateString() + " " + dateTime.toLocaleTimeString();
      var fullDate = fullTime;
      return fullDate;
    },

    formatD3Date: function (date) {
      const parseDate = d3.timeFormat("%Y-%m-%d");
      return parseDate(date * 1000);
    },
    degToCompass: function (num) {
      var val = Math.floor(num / 22.5 + 0.5);
      var arr = [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW",
      ];
      return arr[val % 16];
    },
  },

  computed: {
    formatDailyData: function () {
      var formattedArray = new Array();
      var nullData = {
        day: "",
        max: "",
        min: "",
        morn: "",
        night: "",
        dt: "",
        weatherdesc: "",
        weathericon: "",
      };

      if (this.openWeatherData.daily == undefined) {
        formattedArray.push(nullData);
      } else {
        for (const item of this.openWeatherData.daily) {
          var formattedData = {
            day: item.temp.day.toFixed(),
            max: item.temp.max.toFixed(),
            min: item.temp.min.toFixed(),
            morn: item.temp.morn.toFixed(),
            night: item.temp.night.toFixed(),
            dt: this.formatDate(item.dt),
            dttest: this.formatD3Date(item.dt),
            dttestagain: this.toTimestamp(this.formatDate(item.dt)),
            weatherdesc: this.toTitleCase(item.weather[0].description),
            weathericon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@${this.iconsize}x.png`,
            weatherfile: this.getNewIcon(item.weather[0].icon),
            iconselected: this.selected,
          };
          formattedArray.push(formattedData);
        }
      }
      return formattedArray;
    },
    formatHourlyData: function () {
      var formattedArray = new Array();
      var nullData = {
        dt: 0,
        temp: 0,
        feels_like: 0,
        pressure: 0,
        humidity: 0,
        dew_point: 0,
        uvi: 0,
        clouds: 0,
        visibility: 0,
        wind_speed: 0,
        wind_deg: 0,
        wind_gust: 0,
      };

      if (this.openWeatherData.hourly == undefined) {
        formattedArray.push(nullData);
      } else {
        for (const item of this.openWeatherData.hourly) {
          var formattedData = {
            dt: this.formatDate(item.dt),
            dttime: this.formatTime(item.dt),
            temp: item.temp,
            feels_like: item.feels_like,
            pressure: item.pressure,
            humidity: item.humidity,
            dew_point: item.dew_point,
            uvi: item.uvi,
            clouds: item.clouds,
            visibility: item.visibility,
            wind_speed: item.wind_speed,
            wind_deg: item.wind_deg,
            wind_gust: item.wind_gust,
          };
          formattedArray.push(formattedData);
        }
      }
      return formattedArray;
    },
    formatMinutelyData: function () {
      var formattedArray = new Array();
      var nullData = {
        dt: 0,
        precipitation: 0,
      };

      if (this.openWeatherData.minutely == undefined) {
        formattedArray.push(nullData);
      } else {
        for (const item of this.openWeatherData.minutely) {
          var formattedData = {
            dt: item.dt,
            precipitation: item.precipitation,
            dtformatted: this.formatTime(item.dt),
          };
          formattedArray.push(formattedData);
        }
      }
      return formattedArray;
    },
    formatCurrentData: function () {
      var item = this.openWeatherData.current;
      var formattedArray = new Array();
      var nullData = {
        dew_point: "",
        feels_like: "",
        humidity: "",
        pressure: "",
        temp: "",
        uvi: "",
        dt: "",
        sunrise: "",
        sunset: "",
        weatherdesc: "",
        weathericon: "",
      };
      if (this.openWeatherData.current == undefined) {
        formattedArray.push(nullData);
      } else {
        var formattedData = {
          dew_point: item.dew_point.toFixed(),
          feels_like: item.feels_like.toFixed(),
          humidity: item.humidity.toFixed(),
          pressure: item.pressure.toFixed(),
          temp: item.temp.toFixed(),
          uvi: item.uvi.toFixed(),
          dt: this.formatDate(item.dt),
          sunrise: this.formatTime(item.sunrise),
          sunset: this.formatTime(item.sunset),
          location: this.openWeatherZip.name,
          weatherdesc: item.weather[0].description,
          weathericon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@${this.iconsize}x.png`,
          wind_speed: item.wind_speed.toFixed(),
          wind_direction: this.degToCompass(item.wind_deg),
          wind_deg: item.wind_deg,
          wind_style: "transform: rotate(" + item.wind_deg + "deg)",
          wind_gust: this.openWeatherData.daily[0].wind_gust.toFixed(),
          weatherfile: this.getNewIcon(item.weather[0].icon),
          iconselected: this.selected,
        };
        formattedArray.push(formattedData);
      }
      return formattedArray;
    },
    formatAlertData: function () {
      var formattedArray = new Array();
      var nullData = {
        event: "None",
        sender_name: "System",
        description: "No active weather alerts.",
        start: "",
        end: "",
      };

      if (this.openWeatherData.alerts == undefined) {
        formattedArray.push(nullData);
      } else {
        for (const item of this.openWeatherData.alerts) {
          var formattedData = {
            event: item.event,
            sender_name: item.sender_name,
            description: item.description,
            descriptionform: item.description.replace(/\*/g, "\n\r"),
            start: this.formatDateTime(item.start),
            end: this.formatDateTime(item.end),
            location: this.openWeatherZip.name,
          };
          formattedArray.push(formattedData);
        }
      }
      return formattedArray;
    },
  },
};
</script>

<style scoped>
.weather-current-area {
  margin: 10px;
}
.geodata-format {
  color: white;
  display: inline-flex;
}
.input-group-format {
  max-width: 90%;
}
.main-div {
}
.main-div-child {
}
#weather-minutely {
}
.weather-main {
}
</style>
