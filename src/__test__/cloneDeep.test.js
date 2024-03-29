import cloneDeep from "../js";

describe("cloneDeep 함수 객체 테스트", () => {
  test("cloneDeep 함수는 객체를 깊은 복사하며 불변성을 유지하는가?", () => {
    const obj = {
      a: 1,
      b: "문자",
    };
    const copy = cloneDeep(obj);
    obj.a = 5;
    obj.b = "b";

    const results = [
      Object.is(obj, copy), // 복사본이 원본과 같은 객체인가? false
      Object.is(copy.a, 5), // 복사본의 a 프로퍼티가 원본과 같은가? false
      Object.is(copy.b, "b"), // 복사본의 b 프로퍼티가 원본과 같은가? false
    ];

    expect(results).toEqual(Array(results.length).fill(false));
  });

  test("cloneDeep 함수는 중첩된 객체를 깊은 복사하며 불변성을 유지하는가?", () => {
    const origin = {
      a: 1,
      b: {
        c: {
          d: 2,
        },
      },
    };
    const copy = cloneDeep(origin);
    origin.a = 5;
    origin.b.c.d = true;

    const results = [
      Object.is(origin, copy), // 복사본이 원본과 같은 객체인가? false
      Object.is(copy.a, 5), // 복사본의 a 프로퍼티가 원본과 같은가? false
      Object.is(origin.b, copy.b), // 복사본의 b 프로퍼티가 원본과 같은가? false
      Object.is(origin.b.c, copy.b.c), // 복사본의 b.c 프로퍼티가 원본과 같은가? false
      Object.is(copy.b.c.d, true), // 복사본의 b.c.d 프로퍼티가 원본과 같은가? false
    ];

    expect(results).toEqual(Array(results.length).fill(false));
  });

  test("cloneDeep 함수는 복잡한 객체를 깊은 복사하며 불변성을 유지하는가?", () => {
    const me = {
      name: "Son",
      emails: ["네이버", "구글"],
      address: {
        city: "Seoul",
      },
      frameworks: new Map([
        ["front", "React"],
        ["back", "Node"],
      ]),
    };

    const copy = cloneDeep(me);
    me.name = "zeromountain";
    me.emails.push("다음");
    me.address.city = "Busan";
    me.frameworks.set("back", "Nest");

    const results = [
      Object.is(me, copy),
      Object.is(copy.name, "zeromountain"),
      Object.is(me.emails, copy.emails),
      Object.is(me.address, copy.address),
      Object.is(copy.address.city, "Busan"),
      Object.is(me.frameworks, copy.frameworks),
      Object.is(copy.frameworks.get("back"), "Nest"),
    ];

    expect(results).toEqual(Array(results.length).fill(false));
  });
});

describe("cloneDeep 함수 배열 테스트", () => {
  test("cloneDeep 함수는 배열을 깊은 복사하는가?", () => {
    const arr = [1, 2, 3];
    const copy = cloneDeep(arr);

    arr.push("a");
    arr.unshift("b");

    const results = [
      Object.is(arr, copy),
      Object.is(arr.length, copy.length),
      Object.is(arr[0], copy[0]),
      Object.is(arr.at(-1), copy.at(-1)),
    ];

    expect(results).toEqual(Array(results.length).fill(false));
  });
});

describe("cloneDeep 함수 Map 테스트", () => {
  test("cloneDeep 함수는 Map을 깊은 복사하는가?", () => {
    const originMap = new Map();
    originMap.set("front", "nextjs");
    originMap.set("back", "nestjs");

    const copy = cloneDeep(originMap);

    originMap.set("front", "react");
    originMap.set("back", "node");
    originMap.set("fullstack", "MERN");

    const results = [
      Object.is(originMap, copy),
      Object.is(originMap.size, copy.size),
      Object.is(copy.get("front"), "react"),
      Object.is(copy.get("back"), "node"),
      Object.is(copy.get("fullstack"), "MERN"),
    ];

    expect(results).toEqual(Array(results.length).fill(false));
  });
});

describe("cloneDeep 함수 Set 테스트", () => {
  test("cloneDeep 함수는 Set을 깊은 복사하는가?", () => {
    const originSet = new Set([1, 2, 3]);
    const copy = cloneDeep(originSet);
    originSet.add(4);

    const results = [
      Object.is(originSet, copy),
      Object.is(originSet.size, copy.size),
      Object.is(copy.has(4), false),
      // Object.is(copy.isSubsetOf(originSet), true), // copy가 originSet의 부분집합인가? => node 미지원
    ];

    expect(results).toEqual(
      Array.from({ length: results.length }).map((_, index) =>
        index === results.length - 1 ? true : false
      )
    );
  });

  test("cloneDeep 함수로 복사된 Set 객체는 원본 Set 객체의 부분집합인가?", () => {
    const originSet = new Set([1, 2, 3]);
    const copy = cloneDeep(originSet);
    originSet.add(4);

    const results = Array.from(originSet).map(([key, _]) => copy.has(key));

    console.log({ results });

    expect(results).toEqual([true, true, true, false]);
  });
});

describe("cloneDeep 함수 Date 테스트", () => {
  test("cloneDeep 함수는 Date를 깊은 복사하는가?", () => {
    const date = new Date();
    const copy = cloneDeep(date);
    date.setFullYear(2021);
    date.setMonth(10);
    date.setDate(10);

    const results = [
      Object.is(date, copy),
      Object.is(copy.getFullYear(), 2021),
      Object.is(copy.getMonth(), 10),
      Object.is(copy.getDate(), 10),
    ];

    expect(results).toEqual(Array(results.length).fill(false));
  });
});

describe("cloneDeep 함수 regExp 테스트", () => {
  test("cloneDeep 함수는 regExp를 깊은 복사하는가?", () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const originPattern = emailRegex.source;
    const originFlags = emailRegex.flags;

    const copy = cloneDeep(emailRegex);

    const results = [
      Object.is(emailRegex, copy),
      Object.is(copy.source, originPattern),
      Object.is(copy.flags, originFlags),
    ];

    expect(results).toEqual([false, true, true]);
  });
});
