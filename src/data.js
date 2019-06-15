export var dataRef = {
  features: ["Rms", "Pitch"],
  emotions: ["Anger", "Happy", "Neutral", "Sad", "Surprise"],
  phrases: ["Filha", "Passarinho"],
  axes: ["Wei", "Wid", "Ita", "_b_"]
};

let imgPath = "./assets/static/imgs/";
let imgPath3 = "./assets/static/imgs/03/";
let audioPath = "./assets/static/sounds/";

export var general_data = {
  sharedState: {
    author_id: "",
    accepted_terms: false,
    offline_mode: true,
    debug: true,
    rounds: 30,
    data: "data3"
  },
  data: {
    data3: {
      name: "data3",
      cards: [
        // FILHA
        // anger
        {
          hash: "7d47211352f4949871072fb2295913e93cd9f887",
          img: require(imgPath3 +
            "7d47211352f4949871072fb2295913e93cd9f887" +
            ".png"),
          audio: require(audioPath +
            "bcf410330890d1811bbe03450692a211eabdbc6e" +
            ".mp3"),
          phrase: dataRef.phrases[0],
          emotion: dataRef.emotions[0],
          feature: dataRef.features[0],
          axis: dataRef.axes[0] // wei
        },
        {
          hash: "6c038a1069389b16d3ce7ac3f9d1cef5d33f0b3b",
          img: require(imgPath3 +
            "6c038a1069389b16d3ce7ac3f9d1cef5d33f0b3b" +
            ".png"),
          audio: require(audioPath +
            "bcf410330890d1811bbe03450692a211eabdbc6e" +
            ".mp3"),
          phrase: dataRef.phrases[0],
          emotion: dataRef.emotions[0],
          feature: dataRef.features[0],
          axis: dataRef.axes[1] // wid
        },
        {
          hash: "f77f2a328f31a7a9e587b132a3d50905ec93b5e8",
          img: require(imgPath3 +
            "f77f2a328f31a7a9e587b132a3d50905ec93b5e8" +
            ".png"),
          audio: require(audioPath +
            "bcf410330890d1811bbe03450692a211eabdbc6e" +
            ".mp3"),
          phrase: dataRef.phrases[0],
          emotion: dataRef.emotions[0],
          feature: dataRef.features[0],
          axis: dataRef.axes[2] // ita
        },
        {
          hash: "2fd0af05b853879ee0cb954d7140df516fd3436e",
          img: require(imgPath3 +
            "2fd0af05b853879ee0cb954d7140df516fd3436e" +
            ".png"),
          audio: require(audioPath +
            "bcf410330890d1811bbe03450692a211eabdbc6e" +
            ".mp3"),
          phrase: dataRef.phrases[0],
          emotion: dataRef.emotions[0],
          feature: dataRef.features[0],
          axis: dataRef.axes[3] // _b_
        },
        // happy
        {
          hash: "b07a4f14113af09ea5dad9c0ecaa76f236b61b82",
          img: require(imgPath3 +
            "b07a4f14113af09ea5dad9c0ecaa76f236b61b82" +
            ".png"),
          audio: require(audioPath +
            "6a2cfb6b28c8f2d66bdedfaf5b86fcdc88735e3b" +
            ".mp3"),
          phrase: dataRef.phrases[0],
          emotion: dataRef.emotions[1],
          feature: dataRef.features[0],
          axis: dataRef.axes[0] // wei
        },
        {
          hash: "cceb349a26f1b29675418b323572aac3ddbe7f53",
          img: require(imgPath3 +
            "cceb349a26f1b29675418b323572aac3ddbe7f53" +
            ".png"),
          audio: require(audioPath +
            "6a2cfb6b28c8f2d66bdedfaf5b86fcdc88735e3b" +
            ".mp3"),
          phrase: dataRef.phrases[0],
          emotion: dataRef.emotions[1],
          feature: dataRef.features[0],
          axis: dataRef.axes[1] // wid
        },
        {
          hash: "2926782a6c0c0269391f35fbffe8a301dfc0f951",
          img: require(imgPath3 +
            "2926782a6c0c0269391f35fbffe8a301dfc0f951" +
            ".png"),
          audio: require(audioPath +
            "6a2cfb6b28c8f2d66bdedfaf5b86fcdc88735e3b" +
            ".mp3"),
          phrase: dataRef.phrases[0],
          emotion: dataRef.emotions[1],
          feature: dataRef.features[0],
          axis: dataRef.axes[2] // ita
        },
        {
          hash: "3212c18785813afc2291de4fd1776eb4d7de7107",
          img: require(imgPath3 +
            "3212c18785813afc2291de4fd1776eb4d7de7107" +
            ".png"),
          audio: require(audioPath +
            "6a2cfb6b28c8f2d66bdedfaf5b86fcdc88735e3b" +
            ".mp3"),
          phrase: dataRef.phrases[0],
          emotion: dataRef.emotions[1],
          feature: dataRef.features[0],
          axis: dataRef.axes[3] // _b_
        },
        // neutral
        {
          hash: "8ff9c638709ee2893398c4cde2afcbbaca3087a8",
          img: require(imgPath3 +
            "8ff9c638709ee2893398c4cde2afcbbaca3087a8" +
            ".png"),
          audio: require(audioPath +
            "9e6010da3ee78f67712588592f0af5e46d7f593c" +
            ".mp3"),
          phrase: dataRef.phrases[0],
          emotion: dataRef.emotions[2],
          feature: dataRef.features[0],
          axis: dataRef.axes[0] // wei
        },
        {
          hash: "eddb06373f97176355be9a5912743eef81090a9f",
          img: require(imgPath3 +
            "eddb06373f97176355be9a5912743eef81090a9f" +
            ".png"),
          audio: require(audioPath +
            "9e6010da3ee78f67712588592f0af5e46d7f593c" +
            ".mp3"),
          phrase: dataRef.phrases[0],
          emotion: dataRef.emotions[2],
          feature: dataRef.features[0],
          axis: dataRef.axes[1] // wid
        },
        {
          hash: "40b62992820f658e882b42f34452b1be4394a30f",
          img: require(imgPath3 +
            "40b62992820f658e882b42f34452b1be4394a30f" +
            ".png"),
          audio: require(audioPath +
            "9e6010da3ee78f67712588592f0af5e46d7f593c" +
            ".mp3"),
          phrase: dataRef.phrases[0],
          emotion: dataRef.emotions[2],
          feature: dataRef.features[0],
          axis: dataRef.axes[2] // ita
        },
        {
          hash: "de32d331e8ed427f3f42c8159a82fb318da92793",
          img: require(imgPath3 +
            "de32d331e8ed427f3f42c8159a82fb318da92793" +
            ".png"),
          audio: require(audioPath +
            "9e6010da3ee78f67712588592f0af5e46d7f593c" +
            ".mp3"),
          phrase: dataRef.phrases[0],
          emotion: dataRef.emotions[2],
          feature: dataRef.features[0],
          axis: dataRef.axes[3] // _b_
        },
        // sad
        {
          hash: "9da4d230f99cfc07ccbf9d3f927396b749495288",
          img: require(imgPath3 +
            "9da4d230f99cfc07ccbf9d3f927396b749495288" +
            ".png"),
          audio: require(audioPath +
            "7e222a91c247d56ecd5779fc46e7a3b87a391233" +
            ".mp3"),
          phrase: dataRef.phrases[0],
          emotion: dataRef.emotions[3],
          feature: dataRef.features[0],
          axis: dataRef.axes[0] // wei
        },
        {
          hash: "05deed435f240f1e94f89b124f6456f6c0f11fa3",
          img: require(imgPath3 +
            "05deed435f240f1e94f89b124f6456f6c0f11fa3" +
            ".png"),
          audio: require(audioPath +
            "7e222a91c247d56ecd5779fc46e7a3b87a391233" +
            ".mp3"),
          phrase: dataRef.phrases[0],
          emotion: dataRef.emotions[3],
          feature: dataRef.features[0],
          axis: dataRef.axes[1] // wid
        },
        {
          hash: "ec2d8162da895c6e2f473858401f083e24e19801",
          img: require(imgPath3 +
            "ec2d8162da895c6e2f473858401f083e24e19801" +
            ".png"),
          audio: require(audioPath +
            "7e222a91c247d56ecd5779fc46e7a3b87a391233" +
            ".mp3"),
          phrase: dataRef.phrases[0],
          emotion: dataRef.emotions[3],
          feature: dataRef.features[0],
          axis: dataRef.axes[2] // ita
        },
        {
          hash: "90c03859448359e93e820030de9aa8a100620c0e",
          img: require(imgPath3 +
            "90c03859448359e93e820030de9aa8a100620c0e" +
            ".png"),
          audio: require(audioPath +
            "7e222a91c247d56ecd5779fc46e7a3b87a391233" +
            ".mp3"),
          phrase: dataRef.phrases[0],
          emotion: dataRef.emotions[3],
          feature: dataRef.features[0],
          axis: dataRef.axes[3] // _b_
        },
        // surprise
        {
          hash: "291e8055b6a00308c5823ee3554f4bfb877110bb",
          img: require(imgPath3 +
            "291e8055b6a00308c5823ee3554f4bfb877110bb" +
            ".png"),
          audio: require(audioPath +
            "86f587a294b413c810bd025207079acd93e7ffac" +
            ".mp3"),
          phrase: dataRef.phrases[0],
          emotion: dataRef.emotions[4],
          feature: dataRef.features[0],
          axis: dataRef.axes[0] // wei
        },
        {
          hash: "ae2269201e227df61591d52783ea24e2008d9415",
          img: require(imgPath3 +
            "ae2269201e227df61591d52783ea24e2008d9415" +
            ".png"),
          audio: require(audioPath +
            "86f587a294b413c810bd025207079acd93e7ffac" +
            ".mp3"),
          phrase: dataRef.phrases[0],
          emotion: dataRef.emotions[4],
          feature: dataRef.features[0],
          axis: dataRef.axes[1] // wid
        },
        {
          hash: "e7bae80ae8567b6cdef35e052e2bca6e5cb1f2db",
          img: require(imgPath3 +
            "e7bae80ae8567b6cdef35e052e2bca6e5cb1f2db" +
            ".png"),
          audio: require(audioPath +
            "86f587a294b413c810bd025207079acd93e7ffac" +
            ".mp3"),
          phrase: dataRef.phrases[0],
          emotion: dataRef.emotions[4],
          feature: dataRef.features[0],
          axis: dataRef.axes[2] // ita
        },
        {
          hash: "84091c386f6133ed4d451b912178c6d13ddf30d2",
          img: require(imgPath3 +
            "84091c386f6133ed4d451b912178c6d13ddf30d2" +
            ".png"),
          audio: require(audioPath +
            "86f587a294b413c810bd025207079acd93e7ffac" +
            ".mp3"),
          phrase: dataRef.phrases[0],
          emotion: dataRef.emotions[4],
          feature: dataRef.features[0],
          axis: dataRef.axes[3] // _b_
        },
        // PASSARINHO
        // anger
        {
          hash: "c6b5e415343bf392471011690a62cdf6cd9034ca",
          img: require(imgPath3 +
            "c6b5e415343bf392471011690a62cdf6cd9034ca" +
            ".png"),
          audio: require(audioPath +
            "8e5d42853548fcc1a1a9df1b9143cb279ffa64af" +
            ".mp3"),
          phrase: dataRef.phrases[1],
          emotion: dataRef.emotions[0],
          feature: dataRef.features[0],
          axis: dataRef.axes[0] // wei
        },
        {
          hash: "fa0d305e27775517cf7c46a2214a52a7d4534237",
          img: require(imgPath3 +
            "fa0d305e27775517cf7c46a2214a52a7d4534237" +
            ".png"),
          audio: require(audioPath +
            "8e5d42853548fcc1a1a9df1b9143cb279ffa64af" +
            ".mp3"),
          phrase: dataRef.phrases[1],
          emotion: dataRef.emotions[0],
          feature: dataRef.features[0],
          axis: dataRef.axes[1] // wid
        },
        {
          hash: "ddde3e70fc3511a1e1c8135fd8f17c7cc267b6a0",
          img: require(imgPath3 +
            "ddde3e70fc3511a1e1c8135fd8f17c7cc267b6a0" +
            ".png"),
          audio: require(audioPath +
            "8e5d42853548fcc1a1a9df1b9143cb279ffa64af" +
            ".mp3"),
          phrase: dataRef.phrases[1],
          emotion: dataRef.emotions[0],
          feature: dataRef.features[0],
          axis: dataRef.axes[2] // ita
        },
        {
          hash: "c0e72b6bbb17600ba69bda5bd8b0e9deb03099e2",
          img: require(imgPath3 +
            "c0e72b6bbb17600ba69bda5bd8b0e9deb03099e2" +
            ".png"),
          audio: require(audioPath +
            "8e5d42853548fcc1a1a9df1b9143cb279ffa64af" +
            ".mp3"),
          phrase: dataRef.phrases[1],
          emotion: dataRef.emotions[0],
          feature: dataRef.features[0],
          axis: dataRef.axes[3] // _b_
        },
        // happy
        {
          hash: "49a32c4d8de32f02a5892c9836f5520ad03c4099",
          img: require(imgPath3 +
            "49a32c4d8de32f02a5892c9836f5520ad03c4099" +
            ".png"),
          audio: require(audioPath +
            "f1479e5f23721925234e56965e45088b180f1978" +
            ".mp3"),
          phrase: dataRef.phrases[1],
          emotion: dataRef.emotions[1],
          feature: dataRef.features[0],
          axis: dataRef.axes[0] // wei
        },
        {
          hash: "ca03f035fc97804d3e70ae2d121a24e1e119eab1",
          img: require(imgPath3 +
            "ca03f035fc97804d3e70ae2d121a24e1e119eab1" +
            ".png"),
          audio: require(audioPath +
            "f1479e5f23721925234e56965e45088b180f1978" +
            ".mp3"),
          phrase: dataRef.phrases[1],
          emotion: dataRef.emotions[1],
          feature: dataRef.features[0],
          axis: dataRef.axes[1] // wid
        },
        {
          hash: "0cca94a17e805a84d3ae5b609c39a68fede8780f",
          img: require(imgPath3 +
            "0cca94a17e805a84d3ae5b609c39a68fede8780f" +
            ".png"),
          audio: require(audioPath +
            "f1479e5f23721925234e56965e45088b180f1978" +
            ".mp3"),
          phrase: dataRef.phrases[1],
          emotion: dataRef.emotions[1],
          feature: dataRef.features[0],
          axis: dataRef.axes[2] // ita
        },
        {
          hash: "30398ed83341eb1a4038b70d50a1c6066c9fbfce",
          img: require(imgPath3 +
            "30398ed83341eb1a4038b70d50a1c6066c9fbfce" +
            ".png"),
          audio: require(audioPath +
            "f1479e5f23721925234e56965e45088b180f1978" +
            ".mp3"),
          phrase: dataRef.phrases[1],
          emotion: dataRef.emotions[1],
          feature: dataRef.features[0],
          axis: dataRef.axes[3] // _b_
        },
        // neutral
        {
          hash: "54efcf3140c072d9c36045910d43d97c715ea388",
          img: require(imgPath3 +
            "54efcf3140c072d9c36045910d43d97c715ea388" +
            ".png"),
          audio: require(audioPath +
            "e88aa03dd4030e91fb89e08d74497f50fb01cea6" +
            ".mp3"),
          phrase: dataRef.phrases[1],
          emotion: dataRef.emotions[2],
          feature: dataRef.features[0],
          axis: dataRef.axes[0] // wei
        },
        {
          hash: "58b32a333641e891666b43ef3f246885da59f11d",
          img: require(imgPath3 +
            "58b32a333641e891666b43ef3f246885da59f11d" +
            ".png"),
          audio: require(audioPath +
            "e88aa03dd4030e91fb89e08d74497f50fb01cea6" +
            ".mp3"),
          phrase: dataRef.phrases[1],
          emotion: dataRef.emotions[2],
          feature: dataRef.features[0],
          axis: dataRef.axes[1] // wid
        },
        {
          hash: "d378ea0abc122d3fc291784b5a3942994e9b3b12",
          img: require(imgPath3 +
            "d378ea0abc122d3fc291784b5a3942994e9b3b12" +
            ".png"),
          audio: require(audioPath +
            "e88aa03dd4030e91fb89e08d74497f50fb01cea6" +
            ".mp3"),
          phrase: dataRef.phrases[1],
          emotion: dataRef.emotions[2],
          feature: dataRef.features[0],
          axis: dataRef.axes[2] // ita
        },
        {
          hash: "9fb4c314e0c48eaebced0aa43fa3b7d75d92e919",
          img: require(imgPath3 +
            "9fb4c314e0c48eaebced0aa43fa3b7d75d92e919" +
            ".png"),
          audio: require(audioPath +
            "e88aa03dd4030e91fb89e08d74497f50fb01cea6" +
            ".mp3"),
          phrase: dataRef.phrases[1],
          emotion: dataRef.emotions[2],
          feature: dataRef.features[0],
          axis: dataRef.axes[3] // _b_
        },
        // sad
        {
          hash: "7dd2a24473f13fc328e19a314143cf4bb0788990",
          img: require(imgPath3 +
            "7dd2a24473f13fc328e19a314143cf4bb0788990" +
            ".png"),
          audio: require(audioPath +
            "ef5e65eb750ab19f4cad927461760f9bf52d6d80" +
            ".mp3"),
          phrase: dataRef.phrases[1],
          emotion: dataRef.emotions[3],
          feature: dataRef.features[0],
          axis: dataRef.axes[0] // wei
        },
        {
          hash: "2c984d4fe9bc05960b6f3476f24d3ff35c75e0d4",
          img: require(imgPath3 +
            "2c984d4fe9bc05960b6f3476f24d3ff35c75e0d4" +
            ".png"),
          audio: require(audioPath +
            "ef5e65eb750ab19f4cad927461760f9bf52d6d80" +
            ".mp3"),
          phrase: dataRef.phrases[1],
          emotion: dataRef.emotions[3],
          feature: dataRef.features[0],
          axis: dataRef.axes[1] // wid
        },
        {
          hash: "f678bea196e86969449a694a9375d18a2974006a",
          img: require(imgPath3 +
            "f678bea196e86969449a694a9375d18a2974006a" +
            ".png"),
          audio: require(audioPath +
            "ef5e65eb750ab19f4cad927461760f9bf52d6d80" +
            ".mp3"),
          phrase: dataRef.phrases[1],
          emotion: dataRef.emotions[3],
          feature: dataRef.features[0],
          axis: dataRef.axes[2] // ita
        },
        {
          hash: "54735172e2e2b000550698048341647f5c903c77",
          img: require(imgPath3 +
            "54735172e2e2b000550698048341647f5c903c77" +
            ".png"),
          audio: require(audioPath +
            "ef5e65eb750ab19f4cad927461760f9bf52d6d80" +
            ".mp3"),
          phrase: dataRef.phrases[1],
          emotion: dataRef.emotions[3],
          feature: dataRef.features[0],
          axis: dataRef.axes[3] // _b_
        },
        // surprise
        {
          hash: "b0331e78b80aa12820b1fc406153202a22a3a445",
          img: require(imgPath3 +
            "b0331e78b80aa12820b1fc406153202a22a3a445" +
            ".png"),
          audio: require(audioPath +
            "6b7d4fc99c68cd95e4831b695061fd576f697e52" +
            ".mp3"),
          phrase: dataRef.phrases[1],
          emotion: dataRef.emotions[4],
          feature: dataRef.features[0],
          axis: dataRef.axes[0] // wei
        },
        {
          hash: "d84c7a6d35f94e2d423f559e372a1ca3fc7dc456",
          img: require(imgPath3 +
            "d84c7a6d35f94e2d423f559e372a1ca3fc7dc456" +
            ".png"),
          audio: require(audioPath +
            "6b7d4fc99c68cd95e4831b695061fd576f697e52" +
            ".mp3"),
          phrase: dataRef.phrases[1],
          emotion: dataRef.emotions[4],
          feature: dataRef.features[0],
          axis: dataRef.axes[1] // wid
        },
        {
          hash: "f6b3ada380b026bf01308740aaf79cf93d6e1da5",
          img: require(imgPath3 +
            "f6b3ada380b026bf01308740aaf79cf93d6e1da5" +
            ".png"),
          audio: require(audioPath +
            "6b7d4fc99c68cd95e4831b695061fd576f697e52" +
            ".mp3"),
          phrase: dataRef.phrases[1],
          emotion: dataRef.emotions[4],
          feature: dataRef.features[0],
          axis: dataRef.axes[2] // ita
        },
        {
          hash: "7f2e34eded29797bd216a5503478a3f845d2cce2",
          img: require(imgPath3 +
            "7f2e34eded29797bd216a5503478a3f845d2cce2" +
            ".png"),
          audio: require(audioPath +
            "6b7d4fc99c68cd95e4831b695061fd576f697e52" +
            ".mp3"),
          phrase: dataRef.phrases[1],
          emotion: dataRef.emotions[4],
          feature: dataRef.features[0],
          axis: dataRef.axes[3] // _b_
        }
      ],
      should_hits_be_measured: false,
      combinations: [
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 2],
        [1, 3],
        [2, 3],
        [4, 5],
        [4, 6],
        [4, 7],
        [5, 6],
        [5, 7],
        [6, 7],
        [8, 9],
        [8, 10],
        [8, 11],
        [9, 10],
        [9, 11],
        [10, 11],
        [12, 13],
        [12, 14],
        [12, 15],
        [13, 14],
        [13, 15],
        [14, 15],
        [16, 17],
        [16, 18],
        [16, 19],
        [17, 18],
        [17, 19],
        [18, 19],
        [20, 21],
        [20, 22],
        [20, 23],
        [21, 22],
        [21, 23],
        [22, 23],
        [24, 25],
        [24, 26],
        [24, 27],
        [25, 26],
        [25, 27],
        [26, 27],
        [28, 29],
        [28, 30],
        [28, 31],
        [29, 30],
        [29, 31],
        [30, 31],
        [32, 33],
        [32, 34],
        [32, 35],
        [33, 34],
        [33, 35],
        [34, 35],
        [36, 37],
        [36, 38],
        [36, 39],
        [37, 38],
        [37, 39],
        [38, 39]
      ]
    }
  },
  setAuthorId(value) {
    this.sharedState.author_id = value;
  }
};
