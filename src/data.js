export var general_data = {
  sharedState: {
    name: "caluã",
    author_id: ""
  },
  setAuthorId(value) {
    console.log("Olá, " + value);
    this.sharedState.author_id = value;
  }
};
