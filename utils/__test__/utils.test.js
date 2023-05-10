import { capitaliseFirstLetter } from "../";

describe("Utils", () => {
    test("capitaliseFirstLetter", () => {
        expect(capitaliseFirstLetter("test")).toBe("Test");
    });
});
