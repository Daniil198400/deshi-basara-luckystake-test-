import axios from "axios";
const HttpsProxyAgent = require("https-proxy-agent");

// Увеличиваем timeout ДО выполнения теста
jest.setTimeout(20000);

// Генерация случайного email
function generateEmail() {
  const rand = Math.random().toString(36).substring(2, 10);
  return `robin_test_${rand}@gmail.com`;
}

// Registration ожидаемо даст 403, т.к. US IP
const EXPECTED_SIGNUP_STATUS = 403;

describe("Registration flow: validate → sign-up", () => {

  it("should validate email, then try to register user", async () => {

    const proxyUrl = "http://eakpnvxn-US:0u5tgdyktk1e@173.239.219.78:5987";
    const agent = new HttpsProxyAgent(proxyUrl);

    const email = generateEmail();
    console.log("Generated email:", email);

    // -----------------------------
    // 1. VALIDATE EMAIL
    // -----------------------------
    const validateResponse = await axios.post(
      "https://api.luckystake.dev/player/crm/validate",
      { type: "email", payload: email },
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

    console.log("Validate status:", validateResponse.status);
    console.log("Validate response:", validateResponse.data);
    expect(validateResponse.status).toBe(201);

    // -----------------------------
    // 2. SIGN-UP (US GEO → always 403)
    // -----------------------------
    const registrationPayload = {
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

    const signUpResponse = await axios.post(
      "https://api.luckystake.dev/player/crm/sign-up",
      registrationPayload,
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

    console.log("Sign-up status:", signUpResponse.status);
    console.log("Sign-up response:", signUpResponse.data);

    expect(signUpResponse.status).toBe(EXPECTED_SIGNUP_STATUS);
  });

});
