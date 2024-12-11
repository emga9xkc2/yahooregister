function FindProxyForURLz(url, host) {
  if (host === "www.google.com" || host === "ipv6.icanhazip.com") {
    return "PROXY 45.77.110.17:10004";
  } else {
    return "DIRECT";
  }
}
