function modController(Mod) {
  function getMethod({ query: { name } }, res) {
    const query = name ? {
      name: new RegExp(`${name}`, 'i'),
    } : {};
    Mod.find(query, (errorFind, mods) => ((errorFind)
      ? res.send(errorFind)
      : res.json(mods)));
  }

  return {
    getMethod,
  };
}

module.exports = modController;
