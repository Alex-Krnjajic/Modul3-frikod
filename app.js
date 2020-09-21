const waitForSeconds = (seconds) => {
  return new Promise((resolve, reject) => {
    if (seconds > 10) {
      reject("error, timeout");
    }

    setTimeout(() => {
      resolve(" seconds:" + seconds);
    }, seconds * 1000);
  });
};

const info = document.querySelector(".info");

async function getClipboard() {
  try {
    const clipboard = await navigator.clipboard.readText();
    info.innerText = "Current clipboard: \n" + clipboard;
  } catch (err) {
    info.innerText = "Failed to read clipboard contets";
  }
}
function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let geolocation =
    "Geolocation: \nLatitude: " + latitude + "\nLongitude: " + longitude;
  info.innerText = geolocation;
}
function getAppName() {
  let appName = "App name: \n" + navigator.appName;
  info.innerText = appName;
}

async function timer() {
  let time = parseInt(document.querySelector(".timeInput").value);
  console.log(time);
  const timeText = await waitForSeconds(time);
  console.log("after time");
  let bodyColor = document.querySelector("body").style.background;

  document.querySelector("body").style.background = bodyColor.indexOf("red")
    ? "red"
    : "yellow";
  document.querySelector("h1").innerText = timeText;
}

const loadCat = () => {
  fetch("https://api.thecatapi.com/v1/images/search")
    .then((string) => {
      return string.json();
    })
    .then((json) => {
      const catImgUrl = json[0].url;
      document.querySelector("img").src = catImgUrl;
    })
    .catch(() => {
      document.querySelector("img").innerText = " couldn't load image";
    });
};

document.querySelector(".loadCatButton").addEventListener("click", loadCat);
document.querySelector(".confirm").addEventListener("click", timer);
document.querySelector(".app").addEventListener("click", getAppName);
document.querySelector(".location").addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(getPosition);
});
document.querySelector(".clipboard").addEventListener("click", getClipboard);
