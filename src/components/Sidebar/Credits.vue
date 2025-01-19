<template>
  <div id="credits">
    <p>Data credits:</p>
    <div id="credits-flex">
      <a href="https://www.last.fm/">
        <img src="/lastfm_logo.svg" alt="Last.fm">
      </a>
      <a href="https://openlibrary.org/">
        <img id="ia-logo" src="/ia_logo.svg" alt="OpenLibrary">
      </a>
      <a href="https://www.igdb.com">
        <img id="igdb-logo" src="/igdb_logo.png" alt="IGDB">
      </a>
      <a href="https://www.themoviedb.org">
        <img id="tmdb-logo" src="/tmdb.svg" alt="The Movie DB">
      </a>
    </div>
    <p class="disclaimer">
      Topsters 3 is not affiliated with or endorsed by any of the above services.
    </p>
  </div>
</template>

<style scoped>
#credits {
  margin: auto;
  text-align: center;
  max-width: 400px;
}

#credits-flex {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

#credits-flex img {
  width: 40px;
}

#ia-logo {
  filter: invert(1);
  height: 40px;
}

.disclaimer {
  font-size: 0.75rem;
}
</style>
