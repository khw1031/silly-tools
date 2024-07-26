import { engToHangul } from "./eng-to-hangul";

describe("engToHangul", () => {
  it("should work", () => {
    const hangul = engToHangul("dkssudgktpdy");
    expect(hangul).toBe("안녕하세요");
  });
});
