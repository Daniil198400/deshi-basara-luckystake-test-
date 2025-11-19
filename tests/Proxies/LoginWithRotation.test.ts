import axios from "axios";
const HttpsProxyAgent = require("https-proxy-agent");

//
// === ROTATION OF 3 US PROXIES ===
//
const proxies = [
  {
    label: "New York",
    url: "http://eakpnvxn-US:0u5tgdyktk1e@154.6.83.196:6667"
  },
  {
    label: "Dulles",
    url: "http://eakpnvxn-US:0u5tgdyktk1e@173.239.219.78:5987"
  },
  {
    label: "Chicago",
    url: "http://eakpnvxn-US:0u5tgdyktk1e@136.0.194.76:6813"
  }
];

// берет случайный прокси каждый запуск
function pickRandomProxy() {
  return proxies[Math.floor(Math.random() * proxies.length)];
}

describe("API Login via Proxy (Rotating 3 Proxies)", () => {

  it("should return 201 Created", async () => {

    // Выбираем один случайный proxy
    const chosen = pickRandomProxy();
    console.log("Using proxy:", chosen.label, chosen.url);

    const agent = new HttpsProxyAgent(chosen.url);

    const response = await axios.post(
      "https://api.luckystake.dev/player/crm/login",
      {
        email: "dksld1@gmail.com",
        password: "Qwerty1!",
        remember: false
      },
      {
        httpsAgent: agent,
        validateStatus: () => true,
        headers: {
          "x-platform": "web",
          "x-site-id": "5138631f-8d60-4327-b46c-8a4e41d68c93",
          "origin": "https://luckystake.dev",
          "accept": "application/json",
          "content-type": "application/json"
        }
      }
    );

    console.log("Status:", response.status);
    console.log("Response:", response.data);

    expect(response.status).toBe(201);
  });

});
