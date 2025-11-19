import axios from "axios";
const HttpsProxyAgent = require("https-proxy-agent");

describe("API Login + Logout via Proxy", () => {

  it("should login (201) and then logout (201)", async () => {

    const proxyUrl = "http://eakpnvxn-US:0u5tgdyktk1e@154.6.83.196:6667";
    const agent = new HttpsProxyAgent(proxyUrl);

    // ========= LOGIN =========
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
    console.log("Login response:", login.data);

    expect(login.status).toBe(201);

    // ====== Extract token ======
    const token =
      login.data.token ||
      login.data.AuthorizationToken ||
      login.data.accessToken;

    if (!token) throw new Error("Token not returned");

    // ========= LOGOUT =========
    const logout = await axios.post(
      "https://api.luckystake.dev/player/crm/logout",
      {},
      {
        httpsAgent: agent,
        validateStatus: () => true,
        headers: {
          "authorization": `Bearer ${token}`,
          "x-platform": "web",
          "x-site-id": "5138631f-8d60-4327-b46c-8a4e41d68c93",
          "origin": "https://luckystake.dev",
          "accept": "application/json",
          "content-type": "application/json"
        }
      }
    );

    console.log("Logout status:", logout.status);
    console.log("Logout response:", logout.data);

    expect(logout.status).toBe(201);
  });

});


