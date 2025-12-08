import axios from "axios";
const HttpsProxyAgent = require("https-proxy-agent");

function randomEmail() {
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `robin_test_${randomPart}@gmail.com`;
}

describe("API Sign-Up via Proxy", () => {

  it("should create a new player (201 Created)", async () => {

    const proxyUrl = "http://eakpnvxn-US:0u5tgdyktk1e@136.0.194.76:6813";
    const agent = new HttpsProxyAgent(proxyUrl);

    const email = randomEmail();
    console.log("Generated email:", email);

    const payload = {
      isEmailNewsletter: true,
      allowPromotions: true,
      citizenship: "US",
      language: "ru",
      gender: "other",
      email: email,
      password: "Qwerty1!",
      currency: "GC",
      isUserAgreement: true,
      birthDate: null,
      referralCode: "",
      affiliateInformation: {
        fullUrl: "https://luckystake.dev/",
        product: 1
      },
      address: {
        state: "FL",
        addressCountryAlfa2: "US"
      }
    };

    const response = await axios.post(
      "https://api.luckystake.dev/player/crm/sign-up",
      payload,
      {
        httpsAgent: agent,
        validateStatus: () => true,
        headers: {
          "x-platform": "web",
          "x-site-id": "5138631f-8d60-4327-b46c-8a4e41d68c93",
          "origin": "https://luckystake.dev",
          "referer": "https://luckystake.dev/",
          "content-type": "application/json",
          "accept": "application/json, text/plain, */*",

          // === КРИТИЧЕСКИЕ browser-like headers ===
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
            "AppleWebKit/537.36 (KHTML, like Gecko) " +
            "Chrome/120.0.0.0 Safari/537.36",

          "sec-ch-ua": "\"Chromium\";v=\"120\", \"Not A(Brand\";v=\"24\"",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-ch-ua-mobile": "?0"
        }
      }
    );

    console.log("Status:", response.status);
    console.log("Response:", response.data);

    expect(response.status).toBe(201);
  });

});
