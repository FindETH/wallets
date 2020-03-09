import { HDNode } from './hdnode';

interface TestVector {
  seed: string;
  expected: {
    master: {
      public: string;
      private: string;
    };
    levels: {
      [key: string]: {
        public: string;
        private: string;
        address?: string;
      };
    };
  };
}

/**
 * Test vectors as defined in BIP-32.
 *
 * https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#test-vectors
 */
const TEST_VECTORS: TestVector[] = [
  {
    seed: '000102030405060708090a0b0c0d0e0f',
    expected: {
      master: {
        public:
          'xpub661MyMwAqRbcFtXgS5sYJABqqG9YLmC4Q1Rdap9gSE8NqtwybGhePY2gZ29ESFjqJoCu1Rupje8YtGqsefD265TMg7usUDFdp6W1EGMcet8',
        private:
          'xprv9s21ZrQH143K3QTDL4LXw2F7HEK3wJUD2nW2nRk4stbPy6cq3jPPqjiChkVvvNKmPGJxWUtg6LnF5kejMRNNU3TGtRBeJgk33yuGBxrMPHi'
      },
      levels: {
        [`m/0'`]: {
          public:
            'xpub68Gmy5EdvgibQVfPdqkBBCHxA5htiqg55crXYuXoQRKfDBFA1WEjWgP6LHhwBZeNK1VTsfTFUHCdrfp1bgwQ9xv5ski8PX9rL2dZXvgGDnw',
          private:
            'xprv9uHRZZhk6KAJC1avXpDAp4MDc3sQKNxDiPvvkX8Br5ngLNv1TxvUxt4cV1rGL5hj6KCesnDYUhd7oWgT11eZG7XnxHrnYeSvkzY7d2bhkJ7',
          address: '0xBF6e48966d0dcf553b53e7b56CB2e0E72dca9E19'
        },
        [`m/0'/1`]: {
          public:
            'xpub6ASuArnXKPbfEwhqN6e3mwBcDTgzisQN1wXN9BJcM47sSikHjJf3UFHKkNAWbWMiGj7Wf5uMash7SyYq527Hqck2AxYysAA7xmALppuCkwQ',
          private:
            'xprv9wTYmMFdV23N2TdNG573QoEsfRrWKQgWeibmLntzniatZvR9BmLnvSxqu53Kw1UmYPxLgboyZQaXwTCg8MSY3H2EU4pWcQDnRnrVA1xe8fs',
          address: '0x29379f45F515C494483298225d1B347F73D1babF'
        },
        [`m/0'/1/2'`]: {
          public:
            'xpub6D4BDPcP2GT577Vvch3R8wDkScZWzQzMMUm3PWbmWvVJrZwQY4VUNgqFJPMM3No2dFDFGTsxxpG5uJh7n7epu4trkrX7x7DogT5Uv6fcLW5',
          private:
            'xprv9z4pot5VBttmtdRTWfWQmoH1taj2axGVzFqSb8C9xaxKymcFzXBDptWmT7FwuEzG3ryjH4ktypQSAewRiNMjANTtpgP4mLTj34bhnZX7UiM',
          address: '0xd8e85FBbb4b3b3c71C4e63A5580d0c12fb4D2f71'
        },
        [`m/0'/1/2'/2`]: {
          public:
            'xpub6FHa3pjLCk84BayeJxFW2SP4XRrFd1JYnxeLeU8EqN3vDfZmbqBqaGJAyiLjTAwm6ZLRQUMv1ZACTj37sR62cfN7fe5JnJ7dh8zL4fiyLHV',
          private:
            'xprvA2JDeKCSNNZky6uBCviVfJSKyQ1mDYahRjijr5idH2WwLsEd4Hsb2Tyh8RfQMuPh7f7RtyzTtdrbdqqsunu5Mm3wDvUAKRHSC34sJ7in334',
          address: '0x1d3462d2319Ac0bfC1A52e177A9d372492752130'
        },
        [`m/0'/1/2'/2/1000000000`]: {
          public:
            'xpub6H1LXWLaKsWFhvm6RVpEL9P4KfRZSW7abD2ttkWP3SSQvnyA8FSVqNTEcYFgJS2UaFcxupHiYkro49S8yGasTvXEYBVPamhGW6cFJodrTHy',
          private:
            'xprvA41z7zogVVwxVSgdKUHDy1SKmdb533PjDz7J6N6mV6uS3ze1ai8FHa8kmHScGpWmj4WggLyQjgPie1rFSruoUihUZREPSL39UNdE3BBDu76',
          address: '0x73659c60270d326c06Ac204F1A9C63f889a3D14B'
        }
      }
    }
  },

  {
    seed:
      'fffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542',
    expected: {
      master: {
        public:
          'xpub661MyMwAqRbcFW31YEwpkMuc5THy2PSt5bDMsktWQcFF8syAmRUapSCGu8ED9W6oDMSgv6Zz8idoc4a6mr8BDzTJY47LJhkJ8UB7WEGuduB',
        private:
          'xprv9s21ZrQH143K31xYSDQpPDxsXRTUcvj2iNHm5NUtrGiGG5e2DtALGdso3pGz6ssrdK4PFmM8NSpSBHNqPqm55Qn3LqFtT2emdEXVYsCzC2U'
      },
      levels: {
        [`m/0`]: {
          public:
            'xpub69H7F5d8KSRgmmdJg2KhpAK8SR3DjMwAdkxj3ZuxV27CprR9LgpeyGmXUbC6wb7ERfvrnKZjXoUmmDznezpbZb7ap6r1D3tgFxHmwMkQTPH',
          private:
            'xprv9vHkqa6EV4sPZHYqZznhT2NPtPCjKuDKGY38FBWLvgaDx45zo9WQRUT3dKYnjwih2yJD9mkrocEZXo1ex8G81dwSM1fwqWpWkeS3v86pgKt',
          address: '0xaBBcd4471a0b6E76A2f6fdc44008fE53831E208e'
        },
        [`m/0/2147483647'`]: {
          public:
            'xpub6ASAVgeehLbnwdqV6UKMHVzgqAG8Gr6riv3Fxxpj8ksbH9ebxaEyBLZ85ySDhKiLDBrQSARLq1uNRts8RuJiHjaDMBU4Zn9h8LZNnBC5y4a',
          private:
            'xprv9wSp6B7kry3Vj9m1zSnLvN3xH8RdsPP1Mh7fAaR7aRLcQMKTR2vidYEeEg2mUCTAwCd6vnxVrcjfy2kRgVsFawNzmjuHc2YmYRmagcEPdU9',
          address: '0x40EF2cEF1B2588AE862e7A511162EC7ff33C30fD'
        },
        [`m/0/2147483647'/1`]: {
          public:
            'xpub6DF8uhdarytz3FWdA8TvFSvvAh8dP3283MY7p2V4SeE2wyWmG5mg5EwVvmdMVCQcoNJxGoWaU9DCWh89LojfZ537wTfunKau47EL2dhHKon',
          private:
            'xprv9zFnWC6h2cLgpmSA46vutJzBcfJ8yaJGg8cX1e5StJh45BBciYTRXSd25UEPVuesF9yog62tGAQtHjXajPPdbRCHuWS6T8XA2ECKADdw4Ef',
          address: '0x3F2E8905488f795EbC84A39560d133971CCf9b50'
        },
        [`m/0/2147483647'/1/2147483646'`]: {
          public:
            'xpub6ERApfZwUNrhLCkDtcHTcxd75RbzS1ed54G1LkBUHQVHQKqhMkhgbmJbZRkrgZw4koxb5JaHWkY4ALHY2grBGRjaDMzQLcgJvLJuZZvRcEL',
          private:
            'xprvA1RpRA33e1JQ7ifknakTFpgNXPmW2YvmhqLQYMmrj4xJXXWYpDPS3xz7iAxn8L39njGVyuoseXzU6rcxFLJ8HFsTjSyQbLYnMpCqE2VbFWc',
          address: '0xa5016Fdf975F767e4E6F355c7a82EFA69bf42ea7'
        },
        [`m/0/2147483647'/1/2147483646'/2`]: {
          public:
            'xpub6FnCn6nSzZAw5Tw7cgR9bi15UV96gLZhjDstkXXxvCLsUXBGXPdSnLFbdpq8p9HmGsApME5hQTZ3emM2rnY5agb9rXpVGyy3bdW6EEgAtqt',
          private:
            'xprvA2nrNbFZABcdryreWet9Ea4LvTJcGsqrMzxHx98MMrotbir7yrKCEXw7nadnHM8Dq38EGfSh6dqA9QWTyefMLEcBYJUuekgW4BYPJcr9E7j',
          address: '0x8FF2A9F7e7917804E8c8EC150D931d9c5A6Fbc50'
        }
      }
    }
  },

  {
    seed:
      '4b381541583be4423346c643850da4b320e46a87ae3d2a4e6da11eba819cd4acba45d239319ac14f863b8d5ab5a0d0c64d2e8a1e7d1457df2e5a3c51c73235be',
    expected: {
      master: {
        public:
          'xpub661MyMwAqRbcEZVB4dScxMAdx6d4nFc9nvyvH3v4gJL378CSRZiYmhRoP7mBy6gSPSCYk6SzXPTf3ND1cZAceL7SfJ1Z3GC8vBgp2epUt13',
        private:
          'xprv9s21ZrQH143K25QhxbucbDDuQ4naNntJRi4KUfWT7xo4EKsHt2QJDu7KXp1A3u7Bi1j8ph3EGsZ9Xvz9dGuVrtHHs7pXeTzjuxBrCmmhgC6'
      },
      levels: {
        [`m/0'`]: {
          public:
            'xpub68NZiKmJWnxxS6aaHmn81bvJeTESw724CRDs6HbuccFQN9Ku14VQrADWgqbhhTHBaohPX4CjNLf9fq9MYo6oDaPPLPxSb7gwQN3ih19Zm4Y',
          private:
            'xprv9uPDJpEQgRQfDcW7BkF7eTya6RPxXeJCqCJGHuCJ4GiRVLzkTXBAJMu2qaMWPrS7AANYqdq6vcBcBUdJCVVFceUvJFjaPdGZ2y9WACViL4L',
          address: '0xa538232504078dA43B905FF9c4eA49F52E972d72'
        }
      }
    }
  }
];

/**
 * Test vectors using mnemonic phrases, as defined in the reference implementation if BIP-39.
 *
 * https://github.com/trezor/python-mnemonic/blob/b502451a33a440783926e04428115e0bed87d01f/vectors.json
 */
const MNEMONIC_TEST_VECTORS = [
  {
    mnemonic: 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about',
    extendedPrivateKey:
      'xprv9s21ZrQH143K3h3fDYiay8mocZ3afhfULfb5GX8kCBdno77K4HiA15Tg23wpbeF1pLfs1c5SPmYHrEpTuuRhxMwvKDwqdKiGJS9XFKzUsAF'
  },
  {
    mnemonic: 'legal winner thank year wave sausage worth useful legal winner thank yellow',
    extendedPrivateKey:
      'xprv9s21ZrQH143K2gA81bYFHqU68xz1cX2APaSq5tt6MFSLeXnCKV1RVUJt9FWNTbrrryem4ZckN8k4Ls1H6nwdvDTvnV7zEXs2HgPezuVccsq'
  },
  {
    mnemonic: 'letter advice cage absurd amount doctor acoustic avoid letter advice cage above',
    extendedPrivateKey:
      'xprv9s21ZrQH143K2shfP28KM3nr5Ap1SXjz8gc2rAqqMEynmjt6o1qboCDpxckqXavCwdnYds6yBHZGKHv7ef2eTXy461PXUjBFQg6PrwY4Gzq'
  },
  {
    mnemonic: 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong',
    extendedPrivateKey:
      'xprv9s21ZrQH143K2V4oox4M8Zmhi2Fjx5XK4Lf7GKRvPSgydU3mjZuKGCTg7UPiBUD7ydVPvSLtg9hjp7MQTYsW67rZHAXeccqYqrsx8LcXnyd'
  },
  {
    mnemonic:
      'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon agent',
    extendedPrivateKey:
      'xprv9s21ZrQH143K3mEDrypcZ2usWqFgzKB6jBBx9B6GfC7fu26X6hPRzVjzkqkPvDqp6g5eypdk6cyhGnBngbjeHTe4LsuLG1cCmKJka5SMkmU'
  },
  {
    mnemonic:
      'legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth useful legal will',
    extendedPrivateKey:
      'xprv9s21ZrQH143K3Lv9MZLj16np5GzLe7tDKQfVusBni7toqJGcnKRtHSxUwbKUyUWiwpK55g1DUSsw76TF1T93VT4gz4wt5RM23pkaQLnvBh7'
  },
  {
    mnemonic:
      'letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter always',
    extendedPrivateKey:
      'xprv9s21ZrQH143K3VPCbxbUtpkh9pRG371UCLDz3BjceqP1jz7XZsQ5EnNkYAEkfeZp62cDNj13ZTEVG1TEro9sZ9grfRmcYWLBhCocViKEJae'
  },
  {
    mnemonic: 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo when',
    extendedPrivateKey:
      'xprv9s21ZrQH143K36Ao5jHRVhFGDbLP6FCx8BEEmpru77ef3bmA928BxsqvVM27WnvvyfWywiFN8K6yToqMaGYfzS6Db1EHAXT5TuyCLBXUfdm'
  },
  {
    mnemonic:
      'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art',
    extendedPrivateKey:
      'xprv9s21ZrQH143K32qBagUJAMU2LsHg3ka7jqMcV98Y7gVeVyNStwYS3U7yVVoDZ4btbRNf4h6ibWpY22iRmXq35qgLs79f312g2kj5539ebPM'
  },
  {
    mnemonic:
      'legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth title',
    extendedPrivateKey:
      'xprv9s21ZrQH143K3Y1sd2XVu9wtqxJRvybCfAetjUrMMco6r3v9qZTBeXiBZkS8JxWbcGJZyio8TrZtm6pkbzG8SYt1sxwNLh3Wx7to5pgiVFU'
  },
  {
    mnemonic:
      'letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic bless',
    extendedPrivateKey:
      'xprv9s21ZrQH143K3CSnQNYC3MqAAqHwxeTLhDbhF43A4ss4ciWNmCY9zQGvAKUSqVUf2vPHBTSE1rB2pg4avopqSiLVzXEU8KziNnVPauTqLRo'
  },
  {
    mnemonic: 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo vote',
    extendedPrivateKey:
      'xprv9s21ZrQH143K2WFF16X85T2QCpndrGwx6GueB72Zf3AHwHJaknRXNF37ZmDrtHrrLSHvbuRejXcnYxoZKvRquTPyp2JiNG3XcjQyzSEgqCB'
  },
  {
    mnemonic: 'ozone drill grab fiber curtain grace pudding thank cruise elder eight picnic',
    extendedPrivateKey:
      'xprv9s21ZrQH143K2oZ9stBYpoaZ2ktHj7jLz7iMqpgg1En8kKFTXJHsjxry1JbKH19YrDTicVwKPehFKTbmaxgVEc5TpHdS1aYhB2s9aFJBeJH'
  },
  {
    mnemonic:
      'gravity machine north sort system female filter attitude volume fold club stay feature office ecology stable narrow fog',
    extendedPrivateKey:
      'xprv9s21ZrQH143K3uT8eQowUjsxrmsA9YUuQQK1RLqFufzybxD6DH6gPY7NjJ5G3EPHjsWDrs9iivSbmvjc9DQJbJGatfa9pv4MZ3wjr8qWPAK'
  },
  {
    mnemonic:
      'hamster diagram private dutch cause delay private meat slide toddler razor book happy fancy gospel tennis maple dilemma loan word shrug inflict delay length',
    extendedPrivateKey:
      'xprv9s21ZrQH143K2XTAhys3pMNcGn261Fi5Ta2Pw8PwaVPhg3D8DWkzWQwjTJfskj8ofb81i9NP2cUNKxwjueJHHMQAnxtivTA75uUFqPFeWzk'
  },
  {
    mnemonic: 'scheme spot photo card baby mountain device kick cradle pact join borrow',
    extendedPrivateKey:
      'xprv9s21ZrQH143K3FperxDp8vFsFycKCRcJGAFmcV7umQmcnMZaLtZRt13QJDsoS5F6oYT6BB4sS6zmTmyQAEkJKxJ7yByDNtRe5asP2jFGhT6'
  },
  {
    mnemonic:
      'horn tenant knee talent sponsor spell gate clip pulse soap slush warm silver nephew swap uncle crack brave',
    extendedPrivateKey:
      'xprv9s21ZrQH143K3R1SfVZZLtVbXEB9ryVxmVtVMsMwmEyEvgXN6Q84LKkLRmf4ST6QrLeBm3jQsb9gx1uo23TS7vo3vAkZGZz71uuLCcywUkt'
  },
  {
    mnemonic:
      'panda eyebrow bullet gorilla call smoke muffin taste mesh discover soft ostrich alcohol speed nation flash devote level hobby quick inner drive ghost inside',
    extendedPrivateKey:
      'xprv9s21ZrQH143K2WNnKmssvZYM96VAr47iHUQUTUyUXH3sAGNjhJANddnhw3i3y3pBbRAVk5M5qUGFr4rHbEWwXgX4qrvrceifCYQJbbFDems'
  },
  {
    mnemonic: 'cat swing flag economy stadium alone churn speed unique patch report train',
    extendedPrivateKey:
      'xprv9s21ZrQH143K4G28omGMogEoYgDQuigBo8AFHAGDaJdqQ99QKMQ5J6fYTMfANTJy6xBmhvsNZ1CJzRZ64PWbnTFUn6CDV2FxoMDLXdk95DQ'
  },
  {
    mnemonic:
      'light rule cinnamon wrap drastic word pride squirrel upgrade then income fatal apart sustain crack supply proud access',
    extendedPrivateKey:
      'xprv9s21ZrQH143K3wtsvY8L2aZyxkiWULZH4vyQE5XkHTXkmx8gHo6RUEfH3Jyr6NwkJhvano7Xb2o6UqFKWHVo5scE31SGDCAUsgVhiUuUDyh'
  },
  {
    mnemonic:
      'all hour make first leader extend hole alien behind guard gospel lava path output census museum junior mass reopen famous sing advance salt reform',
    extendedPrivateKey:
      'xprv9s21ZrQH143K3rEfqSM4QZRVmiMuSWY9wugscmaCjYja3SbUD3KPEB1a7QXJoajyR2T1SiXU7rFVRXMV9XdYVSZe7JoUXdP4SRHTxsT1nzm'
  },
  {
    mnemonic: 'vessel ladder alter error federal sibling chat ability sun glass valve picture',
    extendedPrivateKey:
      'xprv9s21ZrQH143K2QWV9Wn8Vvs6jbqfF1YbTCdURQW9dLFKDovpKaKrqS3SEWsXCu6ZNky9PSAENg6c9AQYHcg4PjopRGGKmdD313ZHszymnps'
  },
  {
    mnemonic:
      'scissors invite lock maple supreme raw rapid void congress muscle digital elegant little brisk hair mango congress clump',
    extendedPrivateKey:
      'xprv9s21ZrQH143K4aERa2bq7559eMCCEs2QmmqVjUuzfy5eAeDX4mqZffkYwpzGQRE2YEEeLVRoH4CSHxianrFaVnMN2RYaPUZJhJx8S5j6puX'
  },
  {
    mnemonic:
      'void come effort suffer camp survey warrior heavy shoot primary clutch crush open amazing screen patrol group space point ten exist slush involve unfold',
    extendedPrivateKey:
      'xprv9s21ZrQH143K39rnQJknpH1WEPFJrzmAqqasiDcVrNuk926oizzJDDQkdiTvNPr2FYDYzWgiMiC63YmfPAa2oPyNB23r2g7d1yiK6WpqaQS'
  }
];

describe('HDNode', () => {
  describe('extendedPrivateKey', () => {
    it('returns the serialised extended private key', () => {
      for (const vector of TEST_VECTORS) {
        const seed = Buffer.from(vector.seed, 'hex');
        const hdNode = HDNode.fromSeed(seed);

        expect(hdNode.extendedPrivateKey).toBe(vector.expected.master.private);
      }
    });

    it('throws if no private key is set', () => {
      const hdNode = HDNode.fromExtendedKey(
        'xpub661MyMwAqRbcFtXgS5sYJABqqG9YLmC4Q1Rdap9gSE8NqtwybGhePY2gZ29ESFjqJoCu1Rupje8YtGqsefD265TMg7usUDFdp6W1EGMcet8'
      );
      expect(() => hdNode.extendedPrivateKey).toThrow();
    });
  });

  describe('extendedPublicKey', () => {
    it('returns the serialised extended public key', () => {
      for (const vector of TEST_VECTORS) {
        const seed = Buffer.from(vector.seed, 'hex');
        const hdNode = HDNode.fromSeed(seed);

        expect(hdNode.extendedPublicKey).toBe(vector.expected.master.public);
      }
    });
  });

  describe('derive', () => {
    it('returns the same instance when deriving a master key', () => {
      const hdNode = HDNode.fromExtendedKey(
        'xpub661MyMwAqRbcFtXgS5sYJABqqG9YLmC4Q1Rdap9gSE8NqtwybGhePY2gZ29ESFjqJoCu1Rupje8YtGqsefD265TMg7usUDFdp6W1EGMcet8'
      );
      expect(hdNode.derive('m')).toBe(hdNode);
      expect(hdNode.derive('M')).toBe(hdNode);
    });

    it('throws if the derivation path is invalid', () => {
      const hdNode = HDNode.fromExtendedKey(
        'xpub661MyMwAqRbcFtXgS5sYJABqqG9YLmC4Q1Rdap9gSE8NqtwybGhePY2gZ29ESFjqJoCu1Rupje8YtGqsefD265TMg7usUDFdp6W1EGMcet8'
      );
      expect(() => hdNode.derive('m/')).toThrow();
      expect(() => hdNode.derive('0/0')).toThrow();
      expect(() => hdNode.derive(`m/0'/'0`)).toThrow();
    });

    it('throws when deriving a hardened index without private key', () => {
      const hdNode = HDNode.fromExtendedKey(
        'xpub661MyMwAqRbcFtXgS5sYJABqqG9YLmC4Q1Rdap9gSE8NqtwybGhePY2gZ29ESFjqJoCu1Rupje8YtGqsefD265TMg7usUDFdp6W1EGMcet8'
      );
      expect(() => hdNode.derive(`m/0'`)).toThrow();
      expect(() => hdNode.derive(`0/0/0'`)).toThrow();
      expect(() => hdNode.derive(`m/0'/0/0'`)).toThrow();
    });

    it('derives a child extended private key based on a derivation path', () => {
      for (const vector of TEST_VECTORS) {
        const seed = Buffer.from(vector.seed, 'hex');
        const hdNode = HDNode.fromSeed(seed);

        if (vector.expected.levels) {
          for (const path of Object.keys(vector.expected.levels)) {
            expect(hdNode.derive(path).extendedPrivateKey).toBe(vector.expected.levels[path].private);
          }
        }
      }
    });

    it('derives a child extended public key based on a derivation path', () => {
      for (const vector of TEST_VECTORS) {
        const seed = Buffer.from(vector.seed, 'hex');
        const hdNode = HDNode.fromSeed(seed);

        for (const path of Object.keys(vector.expected.levels)) {
          expect(hdNode.derive(path).extendedPublicKey).toBe(vector.expected.levels[path].public);
        }
      }
    });
  });

  describe('address', () => {
    it('returns the correct Ethereum address', () => {
      for (const vector of TEST_VECTORS) {
        const seed = Buffer.from(vector.seed, 'hex');
        const hdNode = HDNode.fromSeed(seed);

        if (vector.expected.levels) {
          for (const path of Object.keys(vector.expected.levels)) {
            if (vector.expected.levels[path].address) {
              expect(hdNode.derive(path).address).toBe(vector.expected.levels[path].address);
            }
          }
        }
      }
    });
  });

  describe('fromMnemonicPhrase', () => {
    it('returns an instance of HDNode from a mnemonic phrase', () => {
      for (const vectors of MNEMONIC_TEST_VECTORS) {
        const hdNode = HDNode.fromMnemonicPhrase(vectors.mnemonic, 'TREZOR');
        expect(hdNode.extendedPrivateKey).toBe(vectors.extendedPrivateKey);
      }
    });
  });

  describe('fromExtendedKey', () => {
    it('throws if the key is not 78 bytes long', () => {
      expect(() => HDNode.fromExtendedKey('SQHFQMRT97ajZaP')).toThrow();
    });

    it('throws if the version is invalid', () => {
      expect(() =>
        HDNode.fromExtendedKey(
          'q96eN3qvaGTdfJe5BDJaAGu7aFmt8eJu5Mfx9NXmUaDvoxhm7pHkpekoS3b92Y11jXFZY7c9WRCJg8PVDGeJgXbNGmYpp1JpfHbALB4HWg7dmwnA'
        )
      ).toThrow();
    });

    it('returns an instance of HDNode from an extended private key', () => {
      for (const vector of TEST_VECTORS) {
        const seed = Buffer.from(vector.seed, 'hex');
        const hdNode = HDNode.fromSeed(seed);
        const hdNodeFromXpriv = HDNode.fromExtendedKey(vector.expected.master.private);

        expect(hdNode.extendedPrivateKey).toBe(hdNodeFromXpriv.extendedPrivateKey);
      }
    });

    it('returns an instance of HDNode from an extended public key', () => {
      for (const vector of TEST_VECTORS) {
        const seed = Buffer.from(vector.seed, 'hex');
        const hdNode = HDNode.fromSeed(seed);
        const hdNodeFromXpub = HDNode.fromExtendedKey(vector.expected.master.public);

        expect(hdNode.extendedPublicKey).toBe(hdNodeFromXpub.extendedPublicKey);
      }
    });
  });
});
