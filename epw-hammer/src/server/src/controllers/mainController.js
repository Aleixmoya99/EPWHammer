function WargearController(Gun) {
  function getMethod({ query: { name } }, res) {
    const query = name ? {
      name: new RegExp(`${name}`, 'i'),
    } : {};
    Gun.find(query, (errorFind, guns) => ((errorFind)
      ? res.send(errorFind)
      : res.json(guns)));
  }

  return {
    getMethod,
  };
}

module.exports = WargearController;
