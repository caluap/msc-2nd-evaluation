export var dataRef = {
  features: ["rms", "pitch"],
  emotions: ["anger", "sadness", "surprise", "happiness"],
  phrase: ["filha", "passarinho"]
};

export var general_data = {
  sharedState: {
    author_id: "",
    offline_mode: false
  },
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
