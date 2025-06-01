import { createTestUser } from "./src/tests/setupTestUser"

beforeAll(async () => {
  await createTestUser();
})