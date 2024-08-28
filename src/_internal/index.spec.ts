import {
  assert,
  excludeLastElement,
  hasProperty,
  isBlank,
  joinString,
} from ".";

describe("excludeLastElement", () => {
  const testArray = [1, 2, 3, 4, "ㄱ", "ㄴ", "ㄷ"] as const;

  it("배열의 마지막 요소를 제외한 배열과 마지막 요소를 배열에 담아 반환한다.", () => {
    const result = excludeLastElement(testArray);
    expect(result).toEqual([[1, 2, 3, 4, "ㄱ", "ㄴ"], "ㄷ"]);
  });
  it("입력 배열이 비어 있으면 빈 배열과 undefined를 반환한다.", () => {
    const result = excludeLastElement([]);

    expect(result).toEqual([[], undefined]);
  });

  it("배열에 단 하나의 요소만 있는 경우, 빈배열과 그 요소를 반환한다", () => {
    const result = excludeLastElement(["apple"]);

    expect(result).toEqual([[], "apple"]);
  });
});

describe("joinString", () => {
  it("문자열을 합쳐 반환한다.", () => {
    const result = joinString("a", "b", "c");
    expect(result).toBe("abc");
  });
  it("인자가 주어지지 않았을 때 빈 문자열을 반환한다.", () => {
    expect(joinString()).toBe("");
  });
});

describe("isBlank", () => {
  it("문자가 공백이면 true를 반환한다", () => {
    expect(isBlank(" ")).toBe(true);
  });

  it("문자가 공백이 아니면 false를 반환한다", () => {
    expect(isBlank("a")).toBe(false);
  });
});

describe("assert", () => {
  it("조건이 참이면 에러를 던지지 않는다", () => {
    expect(() => assert(true)).not.toThrowError();
  });

  it("조건이 거짓이면 에러를 던진다", () => {
    expect(() => assert(false)).toThrowError("Invalid condition");
  });

  it("조건이 거짓이고 에러 메시지가 제공된 경우 사용자 정의 에러 메시지를 던져야 한다", () => {
    const customMessage = "Custom error message";

    expect(() => assert(false, customMessage)).toThrowError(customMessage);
  });
});

describe("hasProperty", () => {
  const testObj = { ㄱ: "ㄱ", ㄴ: "ㄴ", ㄷ: "ㄷ" } as const;

  it("객체에 속성이 존재하면 true를 반환한다.", () => {
    const testKey = "ㄱ";
    expect(hasProperty(testObj, testKey)).toBe(true);
  });

  it("객체에 속성이 존재하지 않으면 false를 반환한다.", () => {
    const testKey = "ㄹ";
    expect(hasProperty(testObj, testKey)).toBe(false);
  });

  it("객체에 속성이 존재한다면 두 번째 인자의 타입을 좁힌다.", () => {
    const testKey = "ㄱ" as string;

    if (hasProperty(testObj, testKey)) {
      expectTypeOf(testKey).toEqualTypeOf<"ㄱ" | "ㄴ" | "ㄷ">();
    } else {
      expectTypeOf(testKey).toEqualTypeOf<string>();
    }
  });
});
