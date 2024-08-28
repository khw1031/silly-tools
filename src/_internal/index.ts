type OmitLast<T extends any[]> = T extends [...infer Rest, infer _]
  ? Rest
  : never;
type Last<T extends any[]> = T extends [...infer _, infer L] ? L : never;

export const excludeLastElement = <T extends any[]>(
  array: readonly [...T],
): [OmitLast<T>, Last<T>] => {
  const restElement = array.slice(0, -1) as OmitLast<T>;
  const lastElement = array[array.length - 1] as Last<T>;
  return [restElement, lastElement];
};

export const joinString = (...args: string[]): string => {
  return args.join("");
};

export const isBlank = (character: string) => {
  return /^\s$/.test(character);
};

export const assert = (
  condition: boolean,
  errorMessage?: string,
): asserts condition => {
  if (condition === false) {
    throw new Error(errorMessage ?? "Invalid condition");
  }
};

export const hasProperty = <T extends object, K extends PropertyKey>(
  obj: T,
  key: K,
): key is K & keyof T => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

/**
 
key is K & keyof T

"타입 가드"
타입 가드는 특정 조건이 true일 때 변수의 타입을 좁히는 역할을 한다.

key is
함수가 true를 반환할 때 key의 타입이 무엇인지 TS에게 알려준다.

K & keyof T
keyof T는 객체 T의 모든 키의 타입을 나타낸다.
K & keyof T는 K와 T의 키 타입의 교집합을 의미한다. 즉 K가 T의 키 중 하나일 때만 true가 된다.

key is K & keyof T는 함수가 true를 반환할 때 key가 T 객체의 키 중 하나임을 TS에게 알려준다. 따라서 이 함수는 주어진 객체에 특정 키가 존재하는지 확인하고, 존재한다면 TS에게 key가 객체의 키 중 하나임을 보장한다. 이렇게 하면 이후 코드에서 key를 해당 객체의 키로 안전하게 사용할 수 있다.


interface Person {
  name: string;
  age: number;
  address?: string;
}

const person: Person = {
  name: "John",
  age: 30,
};

function getProperty<T extends object, K extends PropertyKey>(obj: T, key: K): any {
  if (hasProperty(obj, key)) {
    // 여기서 TypeScript는 key가 T 객체의 키 중 하나임을 알기 때문에 안전하게 접근 가능
    return obj[key];
  } else {
    return undefined;
  }
}

const name = getProperty(person, "name"); // "John"
const age = getProperty(person, "age"); // 30
const address = getProperty(person, "address"); // undefined
const nonExistent = getProperty(person, "nonExistent"); // undefined


https://velog.io/@yonghyeun/TS-is-%EC%97%B0%EC%82%B0%EC%9E%90%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%A0%95%EC%9D%98-%ED%83%80%EC%9E%85-%EA%B0%80%EB%93%9C-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0

*/
