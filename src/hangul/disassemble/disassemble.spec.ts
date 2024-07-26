import { disassemble } from "./disassemble";

describe("disassemble", () => {
  it("한글 문자열이 초성/중성/종성 단위로 완전히 분리된다.", () => {
    const words = ["안녕하세요", "값이 비싸다", "ㅘ", "ㅙ"];
    const results = [
      "ㅇㅏㄴㅕㅇㅎㅏㅅㅔㅇㅛ",
      "ㄱㅏㅂㅅㅇㅣ ㅂㅣㅆㅏㄷㅏ",
      "ㅗㅏ",
      "ㅗㅐ",
    ];
    words.forEach((word, index) => {
      expect(disassemble(word)).toBe(results[index]);
    });
  });
});
