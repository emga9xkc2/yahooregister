setInterval(() => {
  let qr = document.querySelector("#GameCanvas");
  if (qr) {
    qr.remove();
  }

  let txt = document.querySelector("textarea[data-token]");
  if (txt) {
    let obj = JSON.parse(txt.value);

    chrome.runtime.sendMessage(
      {
        action: "send_data",
        url: obj.url,
        post_data: obj.data,
      },
      (response) => {
        if (response == "success") {
          let done = document.createElement("textarea");
          done.setAttribute("done", "1");
          document.body.appendChild(done);
        }
      }
    );
    txt.remove();
  }
}, 100);
