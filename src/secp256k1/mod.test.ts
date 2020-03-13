import { Curve } from './curve';
import { add, divide, mod, multiply, power, squareRoots, subtract } from './mod';

export const TEST_A = 40920663801924305269653119115551778679508146584746982050198744783328810683478n;
export const TEST_B = 57644217303653297295043885393981736616586573165163091864015052012599672961081n;

describe('mod', () => {
  it('returns the modular result of an operation', () => {
    const curve = new Curve();

    expect(mod(curve, TEST_A)).toBe(40920663801924305269653119115551778679508146584746982050198744783328810683478n);
    expect(mod(curve, TEST_B)).toBe(57644217303653297295043885393981736616586573165163091864015052012599672961081n);
  });
});

describe('add', () => {
  it('adds two numbers', () => {
    const curve = new Curve();

    expect(add(curve, TEST_A, TEST_A)).toBe(
      81841327603848610539306238231103557359016293169493964100397489566657621366956n
    );
    expect(add(curve, TEST_B, TEST_B)).toBe(
      115288434607306594590087770787963473233173146330326183728030104025199345922162n
    );
  });
});

describe('subtract', () => {
  it('subtracts two numbers', () => {
    const curve = new Curve();

    expect(subtract(curve, TEST_A, TEST_B)).toBe(
      99068535735587203398180218730257949916191558085224454225641276778637972394060n
    );
    expect(subtract(curve, TEST_B, TEST_A)).toBe(
      16723553501728992025390766278429957937078426580416109813816307229270862277603n
    );
  });
});

describe('multiply', () => {
  it('multiplies two numbers', () => {
    const curve = new Curve();

    expect(multiply(curve, TEST_A, TEST_A)).toBe(
      60348372934273279971993986630834708629578564491747142757764073437455044124652n
    );
    expect(multiply(curve, TEST_B, TEST_B)).toBe(
      93635177522471094108898156822137863960278456457190592348354738112580645053712n
    );
  });
});

describe('divide', () => {
  it('divides two numbers', () => {
    const curve = new Curve();

    expect(divide(curve, TEST_A, TEST_B)).toBe(
      71865970237313792670820027288162572879926887829139724320463362393064574103635n
    );
    expect(divide(curve, TEST_B, TEST_A)).toBe(
      6678908264677100300883728556498058927887627544987573873849581526879372898940n
    );
  });
});

describe('power', () => {
  it('takes the power of two numbers', () => {
    const curve = new Curve();

    expect(power(curve, TEST_A, TEST_B)).toBe(
      45154261507711685768830239628328808171904190663195061380145420756885665970304n
    );
    expect(power(curve, TEST_B, TEST_A)).toBe(
      12259513326771245646783968873923369955705799639898792721622882367719141774688n
    );
  });

  it('returns 0 if the value is 0', () => {
    const curve = new Curve();

    expect(power(curve, 0n, TEST_A)).toBe(0n);
    expect(power(curve, 0n, TEST_B)).toBe(0n);
  });
});

describe('squareRoots', () => {
  it('gets the two square roots for a y2 value', () => {
    const curve = new Curve();
    const y = squareRoots(curve, TEST_A);

    expect(y).toHaveLength(2);
    expect(y[0]).toBe(36080975185544999343184031379027371578077336573858544356477955434911939012222n);
    expect(y[1]).toBe(79711114051771196080386953629660536275192648091782019682979628572996895659441n);
  });

  it('throws if the square root is not an integer', () => {
    const curve = new Curve();

    expect(() => squareRoots(curve, TEST_B)).toThrow();
  });
});
