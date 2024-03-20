import cloneDeep from "../js";

describe("cloneDeep 함수 객체 테스트", () => {
  test("cloneDeep 함수는 객체를 깊은 복사하는가?", () => {
    const obj = {
      a: 1,
      b: "문자열",
    };
    const copy = cloneDeep(obj);

    expect(obj !== copy).toEqual(true);
  });

  test("cloneDeep 함수는 중첩된 객체를 깊은 복사하는가?", () => {
    const obj = {
      a: 1,
      b: {
        c: {
          d: 2,
        },
      },
    };
    const copy = cloneDeep(obj);

    const results = [
      obj !== copy,
      obj.a === copy.a,
      obj.b !== copy.b,
      obj.b.c !== copy.b.c,
      obj.b.c.d === copy.b.c.d,
    ];

    expect(results).toEqual(Array(results.length).fill(true));
  });

  test("cloneDeep 함수는 복잡한 객체를 깊은 복사하는가?", () => {
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

    const results = [
      me !== copy,
      me.name === copy.name,
      me.emails !== copy.emails,
      me.address !== copy.address,
      me.address.city === copy.address.city,
      me.frameworks !== copy.frameworks,
    ];

    expect(results).toEqual(Array(results.length).fill(true));
  });
});

describe("cloneDeep 함수 배열 테스트", () => {
  test("cloneDeep 함수는 배열을 깊은 복사하는가?", () => {
    const arr = [1, 2, 3];
    const copy = cloneDeep(arr);

    expect(arr !== copy).toEqual(true);
  });
});

describe("cloneDeep 함수 Map 테스트", () => {
  test("cloneDeep 함수는 Map을 깊은 복사하는가?", () => {
    const map = new Map();
    map.set("front", "nextjs");
    map.set("back", "nestjs");

    const copy = cloneDeep(map);

    expect(map !== copy).toEqual(true);
  });
});

describe("cloneDeep 함수 Set 테스트", () => {
  test("cloneDeep 함수는 Set을 깊은 복사하는가?", () => {
    const set = new Set();
    set.add(1);
    set.add(2);
    const copy = cloneDeep(set);

    expect(set !== copy).toEqual(true);
  });
});

describe("cloneDeep 함수 Date 테스트", () => {
  test("cloneDeep 함수는 Date를 깊은 복사하는가?", () => {
    const date = new Date();
    const copy = cloneDeep(date);

    expect(date !== copy).toEqual(true);
  });
});

describe("cloneDeep 함수 regExp 테스트", () => {
  test("cloneDeep 함수는 regExp를 깊은 복사하는가?", () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const copy = cloneDeep(emailRegex);

    expect(emailRegex !== copy).toEqual(true);
  });
});
