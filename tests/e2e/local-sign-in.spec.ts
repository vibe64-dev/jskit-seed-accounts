import { expect, test } from "@playwright/test";

const BASE_URL = String(process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:5173").replace(/\/+$/u, "");
const LOGIN_RETURN_TO_HOME = /\/auth\/login\?returnTo=(?:%2F|\/)home/u;
const VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1280, height: 900 }
];

async function expectWelcomeScreenToFit(page) {
  await expect(page.getByRole("heading", { name: "Welcome to App" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Sign out" })).toBeVisible();

  const metrics = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth
  }));
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);

  const signOutHeight = await page.getByRole("link", { name: "Sign out" }).evaluate(
    (element) => element.getBoundingClientRect().height
  );
  expect(signOutHeight).toBeGreaterThanOrEqual(48);
}

test("local account can register, sign in, reach the protected welcome screen, and sign out", async ({ page }) => {
  const accountId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const email = `local-sign-in-${accountId}@example.test`;
  const password = `LocalPass!${accountId}`;

  await page.goto(`${BASE_URL}/home`);
  await expect(page).toHaveURL(LOGIN_RETURN_TO_HOME);
  await expect(page.getByTestId("auth-mode-register")).toBeVisible();

  await page.getByTestId("auth-mode-register").click();
  await expect(page.getByRole("heading", { name: "Create your account" })).toBeVisible();
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByLabel("Confirm password").fill(password);
  await page.getByTestId("auth-submit").click();

  await expect(page).toHaveURL(/\/home$/u);
  await expect(page.getByRole("heading", { name: "Welcome to App" })).toBeVisible();
  await expect(page.getByText("You are signed in with your local account.")).toBeVisible();

  for (const viewport of VIEWPORTS) {
    await page.setViewportSize(viewport);
    await expectWelcomeScreenToFit(page);
  }

  await page.getByRole("link", { name: "Sign out" }).click();
  await expect(page).toHaveURL(LOGIN_RETURN_TO_HOME);

  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByTestId("auth-submit").click();

  await expect(page).toHaveURL(/\/home$/u);
  await expect(page.getByRole("heading", { name: "Welcome to App" })).toBeVisible();

  await page.getByRole("link", { name: "Sign out" }).click();
  await expect(page).toHaveURL(LOGIN_RETURN_TO_HOME);

  await page.goto(`${BASE_URL}/home`);
  await expect(page).toHaveURL(LOGIN_RETURN_TO_HOME);
});
