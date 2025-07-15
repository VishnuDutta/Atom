window.addEventListener("DOMContentLoaded", () => {
  //Making Background opacity Light
  function makeBackgroundlight() {
    const rootBody = document.getElementsByClassName("rootbody")[0];
    const currentBackground = getComputedStyle(rootBody).backgroundImage;
    if (currentBackground.includes("linear-gradient")) {
      rootBody.style.backgroundImage = currentBackground.replace(
        "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),",
        ""
      );
    } else {
      rootBody.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), ${currentBackground}`;
    }
  }

  //-----------------------------Links Code Starts From here-----------------------------

  const links_show_toggle = document.getElementsByClassName("link")[0];
  const linkDropDown = document.getElementById("linkDropDown");
  const linkDropDown_left =
    document.getElementsByClassName("linkDropDown_left")[0];
  const linkDropDown_right =
    document.getElementsByClassName("linkDropDown_right")[0];
  const linkDropDown_plus_img = document.getElementById(
    "linkDropDown_plus_img"
  );
  const linkDropDown_back_img = document.getElementById(
    "linkDropDown_back_img"
  );
  const linkDropDown_cross_img = document.getElementById(
    "linkDropDown_cross_img"
  );

  links_show_toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    linkDropDown.classList.toggle("hidden");
    makeBackgroundlight(); // only make background light
  });

  linkDropDown.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", (e) => {
    if (!linkDropDown.classList.contains("hidden")) {
      if (
        !links_show_toggle.contains(e.target) &&
        !linkDropDown.contains(e.target)
      ) {
        linkDropDown.classList.add("hidden");
        makeBackgroundlight();
      }
    }
  });

  linkDropDown_plus_img.addEventListener("click", (e) => {
    e.stopPropagation();
    linkDropDown_left.style.display = "none";
    linkDropDown_right.style.display = "";
  });

  linkDropDown_back_img.addEventListener("click", (e) => {
    linkDropDown_left.style.display = "";
    linkDropDown_right.style.display = "none";
  });

  linkDropDown_cross_img.addEventListener("click", (e) => {
    linkDropDown.classList.toggle("hidden");
    makeBackgroundlight(); // only make background light
    linkDropDown_left.style.display = "";
    linkDropDown_right.style.display = "none";
  });

  // -----------------------------++ Links implementation-----------------------------

  //We will take all the links in an array of objects and then store it to localStorage as well

  const linkTitle = document.getElementById("linkTitle");
  const linkLinks = document.getElementById("linkLinks");
  const linkDropDown_bottom = document.getElementsByClassName(
    "linkDropDown_bottom"
  )[0];
  const link_sub_btn = document.getElementsByClassName("linksSubmit")[0];
  let links_stored = JSON.parse(localStorage.getItem("links_stored")) || [];

  links_stored.forEach((link) => {
    renderLinksElement(link);
  });

  function setLocalLinks() {
    localStorage.setItem("links_stored", JSON.stringify(links_stored));
  }

  function addLinks() {
    let tempTitleValue = linkTitle.value.trim();
    let tempLinksValue = linkLinks.value.trim();

    if (!tempLinksValue || !tempTitleValue) {
      return;
    }

    let obj = {
      linkTitle: tempTitleValue,
      linkLink: tempLinksValue,
    };

    links_stored.push(obj);
    setLocalLinks();
    renderLinksElement(obj);
  }

  function renderLinksElement(obje) {
    const div = document.createElement("div");
    div.className = "linkDropDown_bottom_item";

    let a = document.createElement("a");
    a.className = "linkDropDown_bottom_item";
    a.className = "linkDropDown_bottom_item_left";
    a.href = obje.linkLink;
    a.target = "_blank";

    const img = document.createElement("img");
    img.src = "/assets/chrome_sign.png";
    img.alt = "->";

    const span = document.createElement("p");
    span.textContent = obje.linkTitle;

    const img2 = document.createElement("img");
    img2.src = "/assets/delete_icon.png";
    img2.alt = "---";

    a.appendChild(img);
    a.appendChild(span);
    div.appendChild(a);
    div.appendChild(img2);

    linkTitle.value = "";
    linkLinks.value = "";

    linkDropDown_bottom.appendChild(div);

    img2.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log(links_stored);
      links_stored = links_stored.filter((t) => t.linkTitle !== obje.linkTitle);
      console.log(links_stored);
      setLocalLinks();
      console.log(setLocalLinks);
      img2.parentNode.remove();
    });
  }

  link_sub_btn.addEventListener("click", (e) => {
    e.preventDefault();
    addLinks();
    linkDropDown_left.style.display = "";
    linkDropDown_right.style.display = "none";
  });

  //-----------------------------Links Code Ends From here-----------------------------

  //-----------------------------Focus Code Starts From here-----------------------------

  const focus = document.getElementsByClassName("focus")[0];
  const focus_podometer = document.getElementsByClassName("focus_podometer")[0];
  const root_body = document.getElementsByClassName("rootbody")[0];
  const pause_podometer = document.getElementById("pause_podometer");
  const podo_start_audio = document.getElementById("pomo-start");
  const podo_stop_audio = document.getElementById("pomo-stop");
  // const podo_silence_audio = document.getElementById("pomo-silence");

  focus.addEventListener("click", () => {
    podo_start_audio.play();
    links_show_toggle.style.display = "none";
    focus.style.display = "none";
    calender_show_toggle.style.display = "none";
    weather_show_toggle.style.display = "none";
    quotes.style.display = "none";
    todolist.style.display = "none";
    clock_toogle.style.display = "none";
    settings_toggle.style.display = "none";
    // greeting.style.display = "none" ------------
    input_hours = 2;
    input_min = 20;
    input_sec = 40;
    runningStatus = true; // when i click focus the timer is on
    intervalId = null;
    overall_seconds = input_hours * 3600 + input_min * 60 + input_sec;

    let backgroundsize = 100;
    let filter_val = 0;

    start_podometer_timer();

    function focusinroot() {
      backgroundsize = Math.min(backgroundsize + 0.1, 110);
      filter_val = Math.min(filter_val + 0.01, 1);

      root_body.style.backgroundSize = `${backgroundsize}% ${backgroundsize}%`;
      root_body.style.filter = `blur(${filter_val}px)`;

      if (filter_val < 1 || backgroundsize < 110) {
        requestAnimationFrame(focusinroot);
      } else {
        showPdometer();
      }
    }
    requestAnimationFrame(focusinroot);
  });

  function showPdometer() {
    root_body.style.filter = `blur(0px)`;
    links_show_toggle.style.display = "inline-block";
    // focus.style.display = "inline-block"
    calender_show_toggle.style.display = "inline-block";
    weather_show_toggle.style.display = "inline-block";
    // quotes.style.display = "inline-block"
    todolist.style.display = "inline-block";
    // clock_toogle.style.display = "block"
    settings_toggle.style.display = "inline-block";
    focus_podometer.style.display = "flex";
    podometer_show_toogle.style.display = "flex";
    greeting.style.display = "none";
    start_podometer_timer();
  }

  function showClock() {
    root_body.style.filter = `blur(0px)`;
    links_show_toggle.style.display = "inline-block";
    focus.style.display = "inline-block";
    calender_show_toggle.style.display = "inline-block";
    weather_show_toggle.style.display = "inline-block";
    quotes.style.display = "inline-block";
    todolist.style.display = "inline-block";
    clock_toogle.style.display = "block";
    settings_toggle.style.display = "inline-block";
    focus_podometer.style.display = "none";
    podometer_show_toogle.style.display = "none";
    greeting.style.display = "inline-block";
  }

  //Clicking the Pause Option

  pause_podometer.addEventListener("click", () => {
    podo_stop_audio.play();
    focus_podometer.style.display = "none";
    links_show_toggle.style.display = "none";
    focus.style.display = "none";
    calender_show_toggle.style.display = "none";
    weather_show_toggle.style.display = "none";
    weather_show_toggle.style.display = "none";
    quotes.style.display = "none";
    todolist.style.display = "none";
    clock_toogle.style.display = "none";
    settings_toggle.style.display = "none";
    podometer_show_toogle.style.display = "none";
    podometer_focus_Btn.classList.add("podometer_focus_active");
    podometer_break_Btn.classList.remove("podometer_focus_active");
    reset_podometer();

    let backgroundsize = 110;
    let filter_val = 1;

    function focusoutroot() {
      backgroundsize = Math.max(backgroundsize - 0.1, 100);

      root_body.style.backgroundSize = `${backgroundsize}% ${backgroundsize}%`;

      if (backgroundsize > 100) {
        requestAnimationFrame(focusoutroot);
      } else {
        showClock();
      }
    }
    requestAnimationFrame(focusoutroot);
  });

  //-----------------------------Focus Code Ends From here-----------------------------

  // -----------------------------Podomometer Code starts From Here-----------------------------

  const podometer_show_toogle = document.getElementsByClassName("podometer")[0];
  let hours_Display = document.getElementsByClassName(
    "pomodometer_content_timer_hours"
  )[0];
  let minutes_Display = document.getElementsByClassName(
    "pomodometer_content_timer_minutes"
  )[0];
  let seconds_Display = document.getElementsByClassName(
    "pomodometer_content_timer_seconds"
  )[0];
  const podometer_focus_Btn = document.getElementById("podometer_focus_Btn");
  const podometer_break_Btn = document.getElementById("podometer_break_Btn");
  const podometer_pause_btn = document.getElementsByClassName(
    "podometer_pause_btn"
  )[0];
  let input_hours = 2;
  let input_min = 20;
  let input_sec = 40;
  let runningStatus = true; // when i click focus the timer is on

  let intervalId = null;
  let isPaused = false;
  let overall_seconds = 0;

  overall_seconds =
    parseInt(input_hours) * 3600 +
    parseInt(input_min) * 60 +
    parseInt(input_sec);

  podometer_pause_btn.addEventListener("click", () => {
    if (!runningStatus) {
      start_podometer_timer();
      podo_start_audio.play();
    } else {
      pause_podometer_Timer();
      podo_stop_audio.play();
    }
  });

  podometer_focus_Btn.addEventListener("click", () => {
    podometer_focus_Btn.classList.add("podometer_focus_active");
    podometer_break_Btn.classList.remove("podometer_focus_active");
    pause_podometer_Timer();
    input_hours = 2;
    input_min = 20;
    input_sec = 40;
    overall_seconds = input_hours * 3600 + input_min * 60 + input_sec;
    display_podometer(overall_seconds);
  });

  podometer_break_Btn.addEventListener("click", () => {
    podometer_focus_Btn.classList.remove("podometer_focus_active");
    podometer_break_Btn.classList.add("podometer_focus_active");
    pause_podometer_Timer();
    input_hours = 0;
    input_min = 5;
    input_sec = 0;
    overall_seconds = input_hours * 3600 + input_min * 60 + input_sec;
    display_podometer(overall_seconds);
  });

  function display_podometer(total_sec) {
    let hours = Math.floor(total_sec / 3600)
      .toString()
      .padStart(2, "0");
    total_sec = total_sec % 3600;
    let min = Math.floor(total_sec / 60)
      .toString()
      .padStart(2, "0");
    let sec = (total_sec % 60).toString().padStart(2, "0");

    hours_Display.innerHTML = hours;
    minutes_Display.innerHTML = min;
    seconds_Display.innerHTML = sec;
  }

  function start_podometer_timer() {
    if (intervalId === null) {
      intervalId = setInterval(() => {
        if (overall_seconds > 0) {
          overall_seconds -= 1;
          display_podometer(overall_seconds);
        } else {
          clearInterval(intervalId);
          intervalId = null;
        }
      }, 1000);
      runningStatus = true;
      isPaused = false;
    }
  }

  function pause_podometer_Timer() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
      isPaused = true;
      runningStatus = false;
    }
  }

  function reset_podometer() {
    pause_podometer_Timer();
    input_hours = 0;
    input_min = 0;
    input_sec = 0;
    overall_seconds = 0;
    overall_seconds = input_hours * 3600 + input_min * 60 + input_sec;
    display_podometer(overall_seconds);
    intervalId == null;
  }

  // -----------------------------Podomometer Code Ends From Here-----------------------------

  //-----------------------------Calender Code Starts From here-----------------------------

  const calender_show_toggle = document.getElementById("calender");
  const calenderDropDown = document.getElementById("calenderDropDown");

  calender_show_toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    calenderDropDown.classList.toggle("hidden");
    makeBackgroundlight(); // only make background light
  });

  calenderDropDown.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", (e) => {
    if (!calenderDropDown.classList.contains("hidden")) {
      if (
        !calender_show_toggle.contains(e.target) &&
        !calenderDropDown.contains(e.target)
      ) {
        calenderDropDown.classList.add("hidden");
        makeBackgroundlight();
      }
    }
  });

  // ----------------------------- ++ Calender Implementation Here-----------------------------

  const daysContainer = document.getElementById("calenderDays");
  const month_year = document.getElementById("calenderDropDown_month_year");
  const calenderDays = document.getElementById("calenderDays");
  const calenderPreBtn = document.getElementById(
    "calenderDropDown_top_btn_prev"
  );
  const calenderNextBtn = document.getElementById(
    "calenderDropDown_top_btn_next"
  );
  let currentDate = new Date();
  let today = new Date();

  const Calender_months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function renderCalender(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1).getDay(); //Konsa Day ajj hei
    const totalDays = new Date(year, month + 1, 0).getDate(); // Total Days Kitne hei

    month_year.textContent = `${Calender_months[month]} ${year}`;

    calenderDays.innerHTML = "";

    // Previous month Date
    const preMonthLastDay = new Date(year, month, 0).getDate();

    for (let i = firstDay; i > 0; i--) {
      const dayDiv = document.createElement("div");
      dayDiv.textContent = preMonthLastDay - i + 1;
      dayDiv.classList.add("fade");
      calenderDays.appendChild(dayDiv);
    }

    //Current Months Dates
    for (let i = 1; i <= totalDays; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.textContent = i;
      if (
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        dayDiv.classList.add("today");
      }
      calenderDays.appendChild(dayDiv);
    }

    //Next Month Dates

    const nextMonthFirstDay = 7 - new Date(year, month + 1, 0).getDay() - 1;
    for (let i = 1; i <= nextMonthFirstDay; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.textContent = i;
      dayDiv.classList.add("fade");
      calenderDays.appendChild(dayDiv);
    }
  }

  renderCalender(currentDate);

  calenderNextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalender(currentDate);
  });
  calenderPreBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalender(currentDate);
  });

  //-----------------------------Calender Code Ends From here-----------------------------

  //-----------------------------Weather Code Starts From here-----------------------------

  // Sare Elements ko lekr dalna pdeiga yahi option hei

  const weather_show_toggle = document.getElementById("weather");
  const weather_dropdown = document.getElementById("weather_dropdown");

  weather_show_toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    weather_dropdown.classList.toggle("hidden");
    makeBackgroundlight(); // only make background light
  });

  weather_dropdown.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", (e) => {
    if (!weather_dropdown.classList.contains("hidden")) {
      if (
        !weather_show_toggle.contains(e.target) &&
        !weather_dropdown.contains(e.target)
      ) {
        weather_dropdown.classList.add("hidden");
        makeBackgroundlight();
      }
    }
  });

  //-----------------------------++ Weather Implementation From here-----------------------------

  const weather_dash_img = document.getElementsByClassName("weather_img"); // HTML Node
  const temp_dash = document.getElementById("weather_top_temp_dash");
  const weather_city_dash = document.getElementsByClassName("wheather_city")[0];
  const weather_dropdown_top_left_block = document.getElementsByClassName(
    "weather_dropdown_top_left"
  )[0];
  const weather_dropdown_city = document.getElementsByClassName(
    "weather_dropdown_top_left_cityname"
  )[0];
  const weather_dropdown_status = document.getElementsByClassName(
    "weather_dropdown_top_left_status"
  )[0];
  const search_btn = document.getElementById("weather_dropdown_icon");
  const weather_input =
    "london" && document.getElementById("weather_dropdown_top_right_input");

  const weather_dropdown_top_right_input_div = document.getElementById(
    "weather_dropdown_top_right_input_div"
  );
  const weather_search_suggestions = document.getElementById(
    "weather_search_suggestions"
  );
  const weather_dropdown_temp = document.getElementById(
    "weather_dropdown_temp"
  );
  const weather_feels_like = document.getElementById("weather_feels_like");
  const weather_humidity = document.getElementById("humidity");
  const weather_windy = document.getElementById("windy");

  const weather_img_dash = document.getElementById("weather_img_dash");
  const weather_img_dropdown = document.getElementById("weather_img_drop");

  let debounceTimeout;

  // -------------------------Code is for the Search Results---------------------------
  weather_input.addEventListener("input", () => {
    const city_name = weather_input.value.trim();
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(async () => {
      if (city_name) {
        const url = `https://api.api-ninjas.com/v1/city?name=${city_name}&limit=1`;

        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "X-Api-Key": "EJgkaJa9geMsMJkG8vb7Zw==Z1jmNfvyJ5VJHw3i",
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new error(response.status);
          }
          const result = await response.json();
          search_weather_suggestion(result);
        } catch (error) {
          throw new error(error);
        }
      } else {
        weather_search_suggestions.innerHTML = "";
      }
    }, 250);
  });

  function search_weather_suggestion(data) {
    weather_search_suggestions.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      let li = document.createElement("li");
      li.textContent = data[i].name;
      li.addEventListener("click", () => {
        weather_input.value = data[i].name;
      });
      weather_search_suggestions.appendChild(li);
    }
  }

  // ------------------Code is for the weather Search----------------------

  search_btn.addEventListener("click", () => {
    weather_search_suggestions.innerHTML = "";
    weather_dropdown_top_right_input_div.classList.toggle("hidden");
    weather_dropdown_top_left_block.classList.toggle("hidden");
    if (weather_input.value) {
      weather_info_fetch(weather_input.value);
    }
  });

  let weather_stored = {
    name: "Delhi",
  };

  function set_weather_local() {
    localStorage.setItem("weather_stored", JSON.stringify(weather_stored));
  }

  let objsys = JSON.parse(localStorage.getItem("weather_stored"));

  if (objsys) {
    weather_info_fetch(objsys);
  }

  async function weather_info_fetch(data) {
    weather_stored = data;
    set_weather_local();

    const send_city_name = data.replace(/\s+/g, "");
    const api_key = atob("MTNjNjY3NTVjNjNhMWJmMmMyNTMyMmZhNDEyN2I5OTA="); // Decoded for security
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${send_city_name}&appid=${api_key}`; //this is an open API dont use my key anyone can use this.

    try {
      const raw_data = await fetch(url);
      if (!raw_data.ok) {
        throw new Error(`weather API response : ${raw_data.status}`);
      }

      const dataResponse = await raw_data.json();
      displayWeatherData(dataResponse);
    } catch (error) {
      throw new Error(error);
    }
    weather_input.value = "";
  }

  function displayWeatherData(data_obj) {
    const temC = data_obj.main.temp - 273.15;
    temp_dash.innerHTML = `${Math.floor(temC)}<span>&degC</span>`;
    weather_city_dash.textContent = data_obj.name;
    weather_dropdown_city.textContent = data_obj.name;
    weather_dropdown_status.textContent = `${data_obj.weather[0].description}`;
    weather_dropdown_temp.innerHTML = `${Math.floor(temC)}<span>&deg</span>`;
    weather_feels_like.textContent = `${data_obj.main.feels_like}`;
    weather_humidity.textContent = `${data_obj.main.humidity}mm`;
    weather_windy.textContent = `${Math.round(data_obj.wind.speed * 3.6)}`;

    if (temC < 0) {
      weather_img_dash.src = "/assets/snow_png.png";
      weather_img_dropdown.src = "/assets/snow_png.png";
    } else if (temC >= 0 && temC < 10) {
      weather_img_dash.src = "/assets/cloudy_img_png.png";
      weather_img_dropdown.src = "/assets/cloudy_img_png.png";
    } else if (temC >= 10 && temC < 20) {
      weather_img_dash.src = "/assets/windy_img_png.png";
      weather_img_dropdown.src = "/assets/windy_img_png.png";
    } else if (temC >= 20 && temC < 30) {
      weather_img_dash.src = "/assets/sunny_img_png.png";
      weather_img_dropdown.src = "/assets/sunny_img_png.png";
    } else {
      weather_img_dash.src = "/assets/rainy_img_png.png";
      weather_img_dropdown.src = "/assets/rainy_img_png.png";
    }
  }

  // weather_img_dash.src

  setInterval(() => {
    weather_info_fetch(objsys);
  }, 36000000);

  //-----------------------------Weather Code Ends From here-----------------------------

  // -----------------------------Clock Code Starts From Here-----------------------------

  const clock_toogle = document.getElementsByClassName("clock")[0];
  const hours = document.getElementsByClassName("hours")[0];
  const minutes = document.getElementsByClassName("Minutes")[0];
  const AMPM = document.getElementsByClassName("AMPM")[0];

  // function setClock(){
  //   let data = new Date();
  //   hours.textContent = data.getHours() % 12 || 12;
  //   minutes.textContent = String(data.getMinutes()).padStart(2, "0");

  //   if (data.getHours() < 12) {
  //     // AM
  //     AMPM.textContent = "AM";
  //   } else {
  //     // PM
  //     AMPM.textContent = "PM";
  //   }
  // }

  function setClock() {
    const data = new Date();
    hours.textContent = data.getHours() % 12 || 12;
    minutes.textContent = String(data.getMinutes()).padStart(2, "0");
    AMPM.textContent = data.getHours() < 12 ? "AM" : "PM";
    requestAnimationFrame(setClock);
  }

  window.requestAnimationFrame(setClock);
  // setClock();

  // setInterval(() => {
  //   setClock();
  // }, 60000);

  const greeting = document.getElementsByClassName("greeting")[0];

  // -----------------------------Clock Code Ends From Here-----------------------------

  // -----------------------------Greeting Name Code Ends From Here-----------------------------

  let ownerName = JSON.parse(localStorage.getItem("OwnerName")) || "";

  const profileToggle = document.getElementById("profile_toogle");
  const settings_dropup_left_profile_dropup = document.getElementsByClassName(
    "settings_dropup_left_profile_dropup"
  )[0];
  const addOwnerNameBtn = document.getElementById("addOwnerNameBtn");
  const ownerInputName = document.getElementById("ownerInputName");
  const ownerNameInjectionSettings = document.getElementById("ownerNameInjectionSettings");
  const ownerNameDashboard = document.getElementById("ownerNameDashboard");

  function addOwnerToLocal(){
    localStorage.setItem("OwnerName" , JSON.stringify(ownerName));
  }

  profileToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("clicked");

    if (settings_dropup_left_profile_dropup.style.display == "none") {
      settings_dropup_left_profile_dropup.style.display = "flex";
    } else {
      settings_dropup_left_profile_dropup.style.display = "none";
    }
  });

  addOwnerNameBtn.addEventListener("click" , (e)=>{
    e.stopPropagation();
    ownerName = ownerInputName.value;
    addOwnerToLocal();
    addOwnerName();
    settings_dropup_left_profile_dropup.style.display = "none";
  })

  addOwnerName()

  function addOwnerName(){
    ownerNameInjectionSettings.textContent = `${ownerName}`;
    ownerNameDashboard.textContent = `, ${ownerName}`;
  }
  

  // -----------------------------Greating Name Code Ends From Here-----------------------------

  // -----------------------------Settings Code Starts From Here-----------------------------

  const settings_toggle = document.getElementById("settings");
  const settings_dropup = document.getElementById("settings_toggle");
  const settingsImg = document.getElementById("settingsImg");
  const linksshowlabel = document.getElementById("linksshowlabel");
  const focusshowlabel = document.getElementById("focusshowlabel");
  const Calendershowlabel = document.getElementById("Calendershowlabel");
  const weathershowlabel = document.getElementById("weathershowlabel");
  const greetingshowlabel = document.getElementById("greetingshowlabel");
  const quoteshowlabel = document.getElementById("quoteshowlabel");
  const tasksshowlabel = document.getElementById("tasksshowlabel");

  settings.addEventListener("click", (e) => {
    e.stopPropagation();
    settings_dropup.classList.toggle("hidden");
    makeBackgroundlight();
  });

  settings_dropup.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", (e) => {
    if (!settings_dropup.classList.contains("hidden")) {
      if (
        !settingsImg.contains(e.target) &&
        !settings_toggle.classList.contains(e.target) &&
        !settings_dropup.classList.contains(e.target)
      ) {
        settings_dropup.classList.add("hidden");
        makeBackgroundlight();
      }
    }
  });

  linksshowlabel.addEventListener("click", () => {
    if (links_show_toggle.style.display == "none") {
      links_show_toggle.style.display = "inline-block";
    } else {
      links_show_toggle.style.display = "none";
    }
  });

  focusshowlabel.addEventListener("click", () => {
    if (focus.style.display == "none") {
      focus.style.display = "inline-block";
    } else {
      focus.style.display = "none";
    }
  });

  Calendershowlabel.addEventListener("click", () => {
    if (calender_show_toggle.style.display == "none") {
      calender_show_toggle.style.display = "inline-block";
    } else {
      calender_show_toggle.style.display = "none";
    }
  });

  weathershowlabel.addEventListener("click", () => {
    if (weather_show_toggle.style.display == "none") {
      weather_show_toggle.style.display = "inline-block";
    } else {
      weather_show_toggle.style.display = "none";
    }
  });

  greetingshowlabel.addEventListener("click", () => {
    if (greeting.style.display == "none") {
      greeting.style.display = "inline-block";
    } else {
      greeting.style.display = "none";
    }
  });

  quoteshowlabel.addEventListener("click", () => {
    if (quotes.style.display == "none") {
      quotes.style.display = "inline-block";
    } else {
      quotes.style.display = "none";
    }
  });

  tasksshowlabel.addEventListener("click", () => {
    if (todolist.style.display == "none") {
      todolist.style.display = "inline-block";
    } else {
      todolist.style.display = "none";
    }
  });

  // -----------------------------Settings Code Ends From Here-----------------------------

  // -----------------------------Quotes Code Starts From Here-----------------------------

  const quotes_toogle = document.getElementsByClassName("quotes")[0];
  let tab = document.getElementById("quotes");
  const url = "https://quotes15.p.rapidapi.com/quotes/random/?language_code=en";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "57e03e9dd3mshc6787869786c601p1ce298jsne0e4e84698dc",
      "x-rapidapi-host": "quotes15.p.rapidapi.com",
    },
  };

  let fetchData = async () => {
    try {
      tab.style.backgroundColor = "";
      let response = await fetch(url, options);
      if (!response.ok) {
        throw new error(`HTTP ERROR ${response.status}`);
      }
      let data = await response.json();
      tab.textContent = data.content;
    } catch (error) {
      tab.textContent = error;
    }
  };

  fetchData();

  setInterval(() => {
    fetchData();
  }, 600000);

  // -----------------------------Quotes Code Ends From Here-----------------------------

  // -----------------------------Todolist Code Starts From Here-----------------------------

  const todolist = document.getElementById("todolist");
  const todolist_dropup = document.getElementById("todolist_dropup");
  const todolist_input_value = document.getElementById("todolist_input_text");
  const todolist_add_button = document.getElementById("todolist_add_Button");
  const todolist_dropup_top_ul = document.getElementsByClassName(
    "todolist_dropup_top_ul"
  )[0];
  const checkboxitem = document.getElementById("checkboxitem");
  let todo_task = JSON.parse(localStorage.getItem("todolist")) || [];

  todolist.addEventListener("click", (e) => {
    e.stopPropagation();
    todolist_dropup.classList.toggle("hidden");
    makeBackgroundlight();
  });

  todolist_dropup.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!todolist_dropup.classList.contains("hidden")) {
      if (!todolist.contains(e.target) && !todolist_dropup.contains(e.target)) {
        todolist_dropup.classList.add("hidden");
        makeBackgroundlight();
      }
    }
  });

  todolist_add_button.addEventListener("click", () => {
    addTodoItem();
  });

  todo_task.forEach((task) => {
    rendertodoElement(task);
  });

  function setLocalTodo() {
    localStorage.setItem("todolist", JSON.stringify(todo_task));
  }

  function addTodoItem() {
    let value = todolist_input_value.value.trim();

    if (!value) {
      return;
    }

    let task_status = false;
    let obj = {
      status: task_status,
      val: value,
    };

    todo_task.push(obj);
    setLocalTodo();
    rendertodoElement(obj);
  }

  function rendertodoElement(data) {
    let li = document.createElement("li");
    li.setAttribute("class", "todo_list_added");

    li.innerHTML = `
    <input type = "checkbox" name="checkboxitem" id="checkboxitem">
    <p>${data.val}</p>
    <img src="/assets/delete_icon.png" alt="" />
    `;
    todolist_dropup_top_ul.appendChild(li);

    todolist_input_value.value = "";

    li.addEventListener("click", (e) => {
      e.stopPropagation();

      if (e.target.tagName == "INPUT") {
        li.classList.toggle("todo_completed");
        data.status = !data.status;
        setLocalTodo();
      }
      if (e.target.tagName == "IMG") {
        todo_task = todo_task.filter((t) => t.val !== data.val);
        setLocalTodo();
        li.remove();
      }
    });

    if (data.status == true) {
      li.classList.add("todo_completed");
      li.querySelector("input").checked = true;
    }
  }

  // -----------------------------Todolist Code Ends From Here-----------------------------

  // Background change
  function changeBackgroundImg() {
    let i = 1;
    const rootBody = document.getElementsByClassName("rootbody")[0];
    let currentBackground = getComputedStyle(rootBody).backgroundImage;
    let backgroundImages = [
      "/assets/horse_land.png",
      "/assets/Landscape_land.png",
      "/assets/City_land.jpg",
      "/assets/Night_Land.jpg",
      "/assets/Volcano_Land.jpg",
      "/assets/Warrior_Land.jpg",
      "/assets/Flowers Landscape.png",
      "/assets/Tree_night_land.jpg",
    ];
    setInterval(() => {
      rootBody.style.backgroundImage = `url(${backgroundImages[i]})`;
      i = (i + 1) % backgroundImages.length;
    }, 900000);
    // 900000
  }

  changeBackgroundImg();
});
