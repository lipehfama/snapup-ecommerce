<template>
  <main class="download-page">
    <div class="container download-page__container">
      <section class="download-hero content-panel" aria-labelledby="download-title">
        <header class="download-hero__copy">
          <span class="section-marker" aria-hidden="true"></span>
          <h1 id="download-title">SnapUp Mobile</h1>
          <p>
            The mobile version of SnapUp is part of the same experimental open-source project,
            bringing the SnapUp experience to your phone.
          </p>
        </header>
        <figure
          class="phone-illustration"
          aria-label="SnapUp mobile application preview"
          role="img"
        >
          <span class="phone-illustration__glow"></span>
          <span class="phone-illustration__device">
            <span class="phone-illustration__speaker"></span>
            <span class="phone-illustration__screen">
              <i class="bi bi-bag-fill" aria-hidden="true"></i><strong>SnapUp.</strong>
            </span>
          </span>
        </figure>
      </section>

      <section class="feature-cards" aria-label="Mobile project features">
        <article class="feature-card content-panel">
          <i class="feature-card__icon bi bi-code-slash" aria-hidden="true"></i>
          <h2>Open Source</h2>
          <p>The mobile app is open source and developed in the open.</p>
        </article>
        <article class="feature-card content-panel">
          <i class="feature-card__icon bi bi-github" aria-hidden="true"></i>
          <h2>Same Repository</h2>
          <p>The mobile project lives in the same GitHub repository as SnapUp.</p>
        </article>
        <article class="feature-card content-panel">
          <i class="feature-card__icon bi bi-flask-fill" aria-hidden="true"></i>
          <h2>Experimental Project</h2>
          <p>An early stage project for learning and experimentation.</p>
        </article>
      </section>

      <section class="explore content-panel" aria-labelledby="explore-title">
        <header>
          <span class="section-marker" aria-hidden="true"></span>
          <h2 id="explore-title">Explore the mobile project</h2>
          <p>
            The mobile part of SnapUp is available in the same GitHub repository. Check it out,
            explore the code, and follow the development.
          </p>
        </header>
        <nav class="explore__actions" aria-label="Mobile project resources">
          <a
            class="button button--primary"
            href="https://github.com/lipehfama/snapup-ecommerce/tree/main/mobile"
            target="_blank"
            rel="noreferrer"
            ><i class="bi bi-github" aria-hidden="true"></i> View Mobile Project</a
          ><a
            class="button button--outline"
            href="https://github.com/lipehfama/snapup-ecommerce"
            target="_blank"
            rel="noreferrer"
            ><i class="bi bi-box-arrow-up-right" aria-hidden="true"></i> View Repository</a
          >
        </nav>
      </section>

      <aside class="project-note" role="note">
        <i class="bi bi-info-circle-fill" aria-hidden="true"></i>
        <p>
          SnapUp is an experimental project. The mobile application is not currently distributed as
          a production app.
        </p>
      </aside>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use "./Download.scss";
</style>
