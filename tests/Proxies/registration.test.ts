import axios from "axios";
const HttpsProxyAgent = require("https-proxy-agent");

// Функция генерации случайного email
function randomEmail() {
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `robin_test_${randomPart}@gmail.com`;
}

describe("API Sign-Up via Proxy", () => {

  it("should create a new player (201 Created)", async () => {

    // ТВОЙ рабочий прокси
const proxyUrl = "http://eakpnvxn-US:0u5tgdyktk1e@173.239.219.78:5987";
    const agent = new HttpsProxyAgent(proxyUrl);

    // генерируем рандомный email
    const email = randomEmail();
    console.log("Generated email:", email);

    const payload = {
      isEmailNewsletter: true,
      allowPromotions: true,
      citizenship: "US",
      language: "ru",
      gender: "other",
      email: email,                 // <---- RANDOM EMAIL
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
