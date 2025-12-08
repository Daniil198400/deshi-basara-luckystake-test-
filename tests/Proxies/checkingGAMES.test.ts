jest.setTimeout(35000);

import axios from "axios";
import createHttpsProxyAgent from "https-proxy-agent";   // v5 API — правильно!

const proxies = [
  { label: "New York", url: "http://eakpnvxn-US:0u5tgdyktk1e@154.6.83.196:6667" },
  { label: "Dulles", url: "http://eakpnvxn-US:0u5tgdyktk1e@173.239.219.78:5987" },
  { label: "Chicago", url: "http://eakpnvxn-US:0u5tgdyktk1e@136.0.194.76:6813" }
];

function pickRandomProxy() {
  return proxies[Math.floor(Math.random() * proxies.length)];
}

function sleep(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}

describe("Login + Visit Game Link API", () => {

  it("should login and call game link", async () => {

    const chosen = pickRandomProxy();
    console.log("Using proxy:", chosen.label);

    const agent = createHttpsProxyAgent(chosen.url);  

    // ========== LOGIN ==========

    const login = await axios.post(
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

    console.log("Login status:", login.status);
    console.log("Login data:", login.data);

    if (login.status !== 201) {
      throw new Error("Login failed: " + JSON.stringify(login.data));
    }

    // ======== FIXED TOKEN EXTRACTION =========
    const token =
      login.data.AuthorizationToken ||
      login.data.accessToken ||
      login.data.token;

    if (!token) {
      console.log("Full login response:", login.data);
      throw new Error("No token returned");
    }

    await sleep(1500);

    // ========== GAME LINK REQUEST ==========

    const url =
      "https://api.luckystake.dev/games/link/3792?platform=2&locale=en&country_code=US&currency=SC&c=Popular&p=8";

    const gameLink = await axios.get(url, {
      httpsAgent: agent,
      validateStatus: () => true,
      headers: {
        authorization: `Bearer ${token}`,
        "x-platform": "web",
        "x-site-id": "5138631f-8d60-4327-b46c-8a4e41d68c93",
        origin: "https://luckystake.dev"
      }
    });

    console.log("GameLink status:", gameLink.status);
    console.log("GameLink data:", gameLink.data);

    expect(gameLink.status).toBe(200);

  }, 35000);

});
