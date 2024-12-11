let url = location.href;
console.log(url);
if (url.includes("https://www.google.com/recaptcha/enterprise/anchor")) {
  setInterval(() => {
    let alert = document.querySelector(".rc-anchor-alert");
    if (alert) {
      if (alert.textContent == "reload") {
        location.reload();
      }
    }
  }, 2000);
}
