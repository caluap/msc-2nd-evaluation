export var dataRef = {
  features: ["Rms", "Pitch"],
  emotions: ["Anger", "Happy", "Neutral", "Sad", "Surprise"],
  phrase: ["Filha", "Passarinho"]
};

let imgPath = "./assets/static/imgs/";
let audioPath = "./assets/static/sounds/";

export var general_data = {
  sharedState: {
    author_id: "",
    accepted_terms: false,
    offline_mode: false
  },

  eval2Data: [
    {
      phrase: "Filha",
      data: [
        {
          hash: "12df02bc6496b9a48a9e313e45d55670946147c3",
          img: require(imgPath + "12df02bc6496b9a48a9e313e45d55670946147c3"),
          audio: require(audioPath +
            "bcf410330890d1811bbe03450692a211eabdbc6e"),
          feature: dataRef.features[0],
          emotion: dataRef.emotions[0]
        },
        {
          hash: "9ee21841bea067ce07d669e51105a5c0c1756790",
          img: require(imgPath + "9ee21841bea067ce07d669e51105a5c0c1756790"),
          audio: require(audioPath +
            "bcf410330890d1811bbe03450692a211eabdbc6e"),
          feature: dataRef.features[1],
          emotion: dataRef.emotions[0]
        },
        {
          hash: "4c426018024995b3113c0c793f274fa3921e76b0",
          img: require(imgPath + "4c426018024995b3113c0c793f274fa3921e76b0"),
          audio: require(audioPath +
            "6a2cfb6b28c8f2d66bdedfaf5b86fcdc88735e3b"),
          feature: dataRef.features[0],
          emotion: dataRef.emotions[1]
        },
        {
          hash: "aee1ab9e16a62809b332389ce780e9c73b7ef237",
          img: require(imgPath + "aee1ab9e16a62809b332389ce780e9c73b7ef237"),
          audio: require(audioPath +
            "6a2cfb6b28c8f2d66bdedfaf5b86fcdc88735e3b"),
          feature: dataRef.features[1],
          emotion: dataRef.emotions[1]
        },
        {
          hash: "fcf2c9210e2b6a5223076c61dca657a5d8d5d3c2",
          img: require(imgPath + "fcf2c9210e2b6a5223076c61dca657a5d8d5d3c2"),
          audio: require(audioPath +
            "9e6010da3ee78f67712588592f0af5e46d7f593c"),
          feature: dataRef.features[0],
          emotion: dataRef.emotions[2]
        },
        {
          hash: "78d0822a68813b49e3d0548b1087bc2cb9c6e21b",
          img: require(imgPath + "78d0822a68813b49e3d0548b1087bc2cb9c6e21b"),
          audio: require(audioPath +
            "9e6010da3ee78f67712588592f0af5e46d7f593c"),
          feature: dataRef.features[1],
          emotion: dataRef.emotions[2]
        },
        {
          hash: "bca191c7d204940ff35eef377df9a558e409f7c4",
          img: require(imgPath + "bca191c7d204940ff35eef377df9a558e409f7c4"),
          audio: require(audioPath +
            "7e222a91c247d56ecd5779fc46e7a3b87a391233"),
          feature: dataRef.features[0],
          emotion: dataRef.emotions[3]
        },
        {
          hash: "913b8bea7f896379ba1b24b9dd5bf2164a853529",
          img: require(imgPath + "913b8bea7f896379ba1b24b9dd5bf2164a853529"),
          audio: require(audioPath +
            "7e222a91c247d56ecd5779fc46e7a3b87a391233"),
          feature: dataRef.features[1],
          emotion: dataRef.emotions[3]
        },
        {
          hash: "1671b3e4c2ee49cc5bafe2cd547d24a9a6455c18",
          img: require(imgPath + "1671b3e4c2ee49cc5bafe2cd547d24a9a6455c18"),
          audio: require(audioPath +
            "86f587a294b413c810bd025207079acd93e7ffac"),
          feature: dataRef.features[0],
          emotion: dataRef.emotions[4]
        },
        {
          hash: "6d4c0d3f448b20a4f9ff20bb0776a45959513fe4",
          img: require(imgPath + "6d4c0d3f448b20a4f9ff20bb0776a45959513fe4"),
          audio: require(audioPath +
            "86f587a294b413c810bd025207079acd93e7ffac"),
          feature: dataRef.features[1],
          emotion: dataRef.emotions[4]
        }
      ]
    },
    {
      phrase: "Passarinho",
      data: [
        {
          hash: "9b62719ba55e181494acb73bed8a9dad4b0fc5bb",
          img: require(imgPath + "9b62719ba55e181494acb73bed8a9dad4b0fc5bb"),
          audio: require(audioPath +
            "8e5d42853548fcc1a1a9df1b9143cb279ffa64af"),
          feature: dataRef.features[0],
          emotion: dataRef.emotions[0]
        },
        {
          hash: "58c008b2b5d66b603fd5f8d378732375490cac1f",
          img: require(imgPath + "58c008b2b5d66b603fd5f8d378732375490cac1f"),
          audio: require(audioPath +
            "8e5d42853548fcc1a1a9df1b9143cb279ffa64af"),
          feature: dataRef.features[1],
          emotion: dataRef.emotions[0]
        },
        {
          hash: "b5a1944cb67fbd889dfc47137861e5fed722f2bd",
          img: require(imgPath + "b5a1944cb67fbd889dfc47137861e5fed722f2bd"),
          audio: require(audioPath +
            "f1479e5f23721925234e56965e45088b180f1978"),
          feature: dataRef.features[0],
          emotion: dataRef.emotions[1]
        },
        {
          hash: "4de7b9cc997c2f434db154e846f17312b35ab71c",
          img: require(imgPath + "4de7b9cc997c2f434db154e846f17312b35ab71c"),
          audio: require(audioPath +
            "f1479e5f23721925234e56965e45088b180f1978"),
          feature: dataRef.features[1],
          emotion: dataRef.emotions[1]
        },
        {
          hash: "b6eae60b39652379f2908fd5f8a6487c223ede70",
          img: require(imgPath + "b6eae60b39652379f2908fd5f8a6487c223ede70"),
          audio: require(audioPath +
            "e88aa03dd4030e91fb89e08d74497f50fb01cea6"),
          feature: dataRef.features[0],
          emotion: dataRef.emotions[2]
        },
        {
          hash: "c4a3dfe6257a41972da0183665244b97a06a12ca",
          img: require(imgPath + "c4a3dfe6257a41972da0183665244b97a06a12ca"),
          audio: require(audioPath +
            "e88aa03dd4030e91fb89e08d74497f50fb01cea6"),
          feature: dataRef.features[1],
          emotion: dataRef.emotions[2]
        },
        {
          hash: "320f67d7db77d92bdc5780f6d03d14bbdc34ce13",
          img: require(imgPath + "320f67d7db77d92bdc5780f6d03d14bbdc34ce13"),
          audio: require(audioPath +
            "ef5e65eb750ab19f4cad927461760f9bf52d6d80"),
          feature: dataRef.features[0],
          emotion: dataRef.emotions[3]
        },
        {
          hash: "f9960fad3e5908db562c5e85b08f18304bdbb4c4",
          img: require(imgPath + "f9960fad3e5908db562c5e85b08f18304bdbb4c4"),
          audio: require(audioPath +
            "ef5e65eb750ab19f4cad927461760f9bf52d6d80"),
          feature: dataRef.features[1],
          emotion: dataRef.emotions[3]
        },
        {
          hash: "9e55b10287ddf0f7e98c3e5d4731f54c52173414",
          img: require(imgPath + "9e55b10287ddf0f7e98c3e5d4731f54c52173414"),
          audio: require(audioPath +
            "6b7d4fc99c68cd95e4831b695061fd576f697e52"),
          feature: dataRef.features[0],
          emotion: dataRef.emotions[4]
        },
        {
          hash: "4b3e3c5800d3acacb2d7e1f111d2a41cb6f29ad1",
          img: require(imgPath + "4b3e3c5800d3acacb2d7e1f111d2a41cb6f29ad1"),
          audio: require(audioPath +
            "6b7d4fc99c68cd95e4831b695061fd576f697e52"),
          feature: dataRef.features[1],
          emotion: dataRef.emotions[4]
        }
      ]
    }
  ],
  cardsData: [
    {
      phrase: "filha",
      data: [
        {
          hash: "7a8d9b",
          img: require("./assets/static/imgs/animals/cat.jpg"),
          audio: require("./assets/static/sounds/cat.mp3"),
          feature: dataRef.features[0],
          emotion: dataRef.emotions[0]
        },
        {
          hash: "94dc70",
          img: require("./assets/static/imgs/animals/cow.jpg"),
          audio: require("./assets/static/sounds/cow.mp3"),
          feature: dataRef.features[0],
          emotion: dataRef.emotions[1]
        },
        {
          hash: "fc7dfe",
          img: require("./assets/static/imgs/animals/dog.jpg"),
          audio: require("./assets/static/sounds/dog.mp3"),
          feature: dataRef.features[1],
          emotion: dataRef.emotions[0]
        },
        {
          hash: "af9377",
          img: require("./assets/static/imgs/animals/duck.jpg"),
          audio: require("./assets/static/sounds/duck.mp3"),
          feature: dataRef.features[1],
          emotion: dataRef.emotions[1]
        }
      ]
    },
    {
      phrase: "passarinho",
      data: [
        {
          hash: "4d0db8",
          img: require("./assets/static/imgs/animals/goose.jpg"),
          audio: require("./assets/static/sounds/goose.mp3"),
          feature: dataRef.features[0],
          emotion: dataRef.emotions[0]
        },
        {
          hash: "b4a4f6",
          img: require("./assets/static/imgs/animals/pig.jpg"),
          audio: require("./assets/static/sounds/pig.mp3"),
          feature: dataRef.features[0],
          emotion: dataRef.emotions[1]
        },
        {
          hash: "3cfff0",
          img: require("./assets/static/imgs/animals/rooster.jpg"),
          audio: require("./assets/static/sounds/rooster.mp3"),
          feature: dataRef.features[1],
          emotion: dataRef.emotions[0]
        },
        {
          hash: "a086f6",
          img: require("./assets/static/imgs/animals/turkey.jpg"),
          audio: require("./assets/static/sounds/turkey.mp3"),
          feature: dataRef.features[1],
          emotion: dataRef.emotions[1]
        }
      ]
    }
  ],
  setAuthorId(value) {
    this.sharedState.author_id = value;
  }
};
