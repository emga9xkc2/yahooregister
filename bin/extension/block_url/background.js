function downloadFile(filename, content) {
  // Tạo một blob với nội dung là text/plain
  const blob = new Blob([content], { type: "text/plain" });

  // Tạo URL từ blob
  const url = window.URL.createObjectURL(blob);

  // Tạo một phần tử <a> để tải xuống file
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  // Thêm <a> vào DOM và mô phỏng nhấp chuột
  document.body.appendChild(a);
  a.click();

  // Dọn dẹp
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
let domainBlockStartWith = [
  "https://sb.scorecardresearch.com/",
  "https://www.yahoo.com/_td_api/beacon/",
  "https://mail.yahoo.com/xobni/v4/contacts",
  "https://udc.yahoo.com/",
  "https://mail.yahoo.com/xobni",
  "https://a.beap.gemini.yahoo.com/",
  "https://mail.yahoo.com/d/log",
  "https://jsapi.login.yahoo.com/",
  "https://mail.yahoo.com/comscore_beacon/d/folders/1/page_view.htm",
  "https://mail.yahoo.com/public/js/rapidworker",
  "https://mail.yahoo.com/ws/v3/batch?name=settings.get",
  "https://mail.yahoo.com/psearch/v3/suggestions",
  "https://mail.yahoo.com/ws/v3/batch?name=postLaunch.postSync",
  "https://mail.yahoo.com/psearch/v3/recentSearches",
  "https://mail.yahoo.com/ws/v3/batch?name=messages.readFlagUpdate",
  "https://mail.yahoo.com/apps/directly",
  "https://3p-udc.yahoo.com/v2/public/yql",
  "https://3p-geo.yahoo.com",
];
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    let url = details.url;
    let method = details.method;
    // if (url.includes("https://play.google.com/log")) {
    //   return {
    //     cancel: true,
    //   };
    // }
    if (url.includes("/browserinfo?")) {
      return {
        cancel: true,
      };
    }

    if (method === "POST" && details.requestBody) {
      if (details.requestBody.formData) {
        // Dữ liệu dạng form
        let formData = details.requestBody.formData;
        let stop = false;
        for (let key in formData) {
          formData[key].forEach((value) => {
            if (value.includes("03AF")) {
              if (url.includes("https://www.facebook.com/api/graphql")) {
                stop = true;
                let regex = /03AF[a-zA-Z0-9_-]+/;
                let match = value.match(regex);

                if (match && match[0]) {
                  // Chèn mã JavaScript vào tab hiện tại để lưu vào localStorage
                  chrome.tabs.query(
                    { active: true, currentWindow: true },
                    // { currentWindow: true },
                    function (tabs) {
                      console.log("up retoken");
                      console.log(match[0]);

                      chrome.tabs.executeScript(tabs[0].id, {
                        code: `
                        localStorage.setItem('recaptcha_token', '${match[0]}');
                      `,
                      });
                    }
                  );
                }
              }
            }
          });
        }
        if (stop) {
          return {
            cancel: true,
          };
        }
      }
    }

    if (
      url.indexOf(".png") > 0 ||
      url.indexOf(".gif") > 0 ||
      url.indexOf(".jpg") > 0 ||
      url.indexOf(".svg") > 0 ||
      url.indexOf(".jpeg") > 0 ||
      url.indexOf(".ico") > 0
    ) {
      // let body = ArrayBuffers_String(details.requestBody.raw[0].bytes);
      // let json = JsonParse(body);
      // let captcha_response = json.captcha_response;
      //console.log(captcha_response);
      return {
        cancel: true,
      };
    }
    if (
      url.indexOf("https://web.hitclub.top/") == 0 &&
      url.indexOf(".js") > 0
    ) {
      return {
        cancel: true,
      };
    }

    for (const domain of domainBlockStartWith) {
      if (url.indexOf(domain) === 0) {
        return {
          cancel: true,
        };
      }
    }

    if (url.indexOf("https://opus.analytics.yahoo.com") == 0) {
      return {
        cancel: true,
      };
    }
    if (url.indexOf("https://opus.analytics.yahoo.com/") == 0) {
      return {
        cancel: true,
      };
    }
    if (url.indexOf("https://edge-mcdn.secure.yahoo.com/") == 0) {
      return {
        cancel: true,
      };
    }
    if (url.indexOf("https://geo.yahoo.com/") == 0) {
      return {
        cancel: true,
      };
    }
    if (url.indexOf("https://mail.yahoo.com/d/gemini_api") == 0) {
      return {
        cancel: true,
      };
    }
    if (url.indexOf("https://gpt.mail.yahoo.net/") == 0) {
      return {
        cancel: true,
      };
    }
    if (url.indexOf("https://consent.cmp.oath.com/") == 0) {
      return {
        cancel: true,
      };
    }

    if (url.indexOf(".woff2") > 0) {
      return {
        cancel: true,
      };
    }
    if (url.indexOf("ttps://cdnjs.cloudflare.com/") > 0) {
      return {
        cancel: true,
      };
    }
    if (url.indexOf("ttps://unpkg.com/") > 0) {
      return {
        cancel: true,
      };
    }
    if (url.includes("https://support.google.com/apis/cufinsert")) {
      return {
        cancel: true,
      };
    }
    if (
      url.indexOf("raw.githubusercontent.com/") > 0 ||
      url.indexOf("/project.8f02a.js") > 0 ||
      url.indexOf("/cocos2d-js-min.a3a4b.js") > 0
    ) {
      return {
        cancel: true,
      };
    }
    if (
      url.indexOf("/enterprise/clr") > 0 ||
      url.indexOf("/enterprise/bcn") > 0 ||
      url.indexOf("/jserrorlogging") > 0
    ) {
      return {
        cancel: true,
      };
    }
    console.log("url: " + url);
  },
  { urls: ["<all_urls>"] },
  ["requestBody", "blocking"]
);
